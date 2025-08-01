// Took some stuff from https://github.com/anuraghazra/github-readme-stats/tree/master
import { GITHUB_API_URL, USERNAME } from './constants'
import type { GithubRepo, GithubUser, GithubUserExtra, GithubUserRaw } from './types'

const USERS = `users/${USERNAME}`
const REPOS = (page: number) => `users/${USERNAME}/repos?per_page=100&page=${page}`

const github = (path: string): Promise<Response> =>
	fetch(`${GITHUB_API_URL}/${path}`, {
		headers: {
			'User-Agent': 'MilosWorks Website'
		}
	})

export async function getProfile(): Promise<GithubUser> {
	try {
		const userResp = await github(USERS)
		if (!userResp.ok) throw new Error(`GitHub API responded for user profile with status: ${userResp.status}`)

		const userProfile: GithubUserRaw = await userResp.json()
		const result: GithubUserExtra = {
			stars: 0,
			forks: 0
		}

		await Promise.all(
			Array.from({ length: Math.ceil(userProfile.public_repos / 100) }, (_, i) => i + 1).map(async p => {
				const data = await getRepos(p)
				result.stars += data.stars
				result.forks += data.forks
			})
		)

		return {
			...userProfile,
			...result
		}
	} catch (error) {
		console.error('Failed to fetch contributions data: ', error)
		throw error
	}
}

async function getRepos(page: number): Promise<GithubUserExtra> {
	const resp = await github(REPOS(page))
	if (!resp.ok) throw new Error(`GitHub API responded for repos with status: ${resp.status}`)

	const repos: GithubRepo[] = await resp.json()

	return repos.reduce(
		(acc, cur) => {
			acc.stars += cur.stargazers_count
			acc.forks += cur.forks
			return acc
		},
		{ stars: 0, forks: 0 }
	)
}
