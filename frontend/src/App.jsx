import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Form from './components/Form';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/form' element={<Form />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
