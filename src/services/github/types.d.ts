export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export interface Contribution {
	date: string
	count: number
	level: ContributionLevel
}

export interface ContributionsData {
	total: {
		[year: number]: number
		[year: string]: number // 'lastYear'
	}
	contributions: Contribution[]
}

export interface ErrorResponse {
	error: string
}

export type GithubUser = GithubUserRaw & GithubUserExtra

export interface GithubUserRaw {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string | null
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	user_view_type: string
	site_admin: boolean
	name: string | null
	company: string | null
	blog: string | null
	location: string | null
	email: string | null
	hireable: boolean | null
	bio: string | null
	twitter_username: string | null
	public_repos: number
	public_gists: number
	followers: number
	following: number
	created_at: string
	updated_at: string
}

export interface GithubUserExtra {
	stars: number
	forks: number
}

export interface GithubRepo {
	stargazers_count: number
	forks: number
}

export interface Language {
	name: string
	size: number
	color: string | null
}

export type TopLanguages = Language[]
