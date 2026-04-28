import { HiArrowSmUp, HiCalendar } from "react-icons/hi";
import {Chart, CategoryScale,LinearScale, BarElement,Title, ArcElement,Tooltip,Legend, plugins} from "chart.js";
import {Doughnut,Bar} from 'react-chartjs-2'
import { useEffect,useState } from "react";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip, 
  Legend)
    
function Dashboard() {
  
const [transactionData,setTransactionData] = useState([])
const [categories, setCategories] = useState([])


const expenseTransactions = transactionData.filter(t=> t.Type === "Expense")
const transactions = [...new Set(expenseTransactions.map(t => t.Category))]

const chartLabels = transactions.map(id =>{
  
  const category =categories.find(cat => cat.id === id)
  return category ? category.description : "Uncategorized"
})

const chartDataValues = transactions.map( id =>{
  return transactionData.filter(t => t.Category == id && t.Type === "Expense").reduce((sum,t) => sum + t.Amount,0)
})



const CategoryPieData = {
  labels: chartLabels,
  datasets: [{
    label: 'Spending by Category',
    data: chartDataValues,
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
    ],
    borderWidth: 1
  }]
};

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

const uniqueType = [...new Set(transactionData.map(transaction => transaction.Type))]

const barData = uniqueType.map(type =>{
    return transactionData.filter(t => t.Type ===type).reduce((sum,t)=> sum + t.Amount,0)   
})
console.log(barData)

const typeStyle = uniqueType.map(type=>{
    if(type === 'Transfer'){
      return {
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          borderColor: 'rgba(128,128,128, 1)'
      }
    }
    else if (type === 'Expense'){
      return {
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)'
      }
    }else{
      return {
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
      }
    }
})


