import { Focus } from '@/components/common/Focus';
import { SearchBook } from '@/components/common/SearchBook';
import { Owl } from '@/components/common/svg/Owl';
import { BookNavigation } from '@/components/pages/main/BookNavigation';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<main className='p-8 px-12 md:px-24'>
			<header className='flex justify-between w-full items-center mb-4'>
				<div className='w-full min-[750px]:w-[70%] h-[220px] flex flex-col justify-between'>
					<div>
						<h1 className='text-3xl font-bold'>
							Книга дизайна и программирования.
						</h1>
						<p className='text-md text-pretty lg:text-xl'>
							В этом учебнике вы найдёте статьи о программировании html, css и
							js. Так же решать задачи, обсуждать темы с другими пользователями
						</p>
					</div>
					<SearchBook className='mb-2 ' />
				</div>
				<div>
					<Owl
						className='fill-foreground hidden  min-[750px]:block'
						height={230}
						wight={230}
					/>
				</div>
			</header>
			<Separator
				className='h-1 w-full mb-2 bg-foreground'
				orientation='horizontal'
			/>
			<section>
				<h2 className='text-2xl '>Содержание:</h2>
				<article className='w-[100%]'>
					<p>
						В первой главе вы найдёте базовые занания о создании структуры
						сайта. Во второй главе вы научитесть стилизовать страницы и
						элементы. Третья глава как покажет как сделать сайт более
						интерактивный. Рекомендуем начать с первой главы - HTML.
					</p>
				</article>
			</section>
			<BookNavigation accardion={true} />
		</main>
	);
}
