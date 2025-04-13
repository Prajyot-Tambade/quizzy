"use client"
import {Button} from '@/components'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/features/authSlice';

const page = () => {
  const router = useRouter();
  const username = useSelector(state => state?.auth?.userData?.username);
  const userData = useSelector(state => state?.auth);
  console.log(userData);
  
	const dispatch = useDispatch();

  const logout = async () => {
    try {
			await axios.get('/api/auth/logout');
      dispatch(logoutUser());
			toast.success('Logged out successfully');
			router.push('/');
		} catch (error) {
			toast.error(error.message);
		}
  }

  return (
    <div className='text-center'>
      <h1>Hello {username}</h1>
      <h2>you are Logged In successfully</h2>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default page
