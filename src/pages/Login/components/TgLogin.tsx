import { cn } from 'lib/utils.ts';
import { SendOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { Button } from 'antd';

const TgLogin = () => {
	const { tgLogin } = useUserInfo();

	const [loading, setLoading] = useState(false);

	const handleClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		setLoading(true);

		await tgLogin(() => setLoading(false));
	};

	return (
		<>
			<div className='flex flex-col space-y-4'>
				<Button
					className={cn(
						'relative group/btn flex space-x-2 items-center',
						'justify-center px-4 w-full text-black rounded-md h-10',
						'font-medium shadow-input bg-gray-50 dark:bg-zinc-900',
						'dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]',
					)}
					onClick={handleClick}
					loading={loading}
				>
					<SendOutlined />
					<span className='text-neutral-700 dark:text-neutral-300 text-sm'>
						Войти через Telegram
					</span>
					<BottomGradient />
				</Button>
			</div>
			<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
		</>
	);
};

const BottomGradient = () => {
	return (
		<>
			<span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
			<span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
		</>
	);
};

export default TgLogin;
