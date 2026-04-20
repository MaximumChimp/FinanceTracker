import { HiHome, HiSwitchHorizontal, HiChartPie, HiChartBar, HiCurrencyDollar, HiMenu, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {/* 1. MOBILE OVERLAY: Dims the background when sidebar is open on mobile */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* 2. SIDEBAR: Fixed to the viewport */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 flex flex-col 
      `}>
        
        {/* Toggle Button Inside Sidebar (Mobile only) */}
        <div className="p-6 flex items-center justify-between">
          <span className="font-bold text-xl">Finance Tracker</span>
          <button onClick={() => setIsVisible(false)} className="md:hidden">
            <HiOutlineX className="text-2xl text-red-500" />
          </button>
        </div>

        {/* Navigation - Scrollable inside if items overflow */}
        <nav className="flex-grow overflow-y-auto p-4">
          <ul className="space-y-2">
              {[
                {
                  to: "/",
                  name: "Dashboard",
                  icon: <HiHome/>
                },
                {
                  to: "/transactions",
                  name: "Transactions",
                  icon: <HiSwitchHorizontal/>
                },
                {
                  to: "/budgets",
                  name: "Budgets",
                  icon: <HiChartPie/>
                },
                {
                  to: "/reports",
                  name: "Reports",
                  icon: <HiChartBar/>
                },
                {
                  to: "/savings-goals",
                  name: "Savings Goals",
                  icon: <HiCurrencyDollar/>
                }
              ].map((data,index)=>(
                <li key={index} >
                    <NavLink to={data.to} className={(({isActive})=>(
                      isActive ? "flex items-center space-x-2 text-blue-400 bg-blue-100 rounded-lg p-2 font-semibold" : 
                      "flex items-center gap-2 p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-100 rounded-lg"
                    ))}>
                      <span>{data.icon}</span>
                      <span>{data.name}</span>
                    </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </aside>

      {/* 3. MOBILE TRIGGER: Only shows when sidebar is hidden */}
      {!isVisible && (
        <button 
          onClick={() => setIsVisible(true)} 
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md "
        >
          <HiMenu className="text-2xl" />
        </button>
      )}

     
    </>
  );
}

export default Sidebar;