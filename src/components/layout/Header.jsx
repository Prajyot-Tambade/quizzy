"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {Button, Container} from '..'

const Header = () => {

	const [isAuthenticated, setIsAuthenticated] = useState(false)

	return (
		<header className='w-full'>
			<Container>
			<nav>
					<div className='flex justify-between items-center w-full py-6 font-bold'>
						<Link className='font-pt-serif text-3xl' href='/'>Quizzy</Link>

						<div className='flex gap-4'>
							{isAuthenticated?
								<>
									<Button href='/logout' type='link' className='btn btn-dark' border='border-2 border-black'>
										Logout
									</Button>
								</>:
								<>
									<Button href='/login' type='link' className='btn btn-outline-dark bg-white' textColor='text-black' border='border-2 border-black' hoverStyle='hover:text-white hover:bg-black'>
										Login
									</Button>
									<Button href='/signup' type='link' className='btn btn-dark' border='border-2 border-black'>
										Register
									</Button>
								</>
							}
						</div>
					</div>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
