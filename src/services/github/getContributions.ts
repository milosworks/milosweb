import { CONTRIBUTIONS_API_URL } from './constants'
import type { ContributionsData, ErrorResponse } from './types'

export async function getContributions() {
	try {
		const res = await fetch(CONTRIBUTIONS_API_URL)
		const result: ContributionsData | ErrorResponse = await res.json()
		if (!res.ok)
			throw new Error(
				`Failed to fetch github contribution data: ${(result as ErrorResponse)?.error} ${res.status}`
			)

		return result as ContributionsData
	} catch (error) {
		console.error('Failed to fetch contributions data: ', error)
		throw error
	}
}
