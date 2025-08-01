'use client'

import { Gamepad2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import type { LanyardData } from '@/services/landyard/types'

function Timer({ start }: { start?: number }) {
	const [duration, setDuration] = useState('00:00:00')

	useEffect(() => {
		if (!start) return

		const interval = setInterval(() => setDuration(new Date(Date.now() - start).toISOString().slice(11, 19)), 1000)

		return () => clearInterval(interval)
	}, [start])
	if (!start) return null

	if (duration === '00:00:00') setDuration(new Date(Date.now() - start).toISOString().slice(11, 19))

	return (
		<div className='flex text-green-500 items-center'>
			<Gamepad2 className='w-4 h-4' />

			<p className='pl-2'>{duration}</p>
		</div>
	)
}

export function Activity({ lanyardData }: { lanyardData: LanyardData | null }) {
	const gameActivity = lanyardData?.activities.find(act => act.type === 0)

	if (!(lanyardData && (lanyardData.spotify || gameActivity))) return null

	return (
		<Card className='p-4 flex items-center gap-4 rounded-2xl min-h-[140px]'>
			{lanyardData.spotify ? (
				<Image
					alt={lanyardData.spotify.song}
					className='rounded-lg w-16 h-16'
					height={64}
					src={lanyardData.spotify.album_art_url}
					width={64}
				/>
			) : gameActivity?.assets?.large_image && gameActivity?.application_id ? (
				<Image
					alt={gameActivity.name}
					className='rounded-lg w-16 h-16'
					height={64}
					src={`https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`}
					width={64}
				/>
			) : (
				<Gamepad2 className='w-16 h-16 text-neutral-700' />
			)}
			<div className='min-w-0'>
				<p className='text-white font-bold truncate'>{lanyardData.spotify?.song || gameActivity?.name}</p>
				<p className='text-neutral-400 text-sm truncate'>
					{lanyardData.spotify?.artist || gameActivity?.details}
				</p>
				{gameActivity?.state && <p className='text-neutral-400 text-sm truncate'>{gameActivity?.state}</p>}
				<Timer start={gameActivity?.timestamps?.start} />
			</div>
		</Card>
	)
}
