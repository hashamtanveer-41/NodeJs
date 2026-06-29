import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Users from "./Users.jsx";
import CreateUser from "./CreateUser.jsx";
import UpdateUser from "./UpdateUser.jsx";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
