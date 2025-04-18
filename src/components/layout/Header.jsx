"use client"
import React from 'react';
import Link from 'next/link';
import {Button, Container} from '..'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/features/authSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

	const isAuthenticated = useSelector(state => state?.auth?.authStatus);

	const router = useRouter();
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
		<header className='w-full'>
			<Container>
			<nav>
					<div className='flex justify-between items-center w-full py-6 font-bold'>
						<Link className='font-pt-serif text-3xl' href='/'>Quizzy</Link>

						<div className='flex gap-4'>
							{!isAuthenticated? <>
							<Button href='/login' type='link' className='btn btn-outline-dark bg-white' textColor='text-black' border='border-2 border-black' hoverStyle='hover:text-white hover:bg-black'>
								Login
							</Button>
							<Button href='/signup' type='link' className='btn btn-dark' border='border-2 border-black'>
								Register
							</Button>
							</>:
							<Button onClick={logout} className='btn btn-dark' border='border-2 border-black'>
								Logout
							</Button>
							}
						</div>
					</div>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
