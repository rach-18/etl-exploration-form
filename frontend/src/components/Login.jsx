import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., make an API call)
    // For now, just a placeholder for handling the login
    if (username === '' || password === '') {
      setMessage('Please fill in all fields.');
    } else {
      try {
        const response = await axios.post("http://192.168.90.87:7000/login", {username, password}, {withCredentials: true});

        if(response.data.success) {
            // setMessage('Login successfull')
            console.log("Login successful")
            navigate('/form')
        }
        else {
            setMessage(response.data.message)
        }
      }
      catch(err) {
        console.log(err);
        setMessage('An error occured. Please try again');
      }
    }
  };

  return (
    <div className="relative min-h-screen pt-20">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("miningImg.jpg")',
          filter: 'blur(5px)',
          zIndex: '-1',
        }}
      ></div>

      {/* Logo */}
      <div className="flex items-center fixed top-0 left-0 p-4">
        <div className="m-auto h-[60px]">
          <img
            src="etlLogo.svg"
            alt="etl"
            className="w-[53px] h-[66px] object-contain bg-white rounded-[16%]"
          />
        </div>
      </div>

      {/* Login Form */}
      <div className="text-center bg-white w-[23rem] mx-auto p-8 rounded-xl shadow-md">
        <h2 className="mb-8 text-xl font-bold">Login</h2>
        <form className="signUpForm_" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-8 p-4 w-[16rem] border-b-2 border-t-[0.1rem] border-t-gray-200 border-x-[0.1rem] border-x-gray-200 border-b-[#00000096] outline-none text-base"
          />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-8 p-4 w-[16rem] border-b-2 border-t-[0.1rem] border-t-gray-200 border-x-[0.1rem] border-x-gray-200 border-b-[#00000096] outline-none text-base"
          />
          <br />
          <input
            type="submit"
            value="Sign In"
            className="w-[7.5em] py-4 px-4 rounded-[16px] bg-black text-white uppercase cursor-pointer transition-all duration-500 transform scale-90 hover:scale-100"
          />
        </form>
        
        {/* Flash Messages */}
        {message && (
          <ul className="mt-4 text-red-600">
            <li>{message}</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Login;
