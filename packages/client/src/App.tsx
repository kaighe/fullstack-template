import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import CreateAccount from './pages/CreateAccount/CreateAccount'
import Notes from './pages/Notes/Notes'

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/create_account" element={<CreateAccount/>}/>
            <Route path="/notes" element={<Notes/>}/>
        </Routes>
    </BrowserRouter>
    )
}

export default App
