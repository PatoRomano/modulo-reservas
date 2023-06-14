import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Departamento from './pages/departamentos/Departemento'
import Deporte from './pages/deportes/Deporte'
import Salon from './pages/salones/Salon'
import Index from './pages/index/Index'
import Administrador from './pages/administrador/Administrador';
import CrearEspacio from './pages/administrador/CrearEspacio';
import Reserva from './pages/reservas/Reserva'
import Login from './pages/auth/Login'
import { RequireAuth } from 'react-auth-kit'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='container'>
      <Routes>
          <Route path="/" element= {<Index />} ></Route>
          <Route path="/login" element= {<Login />} ></Route>
          <Route path="/deportes" element= {<Deporte />} ></Route>
          <Route path="/salones" element= {<Salon />} ></Route>
          <Route path="/departamentos" element= {<Departamento />} ></Route>
          <Route path="/administrador" element= {<RequireAuth loginPath='/login'>
            <Administrador /></RequireAuth>} ></Route>
          <Route path="/crearespacio" element= {<RequireAuth loginPath='/login'><CrearEspacio /></RequireAuth>} ></Route>
          <Route path="/reserva/:id" element= {<Reserva />} ></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
