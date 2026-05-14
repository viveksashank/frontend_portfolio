"use client";

import { useEffect, useState } from "react";
import SideBar from "../components/dashboard/SideBar";

export default function TransactionsPage() {
  const [sips, setSips] = useState([]);
  const [selectedSIP, setSelectedSIP] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // FORM STATES
  const [sipId, setSipId] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [fundId, setFundId] = useState("");
  const [sipAmount, setSipAmount] = useState("");
  const [sipDate, setSipDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [sipStatus, setSipStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchSIPs(token);
  }, []);

  const fetchSIPs = async (token) => {
    try {
      const response = await fetch("http://localhost:4000/api/sips", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) setSips(result.sips);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createSIP = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/sips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sip_id: sipId,
          investor_id: investorId,
          fund_id: fundId,
          sip_amount: sipAmount,
          sip_date: sipDate,
          frequency: frequency,
          start_date: startDate,
          sip_status: sipStatus,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("SIP Created Successfully");
        fetchSIPs(token);
        clearForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setSipId(""); setInvestorId(""); setFundId(""); setSipAmount("");
    setSipDate(""); setFrequency(""); setStartDate(""); setSipStatus("");
  };

  const fetchSIPDetails = async (sipId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/sips/${sipId}/details`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setSelectedSIP(result.sip);
        setTransactions(result.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const processSIP = async (sipId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/sips/${sipId}/process`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        alert("SIP Processed Successfully");
        fetchSIPDetails(sipId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FD] text-slate-900">
      <SideBar />

      <div className="flex-1 overflow-y-auto p-10">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">SIP Transactions</h1>
          <p className="text-slate-500 mt-2 text-lg">Central management for systematic investment plans.</p>
        </div>

        {/* CREATE SIP SECTION */}
        <section className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-8 text-slate-800">New SIP Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input placeholder="SIP ID" value={sipId} setValue={setSipId} />
            <Input placeholder="Investor ID" value={investorId} setValue={setInvestorId} />
            <Input placeholder="Fund ID" value={fundId} setValue={setFundId} />
            <Input placeholder="Amount (₹)" value={sipAmount} setValue={setSipAmount} />
            <Input placeholder="SIP Day (Date)" value={sipDate} setValue={setSipDate} />
            <Input placeholder="Frequency" value={frequency} setValue={setFrequency} />
            <Input placeholder="Start Date" value={startDate} setValue={setStartDate} />
            <Input placeholder="Status" value={sipStatus} setValue={setSipStatus} />
          </div>
          <button
            onClick={createSIP}
            className="mt-8 bg-indigo-600 text-white font-semibold px-10 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95"
          >
            Deploy SIP
          </button>
        </section>

        {/* SIP LIST GRID */}
        <h2 className="text-xl font-bold mb-6 text-slate-800 px-2">Active Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {sips.map((sip) => (
            <div
              key={sip.sip_id}
              onClick={() => fetchSIPDetails(sip.sip_id)}
              className="group bg-white rounded-[2rem] border border-slate-100 p-7 cursor-pointer hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">{sip.fund_name}</h3>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {sip.sip_status}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-6">{sip.amc_name}</p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-5">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Amount</p>
                  <p className="text-lg font-bold text-slate-800">₹{sip.sip_amount}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">NAV Value</p>
                  <p className="text-lg font-bold text-slate-800">₹{sip.nav_value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DETAIL VIEW */}
        {selectedSIP && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg width="160" height="160" fill="currentColor" viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66 2L13 11h7.32L17 5z"/></svg>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                <div>
                  <span className="bg-indigo-500/30 text-indigo-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                    SIP Details
                  </span>
                  <h2 className="text-4xl font-black mb-2">{selectedSIP.fund_name}</h2>
                  <p className="text-indigo-200 text-lg opacity-80">{selectedSIP.amc_name}</p>
                  
                  <div className="flex gap-10 mt-8">
                    <div>
                      <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Frequency</p>
                      <p className="text-xl font-medium">{selectedSIP.frequency}</p>
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Risk Level</p>
                      <p className="text-xl font-medium">{selectedSIP.risk_level}</p>
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Investment</p>
                      <p className="text-xl font-medium">₹{selectedSIP.sip_amount}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => processSIP(selectedSIP.sip_id)}
                  className="bg-white text-indigo-900 font-bold px-10 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg active:scale-95"
                >
                  Process Installment
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
              <h2 className="text-2xl font-bold mb-8 text-slate-800">Transaction History</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <th className="text-left px-6 py-4">ID</th>
                      <th className="text-left px-6 py-4">Amount</th>
                      <th className="text-left px-6 py-4">NAV Used</th>
                      <th className="text-left px-6 py-4">Units</th>
                      <th className="text-left px-6 py-4">Execution Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.transaction_id} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5 rounded-l-2xl text-slate-500 font-mono text-sm">{txn.transaction_id}</td>
                        <td className="px-6 py-5 font-bold text-slate-800">₹{txn.transaction_amount}</td>
                        <td className="px-6 py-5 text-slate-600">₹{txn.nav_used}</td>
                        <td className="px-6 py-5">
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium">
                            {txn.units_allocated}
                          </span>
                        </td>
                        <td className="px-6 py-5 rounded-r-2xl text-slate-500">{txn.transaction_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ placeholder, value, setValue }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-wider">{placeholder}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300"
      />
    </div>
  );
}