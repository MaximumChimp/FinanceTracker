import Sidebar from "./components/Utilities/sidebar"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Budgets from "./pages/Budgets"
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    // Remove inset-0 from here; fixed elements don't obey parent flex limits well.
    // We use min-h-screen to ensure the background covers the whole page.
   <BrowserRouter>
     <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* md:ml-64 (or pl-64) is the secret sauce. 
          It pushes the Dashboard to the right so it doesn't 
          get hidden behind the fixed sidebar.
      */}
      <main className="md:ml-64 p-4 transition-all duration-300">
        <div className="max-w-[90%] mx-auto">
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                 <Route path="/transactions" element={<Transactions/>}/>
                <Route path="/budgets" element={<Budgets/>}/>
            </Routes>
        </div>
      </main>
    </div>
   </BrowserRouter>
  )
}

export default App