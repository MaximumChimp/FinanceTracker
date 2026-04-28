import { useEffect, useState } from "react"
import { HiPlusCircle,HiDotsHorizontal } from "react-icons/hi"
import CreateBudgetModal from "../components/Budgets/CreateBudgetModal"
import EditBudgetModal from "../components/Budgets/EditBudgetModal"
import { Icons,Colors } from "../config/iconConfig"

function Budgets(){
    const [isOpen,setIsOpen] = useState(false)
    const [categoryList,setCategoryList] = useState([])
    const [transactions,setTransactions] = useState([])
    const [activeMenu,setActiveMenu] = useState(null)
    const [editingCategory, setEditingCategory] = useState(null)
    const [isEditingOpen,setIsEditingOpen] = useState(false)
    const [categoryId, setCategoryId] = useState(null)


   useEffect(() => {
        const fetchData = () => {
            const savedData = localStorage.getItem("categories_data");
            if (savedData) {
                try {
                    const updatedData = JSON.parse(savedData);
                    // Functional update is safer to avoid unnecessary re-renders
                    setCategoryList(updatedData);
                } catch (error) {
                    console.error("Error on fetching data!", error);
                    setCategoryList([]);
                }
            }
        };

        const closeMenu = (e) => {
            // Optimization: Don't set state if it's already null
            setActiveMenu(current => current === null ? null : null);
        };

        // Initial fetch
        fetchData();

        // Setup listeners
        window.addEventListener("storage", fetchData);
        window.addEventListener("categories-update", fetchData);
        window.addEventListener("click", closeMenu);

        // Cleanup
        return () => {
            window.removeEventListener("storage", fetchData);
            window.removeEventListener("categories-update", fetchData);
            window.removeEventListener("click", closeMenu);
        };
    }, []);

    
    useEffect(()=>{
        let fetchTransactions = () =>{
            let saved_transactions =  localStorage.getItem("transaction_data")

            if(saved_transactions){
                try{
                    let transaction = JSON.parse(saved_transactions)
                    setTransactions(transaction)
                }catch(error){
                    console.log("Error fetcing transactions",error)
                    setTransactions([])
                }
            }
        }

        fetchTransactions()
       
    },[])

  


    const handleDelete = (id) =>{
        const update = categoryList.filter(cat=> cat.id !== id)
        localStorage.setItem("categories_data",JSON.stringify(update))

        window.dispatchEvent(new Event("categories-update"))
    }

    return(
        <div className="space-y-4 sm:space-y-10">
            <div className="bg-white shadow-md p-4">
                <div className="flex flex-col justify-between sm:items-center sm:flex-row md:flex-row space-y-5">
                <h1 className="text-2xl font-bold text-blue-500 mt-10 sm:mt-10 md:mt-0">Budgets</h1>
                <button onClick={()=>setIsOpen(true)} className="bg-blue-400 p-2 font-medium sm:text-sm md:text-sm lg:text-sm text-white  tracking-wider flex items-center justify-center gap-1"><HiPlusCircle /> Add Category</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {
                    categoryList.map((category,index)=>{
                        if(!category) return null;
                        // --- NEW CALCULATION BLOCK ---
                        const totalSpent = transactions
                            .filter(t => t.Category === category.id)
                            .reduce((sum, t) => sum + Number(t.Amount), 0);

                        const remaining = category.budget - totalSpent;
                        const spentPercentage = Math.min((totalSpent / category.budget) * 100, 100);
                        // -----------------------------
                        return(
                        
                            <div key={category.id} className="flex flex-col flex-1  p-4 bg-white shadow-md space-y-2">
                          
                            <div className="relative">
                                <HiDotsHorizontal className="float-right cursor-pointer hover:text-blue-500" onClick={(e)=>{e.stopPropagation(),setActiveMenu(activeMenu === index ? null : index)}}/> 
                                {/* Hidden Action Menu */}
                                {activeMenu === index && (
                                    <div className="absolute right-0 top-6 w-32 bg-white  shadow-xl z-20 rounded-md py-1">
                                        <div 
                                            onClick={() => { setEditingCategory(category); setIsEditingOpen(true); setCategoryId(category.id)}}
                                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-gray-700"
                                        >
                                            Edit
                                        </div>
                                        <div 
                                            onClick={() => handleDelete(category.id)}
                                            className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <div className={`${category.color} p-2 rounded-full`}>
                                    <span className={`rounded-full text-2xl text-white`}>{Icons[category.icon]}</span>
                                </div>
                                <div>
                                    <h1 className="font-medium tracking-wider">{category.description}</h1>
                                    <span className="text-sm tracking-wider">{`Budget: ₱${Number(category.budget).toLocaleString()}`}</span>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium tracking-wider">Spent: {`₱${totalSpent.toLocaleString()}`}</span>
                                <span className="font-medium tracking-wider">Remaining: {`₱${remaining.toLocaleString()}`}</span>
                                <div className=" bg-gray-200 h-1 overflow-hidden mt-2 ">
                                    <div className={` ${category.color} h-full transition-all duration-500 ease-out`} style={{width:`${spentPercentage}%`}} >

                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs tracking-wider">{`${spentPercentage.toFixed(0)}%`} of Budget</span>
                                    <span className="text-xs tracking-wider">{`₱${remaining.toLocaleString()}`} left</span>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
            
            <div>
                <CreateBudgetModal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
            </div>

            <div>
                <EditBudgetModal isOpen={isEditingOpen} onClose={()=> setIsEditingOpen(false)} id={categoryId}/>
            </div>

            
        </div>
    )
}

export default Budgets