import { useState } from "react"
function CreateCategoryModal({isOpen,onClose}){
    if(!isOpen) return null

    const [category,setCategory] = useState(null)
    
    const handleSave = ()=>{
        if(category.length === 0 ) return alert("Category field required!")
  
        const newCategory = {
            id: crypto.randomUUID().split("-")[0],
            date: new Date().toISOString().split('T')[0],
            categoryName: category
        }

        let prevCategories = []

      
        
        try{
              let cat = JSON.parse(localStorage.getItem("categories"))
            prevCategories = Array.isArray(cat) ? cat : []
        }catch(e){
            prevCategories = []
        }

        const updatedCat = [newCategory,...prevCategories]

        localStorage.setItem("categories",JSON.stringify(updatedCat))
        


        window.dispatchEvent(new Event("add-categories"))
        setCategory("")
        onClose()

    }

  
    return(
        <div className="fixed flex items-center justify-center inset-0 bg-black/50 z-100">
            <div className="bg-white p-4 space-y-3">
            <h1 className="text-blue-500 text-xl font-bold">Create New Category</h1>
            <div className="pt-4">
                <div  className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm">Category Name:</label>
                    <input type="text" onChange={(e)=>setCategory(e.target.value)} className="border-0 border-b-1 focus:border-b-blue-400 outline-0" />
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button className="bg-gray-400 p-2 px-10 text-white" onClick={onClose}>Close</button>
                <button className="bg-blue-400 text-white p-2 px-10" onClick={handleSave}>Save Category</button>
            </div>
            </div>
        </div>
    )
}
export default CreateCategoryModal