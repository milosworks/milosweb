import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Rubik, Space_Grotesk } from 'next/font/google'
import en from '@/locales/en'

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-space-grotesk'
})

const rubik = Rubik({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-rubik'
})

export const viewport: Viewport = {
	themeColor: '#f54a43'
}

export const metadata: Metadata = {
	metadataBase: new URL('https://milosworks.xyz'),
	title: 'MilosWorks',
	description: en.bio,
	openGraph: {
		url: '/',
		type: 'website',
		title: 'MilosWorks',
		description: en.bio
	},
	twitter: {
		card: 'summary_large_image',
		title: 'MilosWorks',
		description: en.bio,
		site: '/',
		creator: 'MilosWorks'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`antialiased ${rubik.variable} ${spaceGrotesk.variable}`}>{children}</body>
		</html>
	)
}
