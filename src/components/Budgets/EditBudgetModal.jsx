import { Icons, Colors } from "../../config/iconConfig";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi"; // Added missing import

function EditBudgetModal({ isOpen, onClose, id }) {
    const [isChangeIcon, setIsChangeIcon] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("HiHome");
    const [selectedColor, setSelectedColor] = useState('bg-blue-400');
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    // Reset sub-menu when modal opens/closes
    useEffect(() => {
        if (!isOpen) setIsChangeIcon(false);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return; // Don't fetch if modal is closed

        const fetchCategory = () => {
            const savedCategory = localStorage.getItem("categories_data");
            if (savedCategory) {
                try {
                    const parsed_categories = JSON.parse(savedCategory);
                    const category_data = parsed_categories.find(cat => cat.id === id);

                    if (category_data) {
                        setSelectedColor(category_data.color);
                        setSelectedIcon(category_data.icon);
                        setAmount(category_data.budget);
                        setDescription(category_data.description);
                    }
                } catch (error) {
                    console.error("unable to fetch category", error);
                }
            }
        };
        fetchCategory();
    }, [isOpen, id]);

    const handleUpdateCategory = () => {
        try {
            const savedData = localStorage.getItem("categories_data");
            if (savedData) {
                const category_data = JSON.parse(savedData);

                const updateData = category_data.map((cat) =>
                    cat.id === id ? {
                        ...cat,
                        description: description,
                        budget: amount,
                        color: selectedColor,
                        icon: selectedIcon
                    } : cat
                );

                localStorage.setItem("categories_data", JSON.stringify(updateData));
                window.dispatchEvent(new Event("categories-update"));
                onClose();
            }
        } catch (error) {
            console.error("Unable to update data", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl w-full max-w-md overflow-hidden relative rounded-2xl">
                
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
                            {Colors.map((colorClass) => (
                                <button 
                                    key={colorClass}
                                    onClick={() => setSelectedColor(colorClass)} 
                                    className={`w-8 h-8 rounded-full border-2 ${colorClass} ${selectedColor === colorClass ? "border-gray-800 scale-110" : "border-transparent"}`}
                                />
                            ))}
                        </div>

                        <span className="text-xs font-bold text-gray-400 uppercase mb-2">Select Icon</span>
                        <div className="grid grid-cols-4 gap-3 overflow-y-auto pr-2 scrollbar-hide">
                            {Object.entries(Icons).map(([name, component]) => (
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
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="e.g. Shopping" 
                                className="py-2 outline-none bg-transparent text-gray-700"
                            />
                        </div>
                        <div className="flex flex-col border-b border-gray-200 focus-within:border-blue-400 transition-colors">
                            <label className="text-xs font-bold text-gray-500 uppercase">Set your budget</label>
                            <input 
                                type="number" 
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="₱0.00" 
                                value={amount}
                                className="py-2 text-sm outline-none bg-transparent text-gray-700 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={onClose} 
                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 shadow-md font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleUpdateCategory} // Removed (id) execution
                            className="flex-1 py-3 px-4 bg-blue-500 text-white font-semibold shadow-md shadow-blue-200 hover:bg-blue-600 transition-colors"
                        >
                            Update Category
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBudgetModal;