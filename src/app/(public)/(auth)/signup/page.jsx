"use client"
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Input, Button } from '@/components';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {useRouter} from "next/navigation";

const SignupPage = () => {
	const {
      register,
      handleSubmit,
      formState: { errors, isLoading },
      watch,
    } = useForm();
  
    const router = useRouter();
    const [error, setError] = useState(null);
  
    // Watch the password field to validate confirm password against it in the validation function inside the form
    const password = watch('password');
  
    const signup = async(data) => {
      setError('')
      try {
        await axios.post('/api/auth/signup', data)
        toast.success('User created successfully');        
        router.push('/login');
        
      } catch (error) {
        // Handle errors here
        if (error.response) {
          // The server responded with a status other than 2xx
          if (error.response.status === 409) {
            toast.error('User already exists. Please try with a different email or username.');
          } else {
            toast.error('An error occurred. Please try again later.');
            setError(error.message);
          }
        }
      }
    };
  
    return (
      <div>
        <h1 className='text-2xl font-bold'>Get started</h1>
        <p className='mt-2 text-gray-500'>
          Just one step away from achieving your goals
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
  
        <div className='mt-8'>
          <form onSubmit={handleSubmit(signup)}>
            <div className='space-y-5'>
              {/* Username field */}
              <Input
                label='Username: '
                placeholder='johndoe123'
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
                    message: 'Invalid username',
                  },
                })}
              />
              {errors.username && (
                <p className='text-red-700'>
                  {errors.username.message}
                </p>
              )}
  
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
  
              {/* Confirm Password field */}
              <Input
                label='Confirm Password: '
                placeholder='********'
                type='password'
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  minLength: {
                    value: 8,
                    message:
                      'Password must be at least 8 characters',
                  },
                  validate: (value) =>
                    value === password ||
                    'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className='text-red-700'>
                  {errors.confirmPassword.message}
                </p>
              )}
  
              {/* Submit button */}
              <Button
                type='submit'
                className='mt-8 my-auto cursor-pointer w-full rounded-xl'
                disabled={isLoading}
              >
                Register
              </Button>
              <div className='text-center'>
                <p className='text-gray-500 mt-4'>
                  Already have an account?&nbsp;
                  <Link href='/login' className='text-black underline'>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default SignupPage;
