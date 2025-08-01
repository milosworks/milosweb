'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Header({ language, setLanguage }: { language: string; setLanguage: (str: string) => void }) {
	return (
		<header className='fixed top-0 left-0 right-0 pl-24 pr-24 z-50 flex items-center justify-between p-6 font-rubik'>
			<div className='flex items-center justify-center gap-4'>
				<Image alt='milosworks' className='w-10 h-10' height={32} src='/mw.svg' width={32} />
				<span className='font-bold tracking-widest text-sm'>MILOSWORKS</span>
			</div>

			<div className='flex items-center gap-2 text-sm font-bold'>
				<button
					className={cn(
						language === 'en' ? 'text-white' : 'text-neutral-500 hover:text-white',
						'cursor-pointer'
					)}
					onClick={() => setLanguage('en')}
					type='button'
				>
					EN
				</button>
				<button
					className={cn(
						language === 'es' ? 'text-white' : 'text-neutral-500 hover:text-white',
						'cursor-pointer'
					)}
					onClick={() => setLanguage('es')}
					type='button'
				>
					ES
				</button>
			</div>
		</header>
	)
}