const BudgetAnalysisBarData = {
  labels: uniqueType, // These go on the X-axis
  datasets: [
    {
      label: "Profit and Loss", // The name shown in the tooltip/legend
      data: barData,   // The actual bar heights
      backgroundColor: typeStyle.map(t=>t.backgroundColor),
      borderColor: typeStyle.map(t=>t.borderColor),
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

useEffect(()=>{
  const fetchData = ()=>{
    try{
        const savedData = localStorage.getItem("transaction_data")

        if(savedData){

           const parsedData = JSON.parse(savedData)

          setTransactionData(parsedData)
        }
      

       
    }catch(error){
      console.log("Error fetching data",error)
      setTransactionData([])
    }
  }
  fetchData()

  window.addEventListener('storage',fetchData)
  window.addEventListener('local-update',fetchData)

  return ()=>{
    window.removeEventListener('storage',fetchData)
    window.removeEventListener('storage',fetchData)
  }
},[])


useEffect(()=>{
  const fetchCategories = ()=>{
    const savedCategories = localStorage.getItem("categories_data")

    if(savedCategories){
        try{
            const category = JSON.parse(savedCategories)
            setCategories(category)
        }catch{
          console.log("Unable to fetch categories!",error)
          setCategories([])
        }
    }
  }
  fetchCategories()

  window.addEventListener("storage",fetchCategories)
  window.addEventListener("categories-update",fetchCategories)

  return(()=>{
    window.removeEventListener("storage",fetchCategories)
    window.removeEventListener("categories-update",fetchCategories)
  })
},[])

const MonthlyIncome = transactionData.filter(transaction => transaction.Type === "Income").reduce((sum,transaction) => sum + Number(transaction.Amount),0)
const MonthlyExpense = transactionData.filter(transaction => transaction.Type === "Expense").reduce((sum,transaction)=> sum + Number(transaction.Amount),0)
const totalBalance = MonthlyIncome - MonthlyExpense
const savingsRate = MonthlyIncome > 0 ? ((MonthlyIncome - MonthlyExpense) / totalBalance) * 100: 0
  return (
    <div className="space-y-10">
      {/* grid-cols-1: Mobile (1 card per row)
         sm:grid-cols-2: Tablets (2 cards per row)
         lg:grid-cols-4: Desktop (4 cards per row)
      */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
            {/* Total Balance */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
              <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Balance</h1>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-gray-800 text-2xl font-bold`}>{`${totalBalance.toLocaleString('en-PH',{style:'currency',currency:'PHP'})}`}</span>
              </div>
              <div className="flex items-center mt-4 text-blue-400  w-fit px-2 py-1 rounded-md">
                <HiArrowSmUp className="text-lg" />
                <p className="text-xs font-semibold">0% from last month</p>
              </div>
            </div>

            {/* Monthly Income */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
              <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Monthly Income</h1>
              <div className="mt-2">
                <span className="text-2xl font-bold text-blue-400">{`${MonthlyIncome.toLocaleString('en-PH',{style: 'currency', currency:'PHP'})}`}</span>
              </div>
              <div className="flex items-center mt-4 gap-2 text-gray-500">
                <HiCalendar className="text-lg" />
                <p className="text-xs">This Month</p>
              </div>
            </div>

            {/* Monthly Expenses */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
              <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Monthly Expenses</h1>
              <div className="mt-2">
                <span className="text-2xl font-bold text-red-400">{`${MonthlyExpense.toLocaleString('en-PH',{style: 'currency',currency: 'PHP'})}`}</span>
              </div>
              <div className="flex items-center mt-4 gap-2 text-gray-500">
                <HiCalendar className="text-lg" />
                <p className="text-xs">This Month</p>
              </div>
            </div>

            {/* Savings Rate */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
              <h1 className="text-sm text-gray-500 font-medium uppercase tracking-wider">Savings Rate</h1>
              <div className="mt-2">
                <span className="text-2xl font-bold text-gray-800">{`${savingsRate.toFixed(0)}%`}</span>
              </div>
              <div className="flex items-center mt-4 gap-1 text-gray-500">
                <span className="font-bold text-sm">%</span>
                <p className="text-xs">Of income saved</p>
              </div>
            </div>

          </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-5 border border-gray-100">
          <span className="text-gray-700 font-bold text-xl block mb-4">Spending by Category</span>
          
          {/* Add a wrapper with a fixed height here */}
          <div className="relative h-[300px] w-full"> 
            <Doughnut data={CategoryPieData} options={options}/>
          </div>
        </div>

       <div className="bg-white shadow-md p-5 border border-gray-100">
          <span className="text-gray-700 font-bold text-xl block mb-4">Monthly Overview</span>
          
          {/* The missing wrapper: must have 'relative' and a height like 'h-[300px]' */}
          <div className="relative h-[300px] w-full">
            <Bar data={BudgetAnalysisBarData} options={AnalysisOption}/>
          </div>
        </div>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 bg-white overflow-hidden  shadow-md ">
          <div className="max-h-[250px] overflow-y-auto scrollbar-hide">
          <table className="table-fixed w-full text-center border-collapse ">
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
                {
                  transactionData.length > 0 ? 
                  (
                    transactionData.map((data,index)=>{

                      const categoriesObj = categories.find(cat=> cat.id === data.Category)
                      const categoryName = categoriesObj ? categoriesObj.description : "General"
                   return(
                     <tr key={data.id} className="p-2 hover:bg-gray-100">
                      <td className="p-2 tracking-wider text-sm">{data.Date}</td>
                      <td className="p-2 tracking-wider text-sm">{data.Description}</td>
                      <td className="p-2 tracking-wider text-sm">{categoryName}</td>
                      <td className={data.Type === "Transfer" ? "text-gray-400 tracking-wider text-sm" : 
                        data.Type === "Income" ? "text-blue-400 tracking-wider text-sm" : "text-red-400 tracking-wider text-sm"
                      }>{data.Type}</td>
                      <td className={data.Type === "Transfer" ? "text-gray-400 tracking-wider text-sm" : 
                        data.Type === "Income" ? "text-blue-400 tracking-wider text-sm" : "text-red-400 tracking-wider text-sm"
                      }>{data.Type === "Transfer" ? 
                      `₱${data.Amount}` : data.Type === "Income" ? `${data.Amount.toLocaleString()}` : `-₱${data.Amount}`}</td>
                    </tr>
                   )
                })
                  ) : 
                  <tr className="w-full">
                      <td className="p-8 italic text-gray-500" colSpan={5}>No Transactions Yet!</td>
                  </tr>
                }
            </tbody>
          </table>
          </div>
       </div>
    </div>
  );
}

export default Dashboard;