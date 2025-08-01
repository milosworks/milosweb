import type { Contribution, ContributionLevel } from './types'

const DAYS_IN_WEEK = 7

export const generateContributionMatrix = (
	contributions: Contribution[],
	weeksToShow: number
): (ContributionLevel | null)[][] => {
	if (!contributions) return Array.from({ length: DAYS_IN_WEEK }, () => new Array(weeksToShow).fill(null))

	const contributionsMap = new Map<string, ContributionLevel>()
	for (const c of contributions) {
		contributionsMap.set(c.date, c.level)
	}

	const matrix: (ContributionLevel | null)[][] = Array.from({ length: DAYS_IN_WEEK }, () =>
		new Array(weeksToShow).fill(null)
	)

	const today = new Date()
	today.setUTCHours(0, 0, 0, 0)

	const mostRecentSunday = new Date(today)
	mostRecentSunday.setUTCDate(mostRecentSunday.getUTCDate() - today.getUTCDay())

	for (let w = 0; w < weeksToShow; w++) {
		for (let d = 0; d < DAYS_IN_WEEK; d++) {
			const cellDate = new Date(mostRecentSunday)
			const weeksAgo = weeksToShow - 1 - w
			cellDate.setUTCDate(cellDate.getUTCDate() - weeksAgo * DAYS_IN_WEEK + d)

			if (cellDate <= today) {
				const dateString = cellDate.toISOString().split('T')[0]
				matrix[d][w] = contributionsMap.get(dateString) ?? 0
			}
		}
	}

	return matrix
}
