import { useEffect, useState } from "react"
import { HiPlusCircle } from "react-icons/hi"
import CreateBudgetModal from "../components/Budgets/CreateBudgetModal"
import { Icons,Colors } from "../config/iconConfig"
function Budgets(){
    const [isOpen,setIsOpen] = useState(false)
    const [categoryList,setCategoryList] = useState([])

  
    useEffect(()=>{
        let fetchData = ()=>{
            let savedData = localStorage.getItem("categories_data")

            if(savedData){
                try{
                    let updatedData = JSON.parse(savedData)
                    setCategoryList(updatedData)
                    console.log(updatedData)
                }catch(error){
                    console.log("Error on fetching data!", error)
                    setCategoryList([])
                }

             
            }
        }

        fetchData()

        window.addEventListener("storage",fetchData)
        window.addEventListener("categories-update",fetchData)
        
        return(()=>{
            window.removeEventListener("storage",fetchData)
            window.removeEventListener("categories-update",fetchData)
        })
        },[])
    return(
        <div className="space-y-4 sm:space-y-10">
            <div className="bg-white shadow-md  p-4">
                <div className="flex flex-col justify-between  sm:flex-col md:flex-row space-y-5">
                    <h1 className="mt-10 sm:mt-10 md:mt-0 text-blue-500 font-bold text-2xl">Budget Categories</h1>
                    <button onClick={()=>setIsOpen(true)} className="flex items-center justify-center gap-1 text-sm p-1 px-4 bg-blue-400 text-white tracking-wider font-medium"><HiPlusCircle className=""/>Add Category</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {
                    categoryList.map((category,index)=>(
                        <div key={index} className="flex flex-col flex-1  p-4 bg-white shadow-md space-y-2">
                            <div className="flex flex-row items-center gap-2">
                                <div className={`${category.color} p-2 rounded-full`}>
                                    <span className={`rounded-full text-2xl text-white`}>{Icons[category.icon]}</span>
                                </div>
                                <div>
                                    <h1 className="font-medium tracking-wider">{category.description}</h1>
                                    <span className="text-sm tracking-wider">{`Budget: ₱${category.amount}`}</span>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="font-medium tracking-wider">Spent: $500.00</span>
                                <span className="font-medium tracking-wider">Remaining: $500.00</span>
                                <div className=" bg-gray-200 h-1 overflow-hidden mt-2 ">
                                    <div className={` ${category.color} h-1 transition-all duration-500 ease-out`}>

                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs tracking-wider">50% of Budget</span>
                                    <span className="text-xs tracking-wider">$500.00 left</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            <div>
                <CreateBudgetModal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
            </div>
        </div>
    )
}

export default Budgets