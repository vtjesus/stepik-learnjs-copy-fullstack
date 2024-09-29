import { ParicleConnectionBackground } from './ParicleConnectionBackground';
import { getOrCreateSettingCookies } from '@/lib/settingServer';

export const Backgrounds = {
	'particle-connector': ParicleConnectionBackground,
};

export const Background = () => {
	const { background, backgroundVisible } = getOrCreateSettingCookies().view;

	const BackgroundComponent = Backgrounds[background];
	return (
		<>{backgroundVisible && BackgroundComponent && <BackgroundComponent />}</>
	);
};
