import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InfoDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'secondary'} className='h-6 w-6 mr-2 rounded-b-none'>
					i
				</Button>
			</DialogTrigger>
			<DialogContent className='w-1/3'>
				<DialogHeader>
					<DialogTitle>Помощь в написаниее</DialogTitle>
				</DialogHeader>
				<div>
					<div className='content'>
						Для написание сфокусирования пользователя на информации используется
						классы alert notecard attention
						<div>
							Например alert:
							<div className='notecard'>Обрати внимание</div>
						</div>
					</div>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
