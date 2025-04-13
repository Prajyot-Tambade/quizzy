import { NextResponse } from 'next/server';

export const GET = async (req) => {
	try {
		const res = NextResponse.json(
			{
				message: 'Logout successful',
				success: true,
			},
			{ status: 200 }
		);

		// Expire the cookie by setting its maxAge to 0
		res.cookies.set('token', '', {
			// httpOnly: true,
			expires: new Date(0),
		});
		// return NextResponse.redirect(new URL('/', req.url));
		return res;
	} catch (error) {
		console.error('Error logout user: ', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
};
