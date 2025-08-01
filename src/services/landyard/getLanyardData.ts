import type { LanyardResponse } from './types'

export const DISCORD_ID = '538421122920742942'
const API_URL = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`

export const statusColors = {
	online: 'bg-green-500',
	idle: 'bg-yellow-500',
	dnd: 'bg-red-500',
	offline: 'bg-neutral-500'
}

export async function getLanyardData() {
	try {
		const res = await fetch(API_URL)
		if (!res.ok) throw new Error(`Lanyard API responded with status: ${res.status}`)

		const result: LanyardResponse = await res.json()
		if (result.success) return result.data

		return null
	} catch (error) {
		console.error('Failed to fetch Lanyard data:', error)
		throw error
	}
}
