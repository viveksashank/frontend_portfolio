"use client";

import { useState } from "react";

import Link from "next/link";

import {

  LayoutDashboard,
  BadgeDollarSign,
  NotebookIcon,
  Wallet,
  LogOutIcon

} from "lucide-react";

export default function SideBar() {

  const [activeMainItem,
    setActiveMainItem] =
    useState("Dashboard");

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
    "/login";
  };

  return (

    <div className="w-64 bg-white h-screen shadow-xl flex flex-col justify-between p-6">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-10">

          <h1 className="text-3xl font-bold text-purple-700">

            KFin Wings

          </h1>

          <p className="text-gray-400 text-sm mt-1">

            Investment Dashboard

          </p>

        </div>

        {/* MENU */}
        <div className="space-y-3">

          {/* DASHBOARD */}
          <Link href="/dashboard">

            <div>

              <HeaderItem
                icon={<LayoutDashboard size={20} />}
                title="Dashboard"
                activeItem={activeMainItem}
                setActiveItem={setActiveMainItem}
              />

            </div>

          </Link>

          {/* MUTUAL FUNDS */}
          <Link href="/mutualfunds">

            <div>

              <HeaderItem
                icon={<BadgeDollarSign size={20} />}
                title="Mutual Funds"
                activeItem={activeMainItem}
                setActiveItem={setActiveMainItem}
              />

            </div>

          </Link>

          {/* PORTFOLIO */}
          <Link href="/portfolio">

            <div>

              <HeaderItem
                icon={<Wallet size={20} />}
                title="Portfolio"
                activeItem={activeMainItem}
                setActiveItem={setActiveMainItem}
              />

            </div>

          </Link>

          {/* TRANSACTIONS */}
          <Link href="/transactions">

            <div>

              <HeaderItem
                icon={<NotebookIcon size={20} />}
                title="Transactions"
                activeItem={activeMainItem}
                setActiveItem={setActiveMainItem}
              />

            </div>

          </Link>

        </div>

      </div>

      {/* BOTTOM */}
      <div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-100 text-red-600 hover:bg-red-200 transition-all"
        >

          <LogOutIcon size={20} />

          <span className="font-semibold">

            Logout

          </span>

        </button>

      </div>

    </div>
  );


  // MENU ITEM
  function HeaderItem({

    icon,
    title,
    activeItem,
    setActiveItem

  }) {

    return (

      <div

        onClick={() =>
          setActiveItem(title)
        }

        className={`

          flex
          items-center
          gap-4

          px-4
          py-4

          rounded-2xl

          cursor-pointer

          transition-all
          duration-300

          ${
            activeItem === title

            ? "bg-purple-100 text-purple-700 font-bold shadow"

            : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >

        {icon}

        <span>

          {title}

        </span>

      </div>
    );
  }
}