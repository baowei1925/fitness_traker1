import './App.css'
import {NextUIProvider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import Login from './Login'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './Homepage'
import Diet from './Diet_page'
import History from './History';

function App() {
 
  return (
    <BrowserRouter>
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Main" element={<Home />} />
          <Route path="/Diet_page" element={<Diet />} />
          <Route path="/History/*" element={<History/>} />
        </Routes>
      </NextUIProvider>
    </BrowserRouter>
  )
}

export default App
