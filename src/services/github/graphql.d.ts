interface GraphQLLanguageEdge {
	size: number
	node: {
		color: string
		name: string
	}
}

interface GraphQLRepositoryNode {
	name: string
	languages: {
		edges: GraphQLLanguageEdge[]
	}
}

export interface LanguageGraphQLResponse {
	data: {
		user: {
			repositories: {
				nodes: GraphQLRepositoryNode[]
			}
		}
	}
	errors?: {
		type: string
		message: string
	}[]
}
