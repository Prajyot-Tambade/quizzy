'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Input, Button } from '@/components';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/authSlice';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [error, setError] = useState(null);
	const router = useRouter();
	const dispatch = useDispatch();

	const login = async (data) => {
		setError('');
		try {
			await axios.post('/api/auth/login', data);
			const res = await axios.get('api/auth/getUser');
			if (!res.statusText == 'OK') toast.error(error.message);

			const currentUsername = res.data.data.username;

			dispatch(setUser({ username: currentUsername }));
			toast.success('Logged in successfully');
			router.push('/dashboard');
		} catch (error) {
			toast.error(error.message);
			setError(error.message);
		}
	};

	return (
		<div>
			<h1 className='text-2xl font-bold'>Welcome Back!</h1>
			<p className='mt-2 text-gray-400'>
				Login to continue your journey.
			</p>
			{error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
			<div className='mt-8'>
				<form onSubmit={handleSubmit(login)}>
					<div className='space-y-5'>
						{/* Email field */}
						<Input
							label='Email: '
							placeholder='john@doe.com'
							type='email'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/,
									message: 'Invalid email',
								},
							})}
						/>
						{errors.email && (
							<p className='text-red-700'>
								{errors.email.message}
							</p>
						)}

						{/* Password field */}
						<Input
							label='Password: '
							placeholder='********'
							type='password'
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message:
										'Password must be at least 8 characters',
								},
							})}
						/>
						{errors.password && (
							<p className='text-red-700'>
								{errors.password.message}
							</p>
						)}

						{/* Submit button */}
						<Button
							type='submit'
							className='mt-8 my-auto cursor-pointer w-full rounded-xl'
						>
							Login
						</Button>
						<div className='text-center'>
							<p className='text-gray-500 mt-4'>
								Already have an account?&nbsp;
								<Link
									href='/signup'
									className='text-black underline'
								>
									Register
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
