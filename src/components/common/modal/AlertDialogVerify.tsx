import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function AlertDialogVerify({
	onClose,
	onOk,
}: {
	onClose: () => void;
	onOk: () => void;
}) {
	return (
		<AlertDialog onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Хотите зарегестрироваться?</AlertDialogTitle>
					<AlertDialogDescription>
						Если вы зарегестрируйтесь, то сможете сохранять ваш прогресс,
						участвовать в совместных уроках и т.д.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отмена</AlertDialogCancel>
					<AlertDialogAction onClick={onOk}>Продолжить</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
