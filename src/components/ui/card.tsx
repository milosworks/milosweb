import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('rounded-lg border border-neutral-800 bg-card text-card-foreground shadow-sm', className)}
			data-slot='card'
			{...props}
		/>
	)
}
