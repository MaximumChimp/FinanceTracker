import { useState,useEffect } from "react";


function EditTransactionModal({isOpen,onClose,id}){
    if(!isOpen) return null;
    const [date,setDate] = useState(new Date().toISOString().split('T')[0])
    const [transactionData,setTransactionData] = useState(null)
    const [amount,setAmount] = useState(0.00);
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [type,setType] = useState('')

  
    useEffect(()=>{
        if(transactionData){
            setAmount(transactionData.Amount || 0.00);
            setDescription(transactionData.Description || '')
            setCategory(transactionData.Category || '')
            setType(transactionData.Type || '')
            setDate(transactionData.Date || '')
        }
    },[transactionData])



    useEffect(()=>{
        const savedData = localStorage.getItem("transaction_data")

        if(savedData){
            try{
                const parsedData = JSON.parse(savedData)
             
                const transaction = parsedData.find(item => item.id === id)
                
                if(transaction){
                    setTransactionData(transaction)
                }
            }catch(error){  
                console.log("Error on parsing data",error)
                setTransactionData([])
            }
        }
         console.log(transactionData)
    },[id])
   
    const handleSave = (id)=>{

        const savedData = localStorage.getItem("transaction_data")
        if (!savedData) return;
        
        const parsedData = JSON.parse(savedData)
        

        const updateData = parsedData.map(item =>
           
            item?.id === id ? {
                ...item,
                Date: date,
                Amount: amount,
                Category: category,
                Type: type,
                Description : description
            } : item
        )
        
        localStorage.setItem("transaction_data",JSON.stringify(updateData))
        
        window.dispatchEvent(new Event('local-update'))
        onClose()
        
    }

    return(
              <div className="fixed flex items-center justify-center z-50 bg-black/50 inset-0">
            <div className="relative p-4 rounded-xl bg-white w-[90%] max-w-[550px] space-y-2">
                <h1 className="text-xl text-blue-500 font-bold pt-2">Edit Transaction {id}</h1>
                {transactionData && (
                <div key={transactionData.id} className="flex flex-col justify-center ">
                    <div className="flex flex-col-reverse items-center justify-center p-4">
                        <h1 className="text-lg font-bold p-2 text-blue-400">Amount</h1>
                        <input type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="0.00" autoFocus className="border-b-1 w-[50%] border-gray-300 outline-0 focus:border-blue-400 transition-300 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                    </div>
                    <div className="flex justify-around space-y-5 gap-5">
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Description</label>
                            <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} className="border-b-1 text-sm pt-1 border-b-gray-300 outline-0 focus:border-b-blue-400 " placeholder="eg.Payment for Goods" />
                        </div>
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Date</label>
                            <input type="date" value={date} className="border-b-1 border-gray-300 text-sm pt-1 outline-0 focus:border-b-blue-400" onChange={(e)=>setDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col space-y-1 flex-1">
                            <label htmlFor="" className="text-sm">Category</label>
                            <select name="" id="" value={category} onChange={(e)=> setCategory(e.target.value)} className="border-b-1 border-b-gray-300 outline-0 focus:border-b-blue-400 text-sm ">
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
                            <select name="" id="" value={type} onChange={(e)=> setType(e.target.value)} className="border-b-1 border-b-gray-300 focus:border-b-blue-400 outline-0 text-sm ">
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                                <option value="Expense">Transfer</option>
                            </select>
                        </div>
                    </div>
                </div>
                )}
                <div className="flex justify-end space-x-2 pt-3">
                    <button onClick={onClose} className="p-2 bg-gray-400 text-white rounded-md px-10">Close</button>
                    <button onClick={()=>handleSave(id)} className="p-2 bg-blue-400 text-white rounded-md px-10">Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditTransactionModal