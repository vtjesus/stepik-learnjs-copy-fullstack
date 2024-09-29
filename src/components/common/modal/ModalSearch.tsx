import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchBook } from '../SearchBook';
import { Search as SVGSearch } from 'lucide-react';

export function ModalSearch() {
	return (
		<Dialog modal={false}>
			<DialogTrigger asChild>
				<SVGSearch
					className='stroke-2 hover:stroke-primary mr-2'
					width={24}
					height={24}
				/>
			</DialogTrigger>
			<DialogContent
				color='none'
				className='w-[60vw] hidden_close_buttom top-56 scale-125 h-9 p-0 m-0 lg:max-w-[500px] border-none bg-none'
			>
				<SearchBook className='w-full scale-125' />
			</DialogContent>
		</Dialog>
	);
}
