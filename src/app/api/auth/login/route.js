import { connectDB } from '@/config/db/dbConfig';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
	const { email, password } = await req.json();

	try {
		// database connection
		await connectDB();

		// Checking if user already exists
		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: 'User does not exists' },
				{ status: 400 }
			);
		}

		// Check if password is correct
		const isMatch = await bcryptjs.compare(password, user.password);

		if (!isMatch) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 400 }
			);
		}

		// Generate JWT token
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
			},
			process.env.TOKEN_SECRET,
			{ expiresIn: '30d' }
		);
    // Set token in cookie
    const res = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return res;
    
	} catch (error) {
		console.error('Error logging user: ', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
};
