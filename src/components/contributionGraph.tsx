'use client'

import { useMemo } from 'react'
import { generateContributionMatrix } from '@/services/github/generateContributionMatrix'
import type { Contribution, ContributionLevel } from '@/services/github/types'
import { Card } from './ui/card'

const colors: Record<ContributionLevel, string> = {
	0: 'bg-[#2d2d2d]',
	1: 'bg-[#5f231d]',
	2: 'bg-[#a5362d]',
	3: 'bg-primary',
	4: 'bg-[#ff8e88]'
}

export const ContributionGraph = ({
	isCompact,
	contributions
}: {
	isCompact: boolean
	contributions: Contribution[]
}) => {
	const displayMatrix = useMemo(() => {
		const weeksToShow = isCompact ? 16 : 26
		return generateContributionMatrix(contributions, weeksToShow)
	}, [isCompact, contributions])

	return (
		<Card className='p-5 flex flex-col justify-between gap-4 h-full rounded-2xl min-h-[140px] overflow-hidden items-center'>
			<div className='flex flex-col gap-1.5'>
				{displayMatrix.map((row, rowIndex) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: cant use anything else
					<div className='flex gap-1.5 justify-center' key={rowIndex}>
						{row.map((level, colIndex) => {
							const bgClass = level === null ? 'bg-transparent' : (colors[level] ?? colors[0])

							return (
								<div
									className={`w-3.5 h-3.5 rounded-sm ${bgClass}`}
									key={`${rowIndex}-${
										// biome-ignore lint/suspicious/noArrayIndexKey: cant use anything else
										colIndex
									}`}
									title={level !== null ? `Level ${level} on some date` : undefined}
								/>
							)
						})}
					</div>
				))}
			</div>

			<div className='flex items-center justify-self-end text-xs text-neutral-400 gap-2'>
				<span>Less</span>
				<div className='flex gap-1'>
					{Object.values(colors).map((color, index) => (
						<div
							className={`w-3.5 h-3.5 rounded-sm ${color}`}
							// biome-ignore lint/suspicious/noArrayIndexKey: they are just 5
							key={index}
						/>
					))}
				</div>
				<span>More</span>
			</div>
		</Card>
	)
}
