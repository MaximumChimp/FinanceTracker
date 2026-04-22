
import { HiHome,HiShoppingCart,HiShieldCheck,HiCreditCard,HiGift,HiTrendingUp} from "react-icons/hi";
import { BiSolidZap,BiCar  } from "react-icons/bi";
import { IoGameController,IoTicket } from "react-icons/io5";
import { FaUtensils,FaPlaneUp,FaPiggyBank,FaLaptop,FaMoneyBill1Wave } from "react-icons/fa6";
import { useState } from "react";

function CreateBudgetModal({isOpen,onClose}){
    if(!isOpen) return null
    
    const Icons = [
        <HiHome/>,
        <HiShoppingCart/>,
        <HiShieldCheck/>
    ]

    const [isChangeIcon,setIsChangeIcon] = useState(false)

    return(
        <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center">
            <div className="bg-white flex flex-col  justify-center p-5 space-y-5">
                <div className="flex items-center justify-center">
                    <span onClick={()=>setIsChangeIcon(true)} className="rounded-full text-white bg-blue-400 p-5">AC</span>
                    {
                        isChangeIcon && (
                            <div className="flex items-center justify-center fixed gap-2 bg-white">
                                {   
                                    Icons.map((icon,index)=>(
                                        <div className="bg-red-200">
                                            <div key={index} className="bg-red-500 p-4 border-1 gap-2">
                                            <button onClick={()=>setIsChangeIcon(false)} className="text-black text-5xl p-2">
                                                {icon}
                                            </button>
                                        </div>   
                                        </div> 
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-row mt-4 gap-4">
                    <div className="flex flex-col">
                        <span className="text-sm">Description</span>
                        <input type="text" placeholder="eg. Transportation" className="border-b-1 border-gray-300 outline-0 focus:border-b-blue-400"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm">Budget</span>
                        <input type="text" placeholder="₱0.00" className="border-b-1 border-gray-300 outline-0 focus:border-b-blue-400"/>
                    </div>
                </div>    
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-400 px-4 p-2 text-white">Close</button>
                    <button className="bg-blue-400 px-4 p-2 text-white">Save</button>
                </div>    
            </div>
        </div>
    )
}

export default CreateBudgetModal