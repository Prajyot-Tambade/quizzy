import { PT_Serif, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components';
import { ReduxProvider } from './providers'


// Google Fonts
// PT Serif
const pt_serif = PT_Serif({
	variable: '--font-pt-serif',
	weight: ['400', '700'],
	subsets: ['latin'],
});

// Inter
const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
});

// Metadata
export const metadata = {
	title: 'Quizzy: A new way to create quizzes',
	description: 'A new way to create quizzes developed by Prajyot Tambade',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${inter.variable} ${pt_serif.variable} antialiased`}
			>
				<ReduxProvider>
					<Toaster />
					<Header />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
