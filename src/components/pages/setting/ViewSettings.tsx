'use client';
import { CheckboxWithText } from '@/components/ui/checkbox-with-text';
import {
	config,
	getOrCreateSettingCookies,
	setViewSetting,
	setConfigSettings,
} from '@/lib/settings';
import React, { useState } from 'react';

export const ViewSettings = () => {
	const [config, setConfig] = useState(getOrCreateSettingCookies());
	const [ip, set] = useState(false);

	const handleCheckbox = (setting: keyof config['view'], value?: any) => {
		let conf = getOrCreateSettingCookies();
		conf.view.backgroundVisible = !conf.view.backgroundVisible;
		setConfig(conf);
		setConfigSettings(conf);
	};

	return (
		<div>
			<h2>Внешнний вид</h2>
			<div className='flex flex-col gap-1'>
				<CheckboxWithText
					onChange={e => handleCheckbox('backgroundVisible')}
					value={config['view']['backgroundVisible']}
					description='Этот переключатель отвечает за отображение анимированного заднего фона'
				>
					Анимированный задний фон
				</CheckboxWithText>
			</div>
		</div>
	);
};
