import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useMyContext } from './context/myContext';
import Login from './pages/login';
import Register from './pages/register';
import Cards from './pages/cards';
import Modal from './pages/modal';
import MyCards from './pages/myCards';
import Trades from './pages/trades';

function App() {
  const {modal} = useMyContext();

  return (
    <BrowserRouter>
      <div className="App">
        <header> 
          <h1>MagicMarket</h1>
          <p></p>
        </header>
        <div className='main'>
          <Routes>
            <Route path="/" element={localStorage.getItem("token") === null ? <Login/> : <Navigate to="/list" replace/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/cards" element={localStorage.getItem("token") !== null ? <Cards/> : <Navigate to="/" replace/>}/>
            <Route path="/mycards" element={<MyCards/>}/>
            <Route path="/trades" element={<Trades/>}/>
          </Routes>
        </div>
        {modal && <Modal show={modal}/>}
      </div>
    </BrowserRouter>
  );
}

export default App;
