import { HiArrowSmUp, HiCalendar } from "react-icons/hi";
import {Chart, CategoryScale,LinearScale, BarElement,Title, ArcElement,Tooltip,Legend, plugins} from "chart.js";
import {Doughnut,Bar} from 'react-chartjs-2'
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip, 
  Legend)
    
function Dashboard() {
  


const CategoryPieData = {
  labels:[
      'Food',
      'Transportation',
      'Housing',
      'Entertainment',
      'Shopping'
  ],
  datasets: [{
      label:'Food',
      data: [12, 19, 3, 5, 2],
      backgroundColor:[
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor:[
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
      ],
      borderWidth:1
  }]
}

const options = {
  plugins: {
    legend: {
      position: 'right', // This moves the labels to the right
      labels: {
        usePointStyle: true, // Optional: Makes the icons circles instead of squares
        padding: 20,         // Adds space between the labels
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        // 'context' contains all information about the item you are hovering over
        label: function (context) {
          // context.label is "Income" or "Expenses"
          // context.formattedValue is the number (e.g., "120")
          return ` ${context.label}: ₱${context.formattedValue}`;
        },
        // This removes the "Profit and Loss" title from the top of the tooltip
        title: function() {
          return ''; 
        }
      }
    }
  },
  maintainAspectRatio: false // Allows the chart to fill its container better
  }; 

const BudgetAnalysisBarData = {
  labels: ["Income", "Expenses"], // These go on the X-axis
  datasets: [
    {
      label: "Profit and Loss", // The name shown in the tooltip/legend
      data: [50, 120],   // The actual bar heights
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', 
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', 
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const AnalysisOption = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        // 'context' contains all information about the item you are hovering over
        label: function (context) {
          // context.label is "Income" or "Expenses"
          // context.formattedValue is the number (e.g., "120")
          return ` ${context.label}: ₱${context.formattedValue}`;
        },
        // This removes the "Profit and Loss" title from the top of the tooltip
        title: function() {
          return ''; 
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


  return (
    <div className="space-y-10">
      {/* grid-cols-1: Mobile (1 card per row)
         sm:grid-cols-2: Tablets (2 cards per row)
         lg:grid-cols-4: Desktop (4 cards per row)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Balance */}
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-100">
          <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Balance</h1>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-800">$1,150.00</span>
          </div>
          <div className="flex items-center mt-4 text-blue-400  w-fit px-2 py-1 rounded-md">
            <HiArrowSmUp className="text-lg" />
            <p className="text-xs font-semibold">0% from last month</p>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-100">
          <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Monthly Income</h1>
          <div className="mt-2">
            <span className="text-2xl font-bold text-blue-300">$1,150.00</span>
          </div>
          <div className="flex items-center mt-4 gap-2 text-gray-500">
            <HiCalendar className="text-lg" />
            <p className="text-xs">This Month</p>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-100">
          <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Monthly Expenses</h1>
          <div className="mt-2">
            <span className="text-2xl font-bold text-red-400">$1,150.00</span>
          </div>
          <div className="flex items-center mt-4 gap-2 text-gray-500">
            <HiCalendar className="text-lg" />
            <p className="text-xs">This Month</p>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-100">
          <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Savings Rate</h1>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-800">45%</span>
          </div>
          <div className="flex items-center mt-4 gap-1 text-gray-500">
            <span className="font-bold text-sm">%</span>
            <p className="text-xs">Of income saved</p>
          </div>
        </div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-5 rounded-xl border border-gray-100">
          <span className="text-gray-700 font-bold text-xl block mb-4">Spending by Category</span>
          
          {/* Add a wrapper with a fixed height here */}
          <div className="relative h-[300px] w-full"> 
            <Doughnut data={CategoryPieData} options={options}/>
          </div>
        </div>

       <div className="bg-white shadow-md p-5 rounded-xl border border-gray-100">
          <span className="text-gray-700 font-bold text-xl block mb-4">Monthly Overview</span>
          
          {/* The missing wrapper: must have 'relative' and a height like 'h-[300px]' */}
          <div className="relative h-[300px] w-full">
            <Bar data={BudgetAnalysisBarData} options={AnalysisOption}/>
          </div>
        </div>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 bg-white rounded-xl overflow-hidden  shadow-md ">
          <div className="max-h-[250px] overflow-y-auto scrollbar-hide">
          <table class="table-fixed w-full text-center border-collapse ">
            <thead className=" sticky top-0 text-center bg-gray-400 tracking-wider text-sm uppercase">
                <tr className="text-gray-700">
                  <th className="p-3 text-white">Date</th>
                  <th className="p-3 text-white">Description</th>
                  <th className="p-3 text-white">Category</th>
                  <th className="p-3 text-white">Type</th>
                  <th className="p-3 text-white">Amount</th>
                </tr>
            </thead>
            <tbody>
                {[
                  {
                    "Date" : "04-20-2026",
                    "Description": "Fund Transfer",
                    "Category": "Fund Transfer",
                    "Type": "Transfer",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Salary",
                    "Category": "Income",
                    "Type": "Income",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  },{
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  },
                  {
                    "Date" : "04-20-2026",
                    "Description": "Payment for Goods",
                    "Category": "Food",
                    "Type": "Expense",
                    "Amount": "12000"
                  }
                ].map((data,index)=>(
                    <tr className="p-2 hover:bg-gray-100">
                      <td className="p-2 tracking-wider text-sm">{data.Date}</td>
                      <td className="p-2 tracking-wider text-sm">{data.Description}</td>
                      <td className="p-2 tracking-wider text-sm">{data.Category}</td>
                      <td className={data.Type === "Transfer" ? "text-gray-400 tracking-wider text-sm" : 
                        data.Type === "Income" ? "text-blue-400 tracking-wider text-sm" : "text-red-400 tracking-wider text-sm"
                      }>{data.Type}</td>
                      <td className={data.Type === "Transfer" ? "text-gray-400 tracking-wider text-sm" : 
                        data.Type === "Income" ? "text-blue-400 tracking-wider text-sm" : "text-red-400 tracking-wider text-sm"
                      }>{data.Type === "Transfer" ? 
                      `₱${data.Amount}` : data.Type === "Income" ? `+₱${data.Amount}` : `-₱${data.Amount}`}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          </div>
       </div>
    </div>
  );
}

export default Dashboard;