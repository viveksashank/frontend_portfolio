"use client";

import { useEffect, useState } from "react";
import SideBar from "../components/dashboard/SideBar";
import { Plus, X, TrendingUp, Info, Calendar, Briefcase, Activity } from "lucide-react";

export default function MutualFundsPage() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // FORM STATES
  const [fundId, setFundId] = useState("");
  const [fundName, setFundName] = useState("");
  const [amcName, setAmcName] = useState("");
  const [fundType, setFundType] = useState("");
  const [category, setCategory] = useState("");
  const [navValue, setNavValue] = useState("");
  const [navDate, setNavDate] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchFunds(token);
  }, []);

  const fetchFunds = async (token) => {
    try {
      const response = await fetch("http://localhost:4000/api/funds", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) setFunds(result.funds);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createFund = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fund_id: fundId,
          fund_name: fundName,
          amc_name: amcName,
          fund_type: fundType,
          category: category,
          nav_value: navValue,
          nav_date: navDate,
          risk_level: riskLevel,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Fund Created Successfully");
        fetchFunds(token);
        clearForm();
        setShowCreateModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNAV = async (fundId) => {
    try {
      const token = localStorage.getItem("token");
      const newNAV = prompt("Enter New NAV");
      const newDate = prompt("Enter NAV Date (YYYY-MM-DD)");
      if (!newNAV || !newDate) return;

      const response = await fetch(`http://localhost:4000/api/funds/${fundId}/nav`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nav_value: newNAV, nav_date: newDate }),
      });
      const result = await response.json();
      if (result.success) {
        alert("NAV Updated");
        fetchFunds(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setFundId("");
    setFundName("");
    setAmcName("");
    setFundType("");
    setCategory("");
    setNavValue("");
    setNavDate("");
    setRiskLevel("");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <SideBar />

      <main className="flex-1 overflow-y-auto p-10">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Mutual Funds</h1>
            <p className="text-slate-500 mt-2 text-lg">Portfolio overview and asset management</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-200 font-semibold"
          >
            <Plus size={20} />
            Add New Fund
          </button>
        </div>

        {/* MODAL OVERLAY */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Fund Details</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-2 gap-6">
                <Input label="Fund ID" placeholder="MF-12345" value={fundId} setValue={setFundId} />
                <Input label="Fund Name" placeholder="Bluechip Growth" value={fundName} setValue={setFundName} />
                <Input label="AMC Name" placeholder="HDFC Asset Mgmt" value={amcName} setValue={setAmcName} />
                <Input label="Fund Type" placeholder="Equity / Debt" value={fundType} setValue={setFundType} />
                <Input label="Category" placeholder="Large Cap" value={category} setValue={setCategory} />
                <Input label="NAV Value" placeholder="150.25" value={navValue} setValue={setNavValue} />
                <Input label="NAV Date" placeholder="2024-05-14" value={navDate} setValue={setNavDate} />
                <Input label="Risk Level" placeholder="Moderate High" value={riskLevel} setValue={setRiskLevel} />
              </div>

              <div className="p-8 bg-slate-50 flex justify-end gap-4">
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 font-semibold text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={createFund}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-bold transition-all"
                >
                  Confirm & Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FUND LIST GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {funds.map((fund, index) => (
            <div key={index} className="group bg-white rounded-[2rem] border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-tight">{fund.fund_name}</h2>
                    <p className="text-indigo-600 font-medium text-sm uppercase tracking-wider">{fund.amc_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => updateNAV(fund.fund_id)}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  UPDATE NAV
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-slate-50 pt-6">
                <CardDetail icon={<Info size={16}/>} label="Fund ID" value={fund.fund_id} />
                <CardDetail icon={<Briefcase size={16}/>} label="Type" value={fund.fund_type} />
                <CardDetail icon={<Activity size={16}/>} label="Category" value={fund.category} />
                <CardDetail icon={<Calendar size={16}/>} label="Risk" value={fund.risk_level} />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Current NAV</span>
                <span className="text-3xl font-black text-slate-900">₹{fund.nav_value}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// UI HELPER COMPONENTS
function CardDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-400">{icon}</div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, placeholder, value, setValue }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-500 uppercase ml-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-slate-50 border-none p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-800 placeholder:text-slate-300"
      />
    </div>
  );
}