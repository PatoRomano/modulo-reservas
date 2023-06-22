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
import Espacios from './pages/administrador/Espacios'
import ReservasAdmin from './pages/administrador/ReservasAdmin'
import EditarEspacio from './pages/administrador/EditarEspacio'
import { RequireAuth } from 'react-auth-kit'
import ReservaSalon from './pages/reservas/ReservaSalon'
import ReservaDepartamento from './pages/reservas/ReservaDepartamento'
import Footer from './components/Footer'
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
          <Route path="/reservaSalon/:id" element= {<ReservaSalon />} ></Route>
          <Route path="/reservaDepartamento/:id" element= {<ReservaDepartamento />} ></Route>
          <Route path="/espacios" element= {<Espacios />} ></Route>
          <Route path="/crearReserva" element ={<RequireAuth loginPath='/login'><ReservasAdmin /></RequireAuth>} ></Route>
          <Route path="/editarEspacio/:id" element ={<RequireAuth loginPath='/login'><EditarEspacio /></RequireAuth>} ></Route>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
