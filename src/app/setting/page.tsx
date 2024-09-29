'use client';

import { AccountSettings } from '@/components/pages/setting/AccountSettings';
import { PrivateSettings } from '@/components/pages/setting/PrivateSettings';
import { SettingAction } from '@/components/pages/setting/SettingAction';
import { ViewSettings } from '@/components/pages/setting/ViewSettings';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hasRoleOrRedirectMain } from '@/lib/authGuardClient';

export default function Setting() {
	hasRoleOrRedirectMain();
	return (
		<div className='flex w-full h-full py-9 justify-center items-center '>
			<Tabs
				defaultValue='view'
				className='flex rounded-md border-r-2 border-b-2 p-2 gap-2 h-full w-2/3 bg-secondary text-secondary-foreground'
			>
				<TabsList className='flex flex-col h-full border-r-2 border-b-2 items-start text-left'>
					<TabsTrigger value='view'>Внешний вид</TabsTrigger>
					<TabsTrigger value='account'>Профиль</TabsTrigger>
					<TabsTrigger value='private'>Приватность</TabsTrigger>
				</TabsList>
				<section className='h-full w-full'>
					<div className='flex flex-col justify-between'>
						<TabsContent value='view'>
							<ViewSettings />
						</TabsContent>
						<TabsContent value='account'>
							<AccountSettings />
						</TabsContent>
						<TabsContent value='private'>
							<PrivateSettings />
						</TabsContent>
					</div>
					<div className='mt-2 h-8'>
						<SettingAction />
					</div>
				</section>
			</Tabs>
		</div>
	);
}
