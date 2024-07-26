import './App.css';
import NavBar from './components/NavBar';
import { AddSales } from './pages/AddSales';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Top5Sales } from './pages/Top5Sales';
import { TotalRevenue } from './pages/TotalRevenue';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
            <Route exact path='/' element={<AddSales/>}></Route>
            <Route exact path='/top5sales' element={<Top5Sales/>}></Route>
            <Route exact path='/totalrevenue' element={<TotalRevenue/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>

        </Routes>
      </Router>
  );
}

export default App;
