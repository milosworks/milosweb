/** biome-ignore-all lint/a11y/noSvgWithoutTitle: cant use it for og */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { Bookmark, People, Star, Time } from '@/lib/ogIcons'
import en from '@/locales/en'
import { getStats } from '@/services/github/getCommits'
import { getProfile } from '@/services/github/getProfile'
import { getTopLanguages } from '@/services/github/getTopLanguages'
import languageColors from '@/services/github/languageColors.json' with { type: 'json' }

export const alt = 'About Acme'
export const size = {
	width: 1200,
	height: 630
}
export const contentType = 'image/png'

const rubikBold = await readFile(join(process.cwd(), 'assets/Rubik-Bold.ttf'))
const spaceGroteskRegular = await readFile(join(process.cwd(), 'assets/SpaceGrotesk-Regular.ttf'))

export default async function Image() {
	const user = await getProfile()
	const stats = await getStats()

	const topLangsData = await getTopLanguages()
	const totalSize = topLangsData.reduce((acc, lang) => acc + lang.size, 0)
	const langs = topLangsData
		.slice(0, 6)
		.map(x => ({ ...x, color: (languageColors as Record<string, string>)[x.name] }))
	const langColumns = [langs.slice(0, Math.ceil(langs.length / 2)), langs.slice(Math.ceil(langs.length / 2))]

	return new ImageResponse(
		<div style={{ fontFamily: 'SpaceGrotesk' }} tw='h-full w-full flex flex-col bg-[#0a0a0a] text-white'>
			<div tw='flex-grow flex flex-col p-10 pt-0 justify-between'>
				<Header />

				<div tw='flex w-full'>
					<div tw='flex flex-col rounded-lg border border-neutral-800 bg-[#1c1c1c] p-6 w-full text-4xl text-[#f4f4f4] shadow-sm'>
						<p style={{ fontFamily: 'Rubik' }} tw='text-[#f54a43] text-6xl mt-0 mb-0'>
							Hello!
						</p>
						<p tw='mt-2 mb-0'>{en.bio}</p>
					</div>
				</div>

				<div tw='flex w-full justify-between items-end rounded-lg border border-neutral-800 bg-[#1c1c1c] p-6 text-[#f4f4f4] shadow-sm'>
					<Langs columns={langColumns} totalSize={totalSize} />
					<div tw='flex flex-col'>
						<div tw='flex items-center'>
							<Star tw='text-[#f54a43] h-8 w-8' />
							<p tw='text-4xl text-white ml-2'>{user.stars}</p>
							<p tw='text-3xl text-neutral-400 ml-2'>Stars</p>
						</div>
						<div tw='flex items-center'>
							<Bookmark tw='text-[#f54a43] h-8 w-8' />
							<p tw='text-4xl text-white ml-2'>{user.public_repos}</p>
							<p tw='text-3xl text-neutral-400 ml-2'>Repos</p>
						</div>
					</div>
					<div tw='flex flex-col'>
						<div tw='flex items-center'>
							<Time tw='text-[#f54a43] h-8 w-8' />
							<p tw='text-4xl text-white ml-2'>{stats.commitContributions}</p>
							<p tw='text-3xl text-neutral-400 ml-2'>Commits</p>
						</div>
						<div tw='flex items-center'>
							<People tw='text-[#f54a43] h-8 w-8' />
							<p tw='text-4xl text-white ml-2'>{user.followers}</p>
							<p tw='text-3xl text-neutral-400 ml-2'>Followers</p>
						</div>
					</div>
				</div>
			</div>

			<LangsBar langs={langs} totalSize={totalSize} />
		</div>,
		{
			...size,
			fonts: [
				{ name: 'Rubik', data: rubikBold, style: 'normal', weight: 700 },
				{ name: 'SpaceGrotesk', data: spaceGroteskRegular, style: 'normal', weight: 400 }
			],
			headers:
				process.env.NODE_ENV === 'development' ? {} : { 'Cache-Control': 'public, max-age=86400, immutable' }
		}
	)
}

function Header() {
	return (
		<header tw='w-full flex items-center justify-between'>
			<div tw='flex items-center'>
				{/** biome-ignore lint/performance/noImgElement: cant use nextjs/image on nextjs/og */}
				<img alt='logo' height={48} src='https://milosworks.xyz/mw.svg' tw='w-40 h-40' width={48} />
				<span style={{ fontFamily: 'Rubik' }} tw='font-bold tracking-widest text-5xl ml-4'>
					MILOSWORKS
				</span>
			</div>
		</header>
	)
}

function Langs({
	columns,
	totalSize
}: {
	columns: {
		color: string
		name: string
		size: number
	}[][]
	totalSize: number
}) {
	return (
		<div tw='flex'>
			{columns.map((col, colIndex) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: x
				<div key={colIndex} tw='flex flex-col pr-6'>
					{col.map(lang => (
						<div key={lang.name} tw='flex items-center mb-2'>
							<div style={{ backgroundColor: lang.color }} tw='w-4 h-4 rounded-full' />
							<span tw='ml-3 text-3xl text-neutral-100'>{lang.name}</span>
							<span tw='ml-3 text-3xl text-neutral-400'>
								{((lang.size / totalSize) * 100).toFixed(2)}%
							</span>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

function LangsBar({
	langs,
	totalSize
}: {
	totalSize: number
	langs: {
		color: string
		name: string
		size: number
	}[]
}) {
	return (
		<div tw='flex w-full h-6'>
			{langs.map(lang => (
				<div
					key={lang.name}
					style={{
						width: `${(lang.size / totalSize) * 100}%`,
						backgroundColor: lang.color
					}}
					tw='h-full'
				/>
			))}
		</div>
	)
}
