"use client";

import React from "react";
import { Bell, Plus } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="flex-1 h-screen bg-[#ecebf3] p-6 overflow-hidden">
      
      {/* MAIN CONTAINER */}
      <div className="w-full h-full bg-[#f8f8f8] rounded-[40px] p-10">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          
         
          <div className="flex items-center gap-10">
            
            <h1 className="text-[48px] font-bold">
              Analytics
            </h1>

           
            <div className="flex bg-[#ecebf3] rounded-full p-1">
              
              <button className="bg-white px-8 py-2 rounded-full font-semibold shadow-sm">
                Full Statistics
              </button>

              <button className="px-8 py-2 text-gray-500">
                Results Summary
              </button>
            </div>
          </div>

        
          <div className="flex items-center gap-5">
            
            <button className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center">
              <Plus size={24} />
            </button>

           
          </div>
        </div>

        <div className="flex gap-8">
          
         
          <div className="w-[330px] h-[300px] bg-white rounded-[35px] border border-dashed border-gray-300 p-8">
            
            <div className="flex justify-between">
              
              <h2 className="text-[40px] font-bold leading-tight">
                Team <br /> Payments
              </h2>

              <Bell size={24} />
            </div>

            <div className="h-[170px]"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
