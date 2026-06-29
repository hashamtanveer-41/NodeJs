import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={}></Route>
          <Route path="/create" element={}></Route>
          <Route path="/update" element={}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
