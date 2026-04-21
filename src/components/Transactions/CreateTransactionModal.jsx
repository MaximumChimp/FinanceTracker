import { useState } from "react";
function CreateTransactionModal({isOpen,onClose}){
   if (!isOpen) return null;

   const [amount,setAmount]  = useState(0.00)
   const [description,setDescription] = useState("")
   const [category,setCategory] = useState("Food")
   const [type,setType] = useState("Income")
   const [date,setDate] = useState(new Date().toISOString().split('T')[0])
   
   const handleSave = ()=> {
        if(!amount || !description) return alert("Please fill all required field!")
        const uuid = crypto.randomUUID().split('-')[0]
        
        const newTransaction = {
            id: uuid,
            Date: date,
            Description: description,
            Category:category,
            Type:type,
            Amount:Number(amount)
        }

        let oldTransaction = []
        
        const savedData = JSON.parse(localStorage.getItem("transaction_data"))

        try{
            oldTransaction = Array.isArray(savedData) ? savedData : []
        }catch{
            oldTransaction = []
        }

        const UpdatedDate = [newTransaction,...oldTransaction]

        localStorage.setItem("transaction_data", JSON.stringify(UpdatedDate))
        window.dispatchEvent(new Event("local-update"))
        setAmount("");
        setDescription("");
        
        onClose()
   }
   return(
        <div className="fixed flex items-center justify-center z-50 bg-black/50 inset-0">
            <div className="relative p-4 rounded-xl bg-white w-[90%] max-w-[550px] space-y-2">
                <h1 className="text-xl text-blue-500 font-bold pt-2">Create New Transaction</h1>
                <div className="flex flex-col justify-center ">
                    <div className="flex flex-col-reverse items-center justify-center p-4">
                        <h1 className="text-lg font-bold p-2 text-blue-400">Amount</h1>
                        <input type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="0.00" autoFocus className="border-b-1 w-[50%] border-gray-300 outline-0 focus:border-blue-400 transition-300 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                    </div>
                    <div className="flex justify-around space-y-5 gap-5">
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Description</label>
                            <input type="text" onChange={(e)=>setDescription(e.target.value)} className="border-b-1 text-sm pt-1 border-b-gray-300 outline-0 focus:border-b-blue-400 " placeholder="eg.Payment for Goods" />
                        </div>
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Date</label>
                            <input type="date" className="border-b-1 border-gray-300 text-sm pt-1 outline-0 focus:border-b-blue-400" value={date} onChange={(e)=>setDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Category</label>
                            <select name="" id="" onChange={(e)=>setCategory(e.target.value)}  className="border-b-1 border-b-gray-300 outline-0 focus:border-b-blue-400 text-sm ">
                                <option value="Food">Food</option>
                                <option value="Income">Income</option>
                                <option value="Transportation">Trasportation</option>
                                <option value="Housing">Housing</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Transfer">Transfer</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Type</label>
                            <select name="" id="" onChange={(e)=>setType(e.target.value)} className="border-b-1 border-b-gray-300 focus:border-b-blue-400 outline-0 text-sm ">
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                                <option value="Transfer">Transfer</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2 pt-3">
                    <button onClick={onClose} className="p-2 bg-gray-400 text-white rounded-md px-10">Close</button>
                    <button onClick={handleSave} className="p-2 bg-blue-400 text-white rounded-md px-10">Save</button>
                </div>
            </div>
        </div>
   )
}

export default CreateTransactionModal