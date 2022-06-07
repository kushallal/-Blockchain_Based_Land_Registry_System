import React,{useState} from 'react'
import { BrowserRouter,
    Routes, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import Login from './views/Login';
import App from './App'
import RegisterUser from './views/RegisterUser';
function Main() {
  let [login,setLogin]=useState(null);
  return (
    <div>
        
        <BrowserRouter>
        <Nav login={login} setLogin={setLogin}/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login login={login} setLogin={setLogin}/>} />
          <Route exact path='/dashboard' element={<Dashboard/>} />
          <Route exact path='/register' element={<RegisterUser/>} />
          <Route exact path='/app' element={<App/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main