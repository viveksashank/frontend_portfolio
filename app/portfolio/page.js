"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  PieChart,
  ShieldCheck,
} from "lucide-react";

import SideBar from "../components/dashboard/SideBar";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const investorId = "INV001";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchPortfolio(token);
  }, [router]);

  const fetchPortfolio = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/investors/holdings/${investorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setPortfolio(result.holdings || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = portfolio.reduce((acc, item) => acc + (item.current_value || 0), 0);
  const totalUnits = portfolio.reduce((acc, item) => acc + (item.total_units || 0), 0);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#ecebf3]">
        <h1 className="text-3xl font-bold text-purple-700 animate-pulse">
          Loading Portfolio...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#ecebf3] overflow-hidden">
      <SideBar />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-gray-800">Portfolio</h1>
            <p className="text-gray-500 mt-2 text-lg">Track your investments and holdings</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-5 rounded-3xl shadow-lg">
            <p className="text-sm opacity-80">Current Portfolio Value</p>
            <h2 className="text-3xl font-bold mt-1">₹ {totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <SummaryCard title="Total Holdings" value={portfolio.length} icon={<Wallet size={28} />} color="bg-blue-500" />
          <SummaryCard title="Total Units" value={totalUnits.toFixed(2)} icon={<PieChart size={28} />} color="bg-purple-500" />
          <SummaryCard title="Portfolio Value" value={`₹${totalValue.toFixed(2)}`} icon={<IndianRupee size={28} />} color="bg-green-500" />
          <SummaryCard title="Risk Status" value="Moderate" icon={<ShieldCheck size={28} />} color="bg-orange-500" />
        </div>

        <div className="bg-white rounded-[30px] shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">Investment Holdings</h2>
            <p className="text-gray-500 mt-1">Overview of all mutual fund investments</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-8 py-5 font-semibold">Fund Name</th>
                  <th className="px-8 py-5 font-semibold">Units</th>
                  <th className="px-8 py-5 font-semibold">NAV</th>
                  <th className="px-8 py-5 font-semibold">Current Value</th>
                  <th className="px-8 py-5 font-semibold">Growth</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-all">
                    <td className="px-8 py-6">
                      <h3 className="font-bold text-gray-800">{item.fund_name}</h3>
                      <p className="text-gray-500 text-sm">Mutual Fund</p>
                    </td>
                    <td className="px-8 py-6">{item.total_units.toFixed(2)}</td>
                    <td className="px-8 py-6">₹{item.current_nav}</td>
                    <td className="px-8 py-6 font-bold">₹{item.current_value}</td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                        <TrendingUp size={14} /> +12.4%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-[30px] p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Performance</h2>
              <TrendingUp className="text-green-600" />
            </div>
            <div className="space-y-5">
              <PerformanceItem title="1 Month" value="+5.2%" positive />
              <PerformanceItem title="6 Months" value="+14.8%" positive />
              <PerformanceItem title="1 Year" value="+24.6%" positive />
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Risk Analysis</h2>
              <TrendingDown className="text-orange-500" />
            </div>
            <div className="space-y-5">
              <RiskBar title="Large Cap" percentage="70%" width="70%" />
              <RiskBar title="Mid Cap" percentage="20%" width="20%" />
              <RiskBar title="Small Cap" percentage="10%" width="10%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-[30px] p-6 shadow-xl hover:scale-[1.02] transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">{value}</h2>
        </div>
        <div className={`${color} text-white p-4 rounded-2xl`}>{icon}</div>
      </div>
    </div>
  );
}

function PerformanceItem({ title, value, positive }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-600 font-medium">{title}</p>
      <span className={`font-bold ${positive ? "text-green-600" : "text-red-600"}`}>{value}</span>
    </div>
  );
}

function RiskBar({ title, percentage, width }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-gray-700 font-medium">{title}</p>
        <p className="text-gray-700 font-semibold">{percentage}</p>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600" style={{ width }} />
      </div>
    </div>
  );
}