import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Rubik, Space_Grotesk } from 'next/font/google'

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
	description: 'Hi, im Milo! I love coding stuff as a hobbie and im studying to be a traumatologist.',
	openGraph: {
		url: '/',
		type: 'website',
		title: 'MilosWorks',
		description: 'Hi, im Milo! I love coding stuff as a hobbie and im studying to be a traumatologist.'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'MilosWorks',
		description: 'Hi, im Milo! I love coding stuff as a hobbie and im studying to be a traumatologist.',
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
