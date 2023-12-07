import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
     
  }

  const handleSubmit = async (e) => {
    e.preventDefault();  // when clicking signup button, page does not refresh

    try {
      setLoading(true);
      const config = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
  
      const res = await fetch('/api/auth/signup', config);
      const data = await res.json();

      setLoading(false);
      
      if(data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input 
          type="text" 
          placeholder='Username' 
          id='username' 
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder='Email' 
          id='email' 
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='Password' 
          id='password' 
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />

        <button disabled={loading} className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'SIGN UP'}</button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account? </p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>

      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}

export default SignUp
