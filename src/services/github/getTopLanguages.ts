// Took some stuff from https://github.com/anuraghazra/github-readme-stats/tree/master
import { GITHUB_GRAPHQL_URL, GITHUB_TOKEN, USERNAME } from './constants'
import type { LanguageGraphQLResponse } from './graphql'
import type { Language, TopLanguages } from './types'

const TOP_LANGUAGES_QUERY = `
  query userInfo($login: String!) {
    user(login: $login) {
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        nodes {
          name
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
      }
    }
  }
`

export async function getTopLanguages(excludeRepos: string[] = []): Promise<TopLanguages> {
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
				query: TOP_LANGUAGES_QUERY,
				variables: { login: USERNAME }
			})
		})
		if (!res.ok) throw new Error(`GitHub GraphQL API responded with status: ${res.status}`)

		const result: LanguageGraphQLResponse = await res.json()
		if (result.errors) {
			console.error('GitHub GraphQL API Errors:', result.errors)
			throw new Error(`GitHub GraphQL API Error: ${result.errors[0].message}`)
		}

		const repoToHide = new Set(excludeRepos)
		const langStats: Record<string, { size: number; color: string | null }> = {}

		// biome-ignore lint/complexity/noForEach: im just lazy
		result.data.user.repositories.nodes
			.filter(repo => !repoToHide.has(repo.name) && repo.languages.edges.length > 0)
			.forEach(repo => {
				// biome-ignore lint/complexity/noForEach: im just lazy
				repo.languages.edges.forEach(edge => {
					const langName = edge.node.name
					if (!langStats[langName]) {
						langStats[langName] = { size: 0, color: edge.node.color }
					}
					langStats[langName].size += edge.size
				})
			})

		const sortedLangs = Object.entries(langStats)
			.sort(([, a], [, b]) => b.size - a.size)
			.map(
				([name, { size, color }]): Language => ({
					name,
					size,
					color
				})
			)

		return sortedLangs
	} catch (error) {
		console.error('Failed to fetch top languages:', error)
		throw error
	}
}
