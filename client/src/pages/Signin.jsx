import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
     
  }

  const handleSubmit = async (e) => {
    e.preventDefault();  // when clicking signup button, page does not refresh

    try {
      dispatch(signInStart());

      const config = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
  
      const res = await fetch('/api/auth/signin', config);
      const data = await res.json();
      
      if(data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
    }
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

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

        <button disabled={loading} className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'SIGN IN'}</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Create an account? </p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>

      <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
    </div>
  )
}

export default SignIn
