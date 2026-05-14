"use client";

import { useEffect, useState } from "react";
import SideBar from "../components/dashboard/SideBar";
import { 
  Wallet, 
  PieChart, 
  ArrowUpRight, 
  Repeat, 
  User, 
  Mail, 
  TrendingUp, 
  Clock,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  const [investor, setInvestor] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [sips, setSips] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const investorId = "INV001";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchDashboard(storedToken);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchDashboard = async (storedToken) => {
    try {
      await Promise.all([
        fetchInvestor(storedToken),
        fetchHoldings(storedToken),
        fetchTransactions(storedToken),
        fetchSips(storedToken),
        fetchNetWorth(storedToken),
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchInvestor = async (storedToken) => {
    try {
      const response = await fetch(`http://localhost:4000/api/investors/${investorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const result = await response.json();
      if (result.success) setInvestor(result.data);
    } catch (error) { console.log(error); }
  };

  const fetchHoldings = async (storedToken) => {
    try {
      const response = await fetch(`http://localhost:4000/api/investors/holdings/${investorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const result = await response.json();
      if (result.success) setHoldings(result.holdings);
    } catch (error) { console.log(error); }
  };

  const fetchTransactions = async (storedToken) => {
    try {
      const response = await fetch(`http://localhost:4000/api/investors/transactions/${investorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const result = await response.json();
      if (result.success) setTransactions(result.transactions);
    } catch (error) { console.log(error); }
  };

  const fetchSips = async (storedToken) => {
    try {
      const response = await fetch(`http://localhost:4000/api/investors/sips/${investorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const result = await response.json();
      if (result.success) setSips(result.sips);
    } catch (error) { console.log(error); }
  };

  const fetchNetWorth = async (storedToken) => {
    try {
      const response = await fetch(`http://localhost:4000/api/investors/networth/${investorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const result = await response.json();
      if (result.success) setNetWorth(result.net_worth);
    } catch (error) { console.log(error); }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h1 className="text-xl font-semibold text-slate-600 tracking-tight">Syncing your wealth...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900">
      <SideBar />

      <div className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Good morning, {investor?.first_name}!
            </h1>
            <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
              <Mail size={16} />
              <span>{investor?.email}</span>
            </div>
          </div>
          <div className="h-14 w-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
            <User className="text-indigo-600" size={28} />
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card 
            title="Total Net Worth" 
            value={`₹${netWorth.toLocaleString()}`} 
            icon={<Wallet className="text-indigo-600" size={24} />}
            bg="bg-indigo-50"
          />
          <Card 
            title="Asset Holdings" 
            value={holdings.length} 
            icon={<PieChart className="text-emerald-600" size={24} />}
            bg="bg-emerald-50"
          />
          <Card 
            title="Transactions" 
            value={transactions.length} 
            icon={<ArrowUpRight className="text-orange-600" size={24} />}
            bg="bg-orange-50"
          />
          <Card 
            title="Recurring SIPs" 
            value={sips.length} 
            icon={<Repeat className="text-blue-600" size={24} />}
            bg="bg-blue-50"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* LEFT COLUMN: HOLDINGS */}
          <div className="xl:col-span-2 space-y-10">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="text-indigo-600" size={24} />
                  Portfolio Allocation
                </h2>
                <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holdings.map((item, index) => (
                  <div key={index} className="group bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                       <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                        {item.fund_name}
                      </h3>
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <ArrowUpRight size={20} className="text-slate-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Value</p>
                        <p className="text-2xl font-black text-slate-900">₹{item.current_value.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-500">{item.total_units} Units</p>
                        <p className="text-xs text-slate-400 font-medium">NAV: ₹{item.current_nav}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TRANSACTIONS TABLE */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="text-indigo-600" size={24} />
                  Activity History
                </h2>
              </div>
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Reference</th>
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="p-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {transactions.map((txn, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-6 font-mono text-xs text-slate-500">{txn.transaction_id}</td>
                        <td className="p-6 font-black text-slate-900 text-lg">₹{txn.transaction_amount.toLocaleString()}</td>
                        <td className="p-6">
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${
                            txn.transaction_status === "Success" 
                            ? "bg-emerald-50 text-emerald-600" 
                            : "bg-rose-50 text-rose-600"
                          }`}>
                            {txn.transaction_status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SIPS */}
          <section className="h-fit sticky top-10">
            <h2 className="text-2xl font-bold mb-6">Active SIPs</h2>
            <div className="space-y-4">
              {sips.map((sip, index) => (
                <div key={index} className="bg-indigo-600 rounded-[2rem] p-7 text-white shadow-lg shadow-indigo-200">
                  <h3 className="text-lg font-bold mb-1">{sip.fund_name}</h3>
                  <div className="flex justify-between items-center mb-6 opacity-80">
                    <span className="text-xs font-bold uppercase tracking-widest">{sip.frequency} cycle</span>
                    <span className="text-xs font-medium italic">{sip.sip_status}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                      <p className="text-[10px] uppercase font-bold opacity-60">Installment</p>
                      <p className="text-xl font-black">₹{sip.sip_amount.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Repeat size={18} />
                    </div>
                  </div>
                </div>
              ))}
              {sips.length === 0 && (
                <div className="bg-slate-100 rounded-3xl p-10 text-center border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No active SIPs found</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, bg }) {
  return (
    <div className="bg-white rounded-[2rem] p-7 shadow-sm border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-all">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{title}</p>
        <p className="text-3xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}