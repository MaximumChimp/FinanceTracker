import { HiPlusCircle,HiPencilAlt,HiTrash,HiDotsHorizontal  } from "react-icons/hi";
import { useEffect, useState } from "react";
import CreateTransactionModal from "../components/Transactions/CreateTransactionModal";
import EditTransactionModal from "../components/Transactions/EditTransactionModal";
const DisplayMonths = ["All","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];






function Transactions(){
    const [isOpen, setIsOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [filterType,setFilterType] = useState('All')
    const [filterCategory,setFilterCategory] = useState('All')
    const [filterMonths,setFilterMonths] = useState('All')
    const [transactionId,setTransactionId] = useState('')

    const [transactionData,setTransactionData] = useState([])
    

    const filteredData = transactionData.filter((data,_)=>{
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' })
        .format(new Date(data.Date));
        const matchesType = filterType === 'All' || data.Type === filterType
        const matchesCategory = filterCategory === 'All' || data.Category === filterCategory
        
        const matchesMonth = filterMonths.toLowerCase() === 'all' ||  monthName === filterMonths
        return matchesType && matchesCategory && matchesMonth
    })
  

    useEffect(()=>{
        const fetchData =()=>{
            const savedData = localStorage.getItem("transaction_data")

            if(savedData){
                try{
                    const parsedData = JSON.parse(savedData)
                    setTransactionData(parsedData)
                }catch(error){
                    console.log("Error parsing LocalStorage data",error)
                    setTransactionData([])
                }
            }
        }

        fetchData()

        window.addEventListener("storage",fetchData)

        window.addEventListener("local-update",fetchData)

        return ()=>{
            window.removeEventListener("storage",fetchData)
            window.removeEventListener("local-update",fetchData)
        }
    },[])


    return(
        <div className="space-y-4 sm:space-y-10">
            <div className="sticky top-0 bg-white w-full p-4 shadow-md rounded-xl">
                <div className="flex flex-col justify-between sm:items-center sm:flex-row md:flex-row space-y-5">
                <h1 className="text-2xl font-bold text-blue-500 mt-10 sm:mt-10 md:mt-0">Transactions</h1>
                <button onClick={()=>setIsOpen(true)} className="bg-blue-400 p-2 font-medium sm:text-sm md:text-sm lg:text-sm text-white rounded-xl tracking-wider flex items-center justify-center gap-1"><HiPlusCircle /> Create Transaction</button>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-row justify-center text-xs pt-5 pb-4 sm:justify-start md:justify-start sm:text-sm gap-4">
                <div className="flex justify-between gap-3">
                     <div className="flex flex-col space-y-2">
                        <span className="text-xs uppercase tracking-wider">Type</span>
                        <select name="" id="" onChange={(e)=>setFilterType(e.target.value)} className="border border-gray-200 rounded-lg p-2 tracking-wider text-sm outline-0">
                            <option value="All">All</option>
                            <option value="Income">Income</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                    <div className="flex flex-col flex-1 space-y-2">
                        <span className="text-xs uppercase tracking-wider">Category</span>
                        <select name="" id="" onChange={(e)=>setFilterCategory(e.target.value)} className="border border-gray-200 rounded-lg p-2 tracking-wider text-sm outline-0">
                            <option value="All">All Categories</option>
                            <option value="Income">Income</option>
                            <option value="Food">Food</option>
                            <option value="Housing">Housing</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Shopping">Shopping</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-xs uppercase tracking-wider">Month</span>
                     <select name="" id="" onChange={(e)=>setFilterMonths(e.target.value)} className="border border-gray-200 rounded-lg p-2 tracking-wider text-sm outline-0">
                        {DisplayMonths.map((data,index)=>(
                            <option key={index} value={data}>{data}</option>
                        ))}
                    </select>
                </div>
            </div>
            </div>

            <div className="hidden md:block bg-white rounded-xl max-h-[650px] shadow-md overflow-hidden overflow-y-auto scrollbar-hide">
                <table className="w-full table-fixed bg-white">
                    <thead className="bg-gray-400 text-white sticky top-0 ">
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
                        filteredData.length > 0 ?(
                            filteredData.map((data,_)=>(
                            <tr key={data.id} className="hover:bg-gray-100 transition-all duration-300 ease-in-out opacity-100">
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
                                    <button onClick={()=>{ setEditModalOpen(true),setTransactionId(data.id) }}><HiPencilAlt className="text-blue-500 text-lg"/></button>
                                    <button><HiTrash className="text-red-500 text-lg"/></button>
                                </td>
                            </tr>
                        ))
                        ): 
                        <tr className="w-full">
                           <td className="p-8 text-center text-gray-500 italic" colSpan={6}>No Trasactions Yet!</td>
                        </tr>
                       }
                    </tbody>
                </table>
            </div>
            
            {
                transactionData.map((data,index)=>(
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

            <div className="">
                <CreateTransactionModal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
                <EditTransactionModal isOpen= {editModalOpen} onClose={()=> setEditModalOpen(false)} id={transactionId}/>
            </div>
        </div>
    )
}

export default Transactions