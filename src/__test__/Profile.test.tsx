import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from '@/app/profile/[id]/page';

test('Profle page does loading', () => {
	render(<Profile params={{ id: '1' }} />);

	expect(screen.getByLabelText('Kypator')).toBeDefined();
	expect(screen.getByLabelText('Страница')).toBeDefined();
	expect(screen.getByLabelText('Задания')).toBeDefined();
	expect(screen.getByLabelText('Kypator')).toBeDefined();
});
