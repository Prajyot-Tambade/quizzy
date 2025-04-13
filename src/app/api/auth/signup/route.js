import { connectDB } from '@/config/db/dbConfig';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { toast } from 'react-hot-toast';

export const POST = async (req) => {
	const { username, email, password } = await req.json();

	try {
		// database connection
		await connectDB();

		// Checking if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 409 },
			);
		}

		// Hashing the password using bcryptjs
		const hashedPassword = await bcryptjs.hash(password, 10);

		// Creating new user
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		return NextResponse.json(
			{ 
        message: 'User created successfully',
        success: true,
      },
			{ status: 201 },
		);
	} catch (error) {
		console.error('Error creating user: ', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
};
