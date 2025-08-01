'use client'

import { ArrowDown, LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Activity } from '@/components/activity'
import { ContributionGraph } from '@/components/contributionGraph'
import { Header } from '@/components/header'
import { Technologies } from '@/components/technologies'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Bluesky, Discord, Github, Seal } from '@/lib/icons'
import en from '@/locales/en'
import es from '@/locales/es'
import projects from '@/locales/projects'
import { getContributions } from '@/services/github/getContributions'
import type { ContributionsData } from '@/services/github/types'
import { DISCORD_ID, statusColors } from '@/services/landyard/getLanyardData'
import { useLanyard } from '@/services/landyard/useLandyard'

const socialLinks = [
	{ href: 'https://github.com/milosworks', icon: <Github className='w-8 h-8' /> },
	{ href: 'https://bsky.app/profile/milosworks.bsky.social', icon: <Bluesky className='w-8 h-8' /> },
	{ href: 'https://www.youtube.com/watch?v=lPJiifkbkYs', icon: <Seal className='w-8 h-8' /> },
	{ href: 'https://discord.gg/dVPqq2U4xy', icon: <Discord className='w-8 h-8' /> }
]

export default function Home() {
	const [language, setLanguage] = useState('en')
	const translation = language === 'en' ? en : es

	const lanyardData = useLanyard()
	const [contributionsData, setContributionsData] = useState<ContributionsData | null>(null)

	const fetchContributions = useCallback(async () => {
		try {
			const data = await getContributions()
			setContributionsData(data)
		} catch (error) {
			console.error('An error occurred while fetching contributions data.', error)
		}
	}, [])

	useEffect(() => {
		fetchContributions()
	}, [fetchContributions])

	const gameActivity = lanyardData?.activities.find(act => act.type === 0)
	const hasActivity = lanyardData?.spotify || gameActivity

	const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

	return (
		<div>
			<Header language={language} setLanguage={setLanguage} />

			<main className='min-h-screen overflow-y-scroll font-space-grotesk'>
				<section
					className='min-h-screen w-full flex flex-col items-center justify-center relative p-4 pt-12'
					id='home'
				>
					<div className='w-full max-w-6xl space-y-8'>
						<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
							<Card className='lg:col-span-3 p-6 flex items-center gap-6 rounded-2xl bg-transparent border-transparent'>
								<div className='relative flex-shrink-0'>
									<Image
										alt="Milo's Avatar"
										className='rounded-full'
										height={72}
										src={`https://api.lanyard.rest/${DISCORD_ID}.png`}
										width={72}
									/>
									{lanyardData && (
										<div
											className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-[#222] ${statusColors[lanyardData.discord_status]}`}
										/>
									)}
								</div>
								<div>
									<h1 className='text-xl text-white font-bold font-rubik'>
										<span className='text-swap' data-text='Vyrek'>
											<span>Milo</span>
										</span>
									</h1>
									<p className='text-neutral-400 mt-1 text-sm max-w-md'>{translation.bio}</p>
								</div>
							</Card>
							<div className='grid grid-cols-4 lg:grid-cols-2 gap-6'>
								{socialLinks.map(social => (
									<Link
										className='bg-[#222] border-neutral-800 rounded-2xl flex items-center justify-center aspect-square text-neutral-400 hover:text-[#F54A43] hover:bg-[#2a2a2a] transition-all duration-300'
										href={social.href}
										key={social.href}
										target='_blank'
									>
										{social.icon}
									</Link>
								))}
							</div>
						</div>

						<div className={`grid grid-cols-1 ${hasActivity ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8`}>
							<Activity lanyardData={lanyardData} />
							<Technologies translation={translation} />
							{contributionsData ? (
								<ContributionGraph
									contributions={contributionsData.contributions}
									isCompact={!!hasActivity}
								/>
							) : (
								<Skeleton className='bg-[#222] border-neutral-800 p-5 flex items-center justify-center h-full rounded-2xl min-h-[140px]' />
							)}
						</div>
					</div>
					<button
						className='absolute bottom-10 animate-bounce cursor-po'
						onClick={() => scrollTo('projects')}
						type='button'
					>
						<ArrowDown className='w-6 h-6' />
					</button>
				</section>

				<section
					className='min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8'
					id='projects'
				>
					<h2 className='text-3xl md:text-5xl font-bold mb-12 text-center text-white'>
						{translation.projects}
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full'>
						{projects.map(project => (
							<Card
								className='flex flex-col hover:border-[#F54A43]/50 transition-colors rounded-2xl'
								key={project.title}
							>
								<div className='p-6 flex-grow'>
									<h3 className='font-bold text-xl text-white'>{project.title}</h3>
									<p className='text-neutral-400 text-sm mt-2 mb-4'>
										{language === 'es' ? project.description_es : project.description}
									</p>
								</div>
								<div className='p-6 pt-0 mt-auto flex items-end justify-between'>
									<div className='flex flex-wrap gap-2'>
										{project.tags.map(tag => (
											<span
												className='text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full'
												key={tag}
											>
												{tag}
											</span>
										))}
									</div>
									<div className='flex items-center gap-4'>
										{project.liveUrl && (
											<Link
												className='text-neutral-400 hover:text-[#F54A43] transition-colors'
												href={project.liveUrl}
												rel='noopener noreferrer'
												target='_blank'
											>
												<LinkIcon className='w-5 h-5' />
											</Link>
										)}
										{project.github && (
											<Link
												className='text-neutral-400 hover:text-[#F54A43] transition-colors'
												href={project.github}
												rel='noopener noreferrer'
												target='_blank'
											>
												<Github className='w-5 h-5' />
											</Link>
										)}
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
