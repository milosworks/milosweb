import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Card } from '@/components/ui/card'
import { Go, HTML5, Java, Kotlin, TypeScript } from '@/lib/icons'
import type { Locale } from '@/locales/en'

const data = [
	{ name: 'TypeScript', icon: <TypeScript className='h-10 w-10' /> },
	{ name: 'Go', icon: <Go className='h-12 w-12' /> },
	{ name: 'HTML5', icon: <HTML5 className='h-10 w-10' /> },
	{ name: 'Kotlin', icon: <Kotlin className='h-10 w-10' /> },
	{ name: 'Java', icon: <Java className='h-10 w-10' /> }
]

export function Technologies({ translation }: { translation: Locale }) {
	return (
		<Card className='p-5 rounded-2xl min-h-[140px]'>
			<h3 className='font-bold mb-4 text-center text-neutral-400 text-xs'>{translation.techAndLang}</h3>
			<div className='flex justify-around items-center h-full pb-4'>
				<TooltipProvider delayDuration={0}>
					{data.map(tech => (
						<Tooltip key={tech.name}>
							<TooltipTrigger>
								<div className='text-neutral-400 hover:text-primary transition-colors' key={tech.name}>
									{tech.icon}
								</div>
							</TooltipTrigger>
							<TooltipContent className='pb-2'>{tech.name}</TooltipContent>
						</Tooltip>
					))}
				</TooltipProvider>
			</div>
		</Card>
	)
}
