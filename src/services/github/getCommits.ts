import { GITHUB_GRAPHQL_URL, GITHUB_TOKEN, USERNAME } from './constants'

const USER_STATS_QUERY = `
  query userInfo($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
      }
    }
  }
`

export interface GitHubUserStats {
	commitContributions: number
}

export async function getStats(): Promise<GitHubUserStats> {
	if (!GITHUB_TOKEN) {
		console.error('GITHUB_TOKEN environment variable is not set.')
		throw new Error('Authentication token is missing.')
	}

	try {
		const res = await fetch(GITHUB_GRAPHQL_URL, {
			method: 'POST',
			headers: {
				Authorization: `bearer ${GITHUB_TOKEN}`,
				'Content-Type': 'application/json',
				'User-Agent': 'MilosWorks Website'
			},
			body: JSON.stringify({
				query: USER_STATS_QUERY,
				variables: { login: USERNAME }
			})
		})

		if (!res.ok) {
			throw new Error(`GitHub GraphQL API responded with status: ${res.status}`)
		}

		// biome-ignore lint/suspicious/noExplicitAny: i see any i ignore
		const result: any = await res.json()
		if (result.errors) {
			console.error('GitHub GraphQL API Errors:', result.errors)
			throw new Error(`GitHub GraphQL API Error: ${result.errors[0].message}`)
		}

		return {
			commitContributions: result.data.user.contributionsCollection.totalCommitContributions
		}
	} catch (error) {
		console.error('Failed to fetch user stats:', error)
		throw error
	}
}
