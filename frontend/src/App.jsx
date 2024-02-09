import { Route, Routes } from "react-router-dom"
import PageLayout from "./Components/Layout/PageLayout"
import DashBoard from "./Pages/Dashboard/DashBoard"
import LogIn from "./Pages/LogIn/LogIn"
import Signup from "./Pages/SigUp/Signup"

function App() {

  return (
    <>
    <PageLayout>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/signin" element={<LogIn/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </PageLayout>
    </>
  )
}

export default App
