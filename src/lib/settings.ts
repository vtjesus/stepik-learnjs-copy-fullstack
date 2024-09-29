import { Backgrounds } from '@/components/common/background/Background';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

export type config = {
	view: {
		backgroundVisible: boolean;
		background: keyof typeof Backgrounds;
	};
	private: {
		visibleProfile: boolean;
	};
	account: {};
};

export const defaltConfig: config = {
	view: {
		backgroundVisible: true,
		background: 'particle-connector',
	},
	private: {
		visibleProfile: true,
	},
	account: {},
};

export const setViewSetting = <T extends keyof config['view']>(
	setting: T,
	value: config['view'][T]
) => {
	const conf = getOrCreateSettingCookies();
	conf.view[setting] = value;
	setConfigSettings(conf);
};

export const setPrivateSetting = <T extends keyof config['private']>(
	setting: T,
	value: config['private'][T]
) => {
	const conf = getOrCreateSettingCookies();
	conf.private[setting] = value;
	setConfigSettings(conf);
};

export const setAccountSetting = <T extends keyof config['account']>(
	setting: T,
	value: config['account'][T]
) => {
	const conf = getOrCreateSettingCookies();
	conf.account[setting] = value;
	setConfigSettings(conf);
};

export const setView = (view: config['view']) => {
	const conf = getOrCreateSettingCookies();
	conf.view = view;
	setConfigSettings(conf);
};

export const setPrivate = (privat: config['private']) => {
	const conf = getOrCreateSettingCookies();
	conf.private = privat;
	setConfigSettings(conf);
};

export const setAccount = (account: config['account']) => {
	const conf = getOrCreateSettingCookies();
	conf.account = account;
	setConfigSettings(conf);
};

export const getOrCreateSettingCookies = (): config => {
	const exsist = hasCookie('setting');
	if (exsist) {
		return JSON.parse(getCookie('setting')!);
	} else {
		setConfigSettings(defaltConfig);
		return defaltConfig;
	}
};

export const setConfigSettings = (setting: config) => {
	setCookie('setting', JSON.stringify(setting), {
		sameSite: 'strict',
	});
};
