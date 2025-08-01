interface Project {
	title: string
	description: string
	description_es: string
	tags: string[]
	liveUrl?: string
	github?: string
}

export default [
	{
		title: 'ADIHCI',
		description:
			'Full-stack catalog application to enhance product discovery through intuitive browsing, powerful full-text search, and a seamless quote request process.',
		description_es:
			'Catálogo full-stack para mejorar el descubrimiento de productos a través de una navegación intuitiva, una potente búsqueda de texto completo y un proceso de solicitud de cotizaciones fluido.',
		tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
		liveUrl: 'https://adihci.com'
	},
	{
		title: 'Portfolio Website',
		description: 'A personal portfolio to showcase my work, built with a focus on performance and design.',
		description_es: 'Un portafolio personal para mostrar mi trabajo, enfocado en rendimiento y diseño.',
		tags: ['Next.js', 'TypeScript', 'Shadcn/ui', 'Tailwind'],
		liveUrl: '#',
		github: 'https://github.com/milosworks/milosweb'
	},
	{
		title: 'Phasorite Networks',
		description: 'A modern Minecraft mod to transfer FE wirelessly.',
		description_es: 'Un mod moderno de Minecraft para transferir FE inalámbricamente.',
		tags: ['NeoForge', 'Minecraft', 'Kotlin'],
		liveUrl: 'https://www.curseforge.com/minecraft/mc-mods/phasorite-networks',
		github: 'https://github.com/milosworks/phasorite-networks'
	}
] satisfies Project[]
