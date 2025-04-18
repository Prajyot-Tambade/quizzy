"use client"
import React from 'react'
import {Button} from '@/components'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/features/authSlice';

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector(state => state?.auth?.userData?.username);

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
      {/* <Button onClick={logout}>Logout</Button> */}
    </div>
  )
}

export default page
