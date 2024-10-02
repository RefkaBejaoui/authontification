import { Route, Routes } from 'react-router';
import './App.css';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
