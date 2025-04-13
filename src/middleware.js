import { NextResponse } from 'next/server';


export function middleware(request) {
	const pathname = request.nextUrl.pathname;
	const isPublicPath = ['/', '/signup', '/login'].includes(pathname);
	const token = request.cookies.get('token')?.value;

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/signup', '/login', '/dashboard'],
};
