import { useEffect, useState, useMemo } from "react";
import { FaFileExcel } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// 1. Import Chart.js dependencies
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reports() {
  const currentMonth = new Date().toLocaleString('default', { month: "short" });
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showPicker, setShowPicker] = useState(false);
  const [availableYears, setAvailableYears] = useState([currentYear]);
  const [transactions, setTransactions] = useState([]);
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const fetchData = () => {
      try {
        const saved = localStorage.getItem("transaction_data");
        const data = saved ? JSON.parse(saved) : [];
        setTransactions(data);

        const uniqueYears = [...new Set(data.map(t => new Date(t.Date).getFullYear()))].sort((a, b) => b - a);
        if (uniqueYears.length > 0) setAvailableYears(uniqueYears);
      } catch (error) {
        console.error("Unable to fetch data!", error);
      }
    };

    fetchData();
    window.addEventListener("storage", fetchData);
    window.addEventListener("local-update", fetchData);
    return () => {
      window.removeEventListener("storage", fetchData);
      window.removeEventListener("local-update", fetchData);
    };
  }, []);

  // 2. Process Data for Semimonthly Chart
  const chartData = useMemo(() => {
    const filtered = transactions.filter(t => {
      const d = new Date(t.Date);
      return d.getFullYear() === selectedYear && months[d.getMonth()] === selectedMonth;
    });

    const stats = {
      h1: { income: 0, expense: 0 }, // 1st to 15th
      h2: { income: 0, expense: 0 }  // 16th to End
    };

    filtered.forEach(t => {
      const day = new Date(t.Date).getDate();
      const period = day <= 15 ? 'h1' : 'h2';
      const amount = parseFloat(t.Amount) || 0;
      
      if (t.Type === "Income") stats[period].income += amount;
      else stats[period].expense += amount;
    });

    return {
      labels: ["1st - 15th Cutoff", "16th - End Cutoff"],
      datasets: [
        {
          label: 'Income',
          data: [stats.h1.income, stats.h2.income],
          backgroundColor: '#22c55e', // green-500
        },
        {
          label: 'Expenses',
          data: [stats.h1.expense, stats.h2.expense],
          backgroundColor: '#ef4444', // red-500
        },
      ],
    };
  }, [transactions, selectedMonth, selectedYear]);

  // 3. Simple Runway Calculation (Total Savings / Average Semimonthly Expense)
  const runwayData = useMemo(() => {
    const totalSavings = transactions
      .reduce((acc, t) => t.Type === "Income" ? acc + t.Amount : acc - t.Amount, 0);
    
    // Average expense per semimonthly period (last 2 periods)
    const avgExpense = (chartData.datasets[1].data[0] + chartData.datasets[1].data[1]) / 2 || 1;
    const runway = totalSavings / avgExpense;

    return {
      totalSavings: totalSavings < 0 ? 0 : totalSavings,
      runway: runway < 0 ? 0 : runway.toFixed(1)
    };
  }, [transactions, chartData]);

  const handleMonthChange = (direction) => {
    const currentIndex = months.indexOf(selectedMonth);
    if (direction === "next") {
      if (currentIndex === 11) {
        setSelectedMonth(months[0]);
        setSelectedYear(prev => prev + 1);
      } else {
        setSelectedMonth(months[currentIndex + 1]);
      }
    } else {
      if (currentIndex === 0) {
        setSelectedMonth(months[11]);
        setSelectedYear(prev => prev - 1);
      } else {
        setSelectedMonth(months[currentIndex - 1]);
      }
    }
  };

  return (
    <div className="relative space-y-8 bg-gray-50 min-h-screen pb-10">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 shadow-md border-b">
        <h1 className="text-blue-600 text-2xl font-bold">Financial Reports</h1>
        
        <div className="flex justify-between items-center sm:gap-10">
          <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 cursor-pointer transition-all">
            <FaFileExcel />
            <span className="text-sm font-medium select-none">Export</span>
          </div>

          <div className="flex items-center gap-2 relative">
            <MdKeyboardArrowLeft onClick={() => handleMonthChange('prev')} className="text-2xl cursor-pointer hover:text-blue-500" />
            <span 
              className="text-sm font-bold cursor-pointer hover:text-blue-600 w-24 text-center select-none" 
              onClick={() => setShowPicker(!showPicker)}
            >
              {selectedMonth} {selectedYear}
            </span>
            <MdKeyboardArrowRight onClick={() => handleMonthChange('next')} className="text-2xl cursor-pointer hover:text-blue-500" />

            {showPicker && (
              <div className="absolute top-12 right-0 bg-white shadow-2xl border border-gray-100 p-4 z-50 w-64 rounded-xl">
                <div className="flex gap-2 overflow-x-auto border-b pb-3 mb-3">
                  {availableYears.map(y => (
                    <button 
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`text-xs font-bold px-3 py-1 rounded-full ${selectedYear === y ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((m) => (
                    <button 
                      key={m}
                      onClick={() => { setSelectedMonth(m); setShowPicker(false); }}
                      className={`p-2 text-xs font-medium rounded transition-colors ${selectedMonth === m ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-700 text-lg mb-4">Semimonthly Cashflow</h2>
          <div className="h-[300px]">
            <Bar 
              data={chartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } } 
              }} 
            />
          </div>
        </div>

        {/* Prediction & Runway Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-700 text-lg">Runway Predictor</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Total Liquidity</p>
              <p className="text-2xl font-bold text-gray-800">₱{runwayData.totalSavings.toLocaleString()}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-700 text-xs font-bold uppercase">Estimated Runway</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-900">{runwayData.runway}</span>
                <span className="text-blue-700 font-medium text-sm">paychecks</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Based on current spending of ₱{( (chartData.datasets[1].data[0] + chartData.datasets[1].data[1])/2 ).toLocaleString()} / cutoff.</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-gray-500 text-xs font-semibold mb-2">SAVINGS GOAL PROGRESS</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((runwayData.totalSavings / 100000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 italic">*Target: ₱100,000 Emergency Fund</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reports;