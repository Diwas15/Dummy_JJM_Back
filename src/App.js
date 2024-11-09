import logo from './logo.svg';
import './App.css';
import QR from './QR';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SchemeForm from './SchemeForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SchemeForm/>} />
        <Route path='/qrs' element={<QR/>}/>
      </Routes>
    </BrowserRouter>
        
  );
}

export default App;
