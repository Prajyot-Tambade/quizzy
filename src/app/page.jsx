import React from 'react';
import Link from 'next/link';
import {Container, Button} from '@/components'

export default function Home() {
	return (
		<div>
			<Container className='flex justify-between items-center py-4'>
				<img
					src='/bg.png'
					alt='background'
					className='absolute -z-10 w-screen h-screen top-0 left-0'
				/>

				<div className='text-center flex flex-col items-center justify-center  h-[80vh]'>
          <h1 className='text-6xl font-medium'>
          The simplest way to create quizzes
          </h1>
          <p className='mt-4'>
          Say goodbye to boring quizzes. Meet Quizzy — the free, intuitive quiz builder you’ve been looking for.
          </p>
          <Button type='link' href='/signup' className='mt-8 bg-red-600' hoverStyle='hover:text-red-600 hover:bg-white' border='border-2 border-red-600'>Create a quiz</Button>
        </div>

        <footer>
          <p className="text-center" >Design and Developed by <Link href="#" className='underline'>Prajyot Tambade</Link></p>
        </footer>
			</Container>
		</div>
	);
}
