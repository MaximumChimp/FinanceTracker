import { HiPlusCircle,HiPencilAlt,HiTrash,HiDotsHorizontal  } from "react-icons/hi";


const DisplayMonths = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const MockTransactions = [
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
            },{
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
           
        ]

function Transactions(){
    return(
        <div className="space-y-4 sm:space-y-10">
            <div className="sticky top-0 bg-white w-full p-4 shadow-md rounded-xl">
                <div className="flex flex-col justify-between sm:items-center sm:flex-row md:flex-row space-y-5">
                <h1 className="text-2xl font-bold text-blue-500 mt-10 sm:mt-10 md:mt-0">Transactions</h1>
                <button className="bg-blue-400 p-2 font-medium sm:text-sm md:text-sm lg:text-sm text-white rounded-xl tracking-wider flex items-center justify-center gap-1"><HiPlusCircle /> Create Transaction</button>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-row justify-center text-xs pt-5 pb-4 sm:justify-start md:justify-start sm:text-sm gap-4">
                <div className="flex justify-between gap-3">
                     <div className="flex flex-col space-y-2">
                        <span className="text-xs uppercase tracking-wider">Type</span>
                        <select name="" id="" className="border border-gray-200 rounded-lg p-2 tracking-wider text-sm">
                            <option value="">All</option>
                            <option value="">Income</option>
                            <option value="">Transfer</option>
                            <option value="">Expense</option>
                        </select>
                    </div>
                    <div className="flex flex-col flex-1 space-y-2">
                        <span className="text-xs uppercase tracking-wider">Category</span>
                        <select name="" id="" className="border border-gray-200 rounded-lg p-2 tracking-wider text-sm">
                            <option value="">All Categories</option>
                            <option value="">Income</option>
                            <option value="">Food</option>
                            <option value="">Housing</option>
                            <option value="">Transportation</option>
                            <option value="">Entertainment</option>
                            <option value="">Shopping</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-xs uppercase tracking-wider">Month</span>
                     <select name="" id="" className="border border-gray-200 rounded-lg p-2 tracking-wider text-sm">
                        {DisplayMonths.map((data,index)=>(
                            <option key={index} >{data}</option>
                        ))}
                    </select>
                </div>
            </div>
            </div>

            <div className="hidden md:block bg-white rounded-xl max-h-[650px] shadow-md overflow-hidden overflow-y-auto scrollbar-hide">
                <table className="w-full bg-white">
                    <thead className="bg-gray-400 text-white sticky top-0">
                        <tr className="">
                            <th className="p-4 tracking-wider uppercase text-md font-medium">Date</th>
                            <th className="p-4 tracking-wider uppercase text-md font-medium">Description</th>
                            <th className="p-4 tracking-wider uppercase text-md font-medium">Category</th>
                            <th className="p-4 tracking-wider uppercase text-md font-medium">Type</th>
                            <th className="p-4 tracking-wider uppercase text-md font-medium">Amount</th>
                            <th className="p-4 tracking-wider uppercase text-md font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                       {
                        MockTransactions.map((data,index)=>(
                            <tr className="hover:bg-gray-100 ">
                                <td className="p-2 tracking-wider uppercase text-sm" >{data.Date}</td>
                                <td className="p-2 tracking-wider text-sm">{data.Description}</td>
                                <td className="p-2 tracking-wider text-sm">{data.Category}</td>
                                <td className="p-2 tracking-wider text-sm">{data.Type}</td>
                                <td className={data.Type === "Transfer" ? "p-2 tracking-wider uppercase text-sm text-gray-400":
                                    data.Type === "Income" ? "p-2 tracking-wider uppercase text-sm text-blue-400" : "p-2 tracking-wider uppercase text-sm text-red-400"
                                }>{data.Type === "Transfer" ? `₱${data.Amount}` : 
                                    data.Type === "Income" ? `+₱${data.Amount}` : `-₱${data.Amount}`
                                }</td>
                                <td className="p-2 tracking-wider uppercase text-sm space-x-2">
                                    <button><HiPencilAlt className="text-blue-500 text-lg"/></button>
                                    <button><HiTrash className="text-red-500 text-lg"/></button>
                                </td>
                            </tr>
                        ))
                       }
                    </tbody>
                </table>
            </div>
            
            {
                MockTransactions.map((data,index)=>(
                    <div key={index} className="flex flex-col bg-white p-2 rounded-xl shadow-md space-y-4  md:hidden lg:hidden">   
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 tracking-wider">{data.Date}</span>
                                <span className={data.Type === "Transfer" ? "bg-gray-400 text-xs p-1 rounded-xl text-white pl-2 pr-2" : 
                                    data.Type === "Income" ? "bg-blue-400 text-xs rounded-xl p-1 text-white pl-2 pr-2" : "bg-red-400 text-xs pl-2 pr-2 text-white p-1 rounded-xl"
                                }>{data.Type}</span>
                            </div>
                            <div>
                                <span><HiDotsHorizontal className="text-xl rounded-xl text-gray-400"/></span>
                            </div>
                        </div>
                        <div className="">
                            <h1 className="text-md font-semibold text-gray-500">{data.Description}</h1>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">{data.Category}</span>
                            <span className={data.Type === "Transfer" ? "text-gray-400 font-bold " : 
                                data.Type === "Income" ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{data.Type === "Transfer" ? `₱${data.Amount}` :
                                data.Type === "Income" ? `+₱${data.Amount}` : `-₱${data.Amount}`
                                }</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Transactions