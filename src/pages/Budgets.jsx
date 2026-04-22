import { useState } from "react"
import { HiPlusCircle } from "react-icons/hi"
import CreateBudgetModal from "../components/Budgets/CreateBudgetModal"
function Budgets(){
    const [isOpen,setIsOpen] = useState(false)

    return(
        <div className="space-y-4 sm:space-y-10">
            <div className="bg-white shadow-md  p-4">
                <div className="flex flex-col justify-between  sm:flex-col md:flex-row space-y-5">
                    <h1 className="mt-10 sm:mt-10 md:mt-0 text-blue-500 font-bold text-2xl">Budget Categories</h1>
                    <button onClick={()=>setIsOpen(true)} className="flex items-center justify-center gap-1 text-sm p-1 px-4 bg-blue-400 text-white tracking-wider font-medium"><HiPlusCircle className=""/>Add Category</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col flex-1  p-4 bg-white shadow-md space-y-2">
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <span className="rounded-full bg-blue-400 p-3 text-white">AC</span>
                        </div>
                        <div>
                            <h1 className="font-medium tracking-wider">Food</h1>
                            <span className="text-sm tracking-wider">Budget: $1000</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-medium tracking-wider">Spent: $500.00</span>
                        <span className="font-medium tracking-wider">Remaining: $500.00</span>
                        <div className=" bg-gray-200 h-1 overflow-hidden mt-2 ">
                            <div className="bg-blue-600 h-1 transition-all duration-500 ease-out">

                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xs tracking-wider">50% of Budget</span>
                            <span className="text-xs tracking-wider">$500.00 left</span>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div>
                <CreateBudgetModal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
            </div>
        </div>
    )
}

export default Budgets