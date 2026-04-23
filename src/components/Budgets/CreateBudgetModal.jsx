import { HiHome, HiShoppingCart, HiShieldCheck, HiCreditCard, HiGift, HiTrendingUp } from "react-icons/hi";
import { BiSolidZap, BiCar } from "react-icons/bi";
import { IoGameController, IoTicket } from "react-icons/io5";
import { FaUtensils, FaPlaneUp, FaPiggyBank, FaLaptop, FaMoneyBill1Wave } from "react-icons/fa6";
import { useState } from "react";
import { replace } from "react-router-dom";

function CreateBudgetModal({ isOpen, onClose }) {
    if (!isOpen) return null;

     const Icons = {
        "HiHome": <HiHome />,
        "HiShoppingCart": <HiShoppingCart />,
        "HiShieldCheck": <HiShieldCheck />,
        "HiCreditCard": <HiCreditCard />,
        "HiGift": <HiGift />,
        "HiTrendingUp": <HiTrendingUp />,
        "BiSolidZap": <BiSolidZap />,
        "BiCar": <BiCar />,
        "IoGameController": <IoGameController />,
        "IoTicket": <IoTicket />,
        "FaUtensils": <FaUtensils />,
        "FaPlaneUp": <FaPlaneUp />,
        "FaPiggyBank": <FaPiggyBank />,
        "FaLaptop": <FaLaptop />,
        "FaMoneyBill1Wave": <FaMoneyBill1Wave />
    };

    const colors = [
        'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400',
        'bg-teal-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'
    ];

    const [isChangeIcon, setIsChangeIcon] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(<HiHome />);
    const [selectedColor, setSelectedColor] = useState('bg-blue-400');
    const [amount, setAmount] = useState(0.00)
    const [description,setDescription] = useState("")

    const handleSaveCategory = ()=>{
        if(!amount || !description) return alert("Please fill all Fields!")


        const uuid = crypto.randomUUID().split('-')[0]
        const newCategoryData = {
            id: uuid,
            description: description,
            amount: amount,
            color: selectedColor,
            icon: selectedIcon
        }

        let oldCategoriesData = []

        
        const savedCategory = JSON.parse(localStorage.getItem("categories_data"))

        try{
            oldCategoriesData = Array.isArray(savedCategory) ? savedCategory : []

        }catch(error){
            console.log("Error on saving category!",error)
            oldCategoriesData = []
        }
        const UpdatedDate = [newCategoryData,...oldCategoriesData]
       
       localStorage.setItem("categories_data",JSON.stringify(UpdatedDate))
       
       window.dispatchEvent(new Event("categories-update"))
        setAmount("")
        setDescription("")
    }
    
       
    return (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
            {/* Modal Container */}
            <div className="bg-white  shadow-xl w-full max-w-md overflow-hidden relative">
                
                {/* Header/Icon Section */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <span 
                        onClick={() => setIsChangeIcon(!isChangeIcon)} 
                        className={`rounded-full text-white ${selectedColor} text-5xl p-6 cursor-pointer hover:scale-105 transition-transform shadow-lg`}
                    >
                        {Icons[selectedIcon] || <HiHome/>}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">Click to change style</p>
                </div>

                {/* Sub-Modal: Icon & Color Picker */}
                {isChangeIcon && (
                    <div className="absolute inset-0 bg-white z-10 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-gray-700">Customize Icon</h2>
                            <button onClick={() => setIsChangeIcon(false)} className="text-blue-500 text-sm font-semibold">Done</button>
                        </div>
                        
                        <span className="text-xs font-bold text-gray-400 uppercase mb-2">Select Color</span>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {colors.map((colorClass) => (
                                <button 
                                    key={colorClass}
                                    onClick={() => setSelectedColor(colorClass)} 
                                    className={`w-8 h-8 rounded-full border-2 ${colorClass} ${selectedColor === colorClass ? "border-gray-800 scale-110" : "border-transparent"}`}
                                />
                            ))}
                        </div>

                        <span className="text-xs font-bold text-gray-400 uppercase mb-2">Select Icon</span>
                        <div className="grid grid-cols-4 gap-3 overflow-y-auto pr-2 scrollbar-hide">
                            {Object.entries(Icons).map(([name,component]) => (
                                <button 
                                    key={name}
                                    onClick={() => { setSelectedIcon(name); setIsChangeIcon(false); }} 
                                    className="flex items-center justify-center text-2xl p-4 border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    {component}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Form Inputs */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col border-b border-gray-200 focus-within:border-blue-400 transition-colors">
                            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                            <input 
                                type="text" 
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}
                                placeholder="e.g. Shopping" 
                                className="py-2 outline-none bg-transparent text-gray-700"
                            />
                        </div>
                        <div className="flex flex-col border-b border-gray-200 focus-within:border-blue-400 transition-colors">
                            <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
                            <input 
                                type="number" 
                                onChange={(e)=>setAmount(e.target.value)}
                                placeholder="₱0.00" 
                                value={amount}
                                className="py-2 outline-none bg-transparent text-gray-700 font-semibold  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={onClose} 
                            className="flex-1 py-3 px-4  bg-gray-100 text-gray-600 shadow-md font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveCategory}
                            className="flex-1 py-3 px-4  bg-blue-500 text-white font-semibold shadow-md shadow-blue-200 hover:bg-blue-600 transition-colors"
                        >
                            Save Category
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBudgetModal;