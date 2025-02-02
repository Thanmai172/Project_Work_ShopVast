    import React, { useState } from 'react';  
    import axios from 'axios';  
    import { useNavigate } from 'react-router-dom';  

    const Auth = () => {  
    const [formType, setFormType] = useState('register');  
    const [username, setUsername] = useState('');  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const navigate = useNavigate();  

    const handleSubmit = async (event) => {  
        event.preventDefault();  
        const url = formType === 'register' ? 'http://localhost:5000/api/users/register' : 'http://localhost:5000/api/users/login';  
        
        try {  
        const response = await axios.post(url, { username, email, password });  
        console.log(response.data);  
        if (formType === 'login') {  
            alert('Login successful!');  
            navigate('/dashboard'); // Redirects to the Freelancer Dashboard  
        }  
        } catch (error) {  
        if (error.response) {  
            console.error('Error during authentication:', error.response.data);  
            alert(`Error: ${error.response.data.message}`);  
        } else if (error.request) {  
            console.error('Error during authentication: No response received:', error.request);  
            alert('No response from server.');  
        } else {  
            console.error('Error during authentication:', error.message);  
            alert(`Error: ${error.message}`);  
        }  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
        {formType === 'register' && (  
            <input   
            type="text"   
            value={username}   
            onChange={(e) => setUsername(e.target.value)}   
            placeholder="Username"   
            required   
            />  
        )}  
        <input   
            type="email"   
            value={email}   
            onChange={(e) => setEmail(e.target.value)}   
            placeholder="Email"   
            required   
        />  
        <input   
            type="password"   
            value={password}   
            onChange={(e) => setPassword(e.target.value)}   
            placeholder="Password"   
            required   
        />  
        <button type="submit">{formType === 'register' ? 'Register' : 'Login'}</button>  
        <button   
            type="button"   
            onClick={() => setFormType(formType === 'register' ? 'login' : 'register')}  
        >  
            {formType === 'register' ? 'Switch to Login' : 'Switch to Register'}  
        </button>  
        </form>  
    );  
    };  

    export default Auth;