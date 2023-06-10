import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Departamento from './pages/departamentos/Departemento'
import Deporte from './pages/deportes/Deporte'
import Salon from './pages/salones/Salon'
import Index from './pages/index'
import Administrador from './pages/administrador/Administrador';
import CrearEspacio from './pages/administrador/CrearEspacio';
import Reserva from './pages/reservas/Reserva'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='container'>
      <Routes>
          <Route path="/" element= {<Index />} ></Route>
          <Route path="/deportes" element= {<Deporte />} ></Route>
          <Route path="/salones" element= {<Salon />} ></Route>
          <Route path="/departamentos" element= {<Departamento />} ></Route>
          <Route path="/administrador" element= {<Administrador />} ></Route>
          <Route path="/crearespacio" element= {<CrearEspacio />} ></Route>
          <Route path="/reserva" element= {<Reserva />} ></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
