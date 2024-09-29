'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import React, { memo } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setTheme, getTheme } from '@/lib/theme';

const ThemeChange = memo(() => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Sun className='scale-[1]' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Button
						onClick={() => setTheme('dark')}
						className='text-foreground hover:text-background bg-background w-full h-full'
					>
						Тёмная
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						onClick={() => setTheme('light')}
						className='text-foreground hover:text-background bg-background w-full h-full'
					>
						Светлая
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						onClick={() => setTheme('blue')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Синий
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						onClick={() => setTheme('green')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Зелёный
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						onClick={() => setTheme('orange')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Оранжевый
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						onClick={() => setTheme('rose')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Розовый
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						onClick={() =>
							setTheme(
								window.matchMedia &&
									window.matchMedia('(prefers-color-scheme: dark)').matches
									? 'dark'
									: 'light'
							)
						}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Системная
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
});

ThemeChange.displayName = 'ThemeChange';

export { ThemeChange };
