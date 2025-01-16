import React, { useState } from 'react';
import Input from 'components/lib/Aceternity/Input/AceternityInput.tsx';
import Label from 'components/lib/Aceternity/Label/AceternityLabel.tsx';
import { cn } from 'lib/utils.ts';
import { useNavigate } from 'react-router-dom';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { UserWithPwModel } from 'types/types/User/UserWithPw.ts';
import TgLogin from './TgLogin.tsx';
import { useScreenMode } from '../../../hooks/useScreenMode.ts';

const LoginForm = () => {
	const { login } = useUserInfo();
	const screenWidth = useScreenMode();
	const isWide =
		screenWidth > 1000 || (screenWidth <= 650 && screenWidth > 400);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const user: UserWithPwModel = {
			username,
			password,
		};

		try {
			await login(user);
			navigate('/events');
		} catch (_) {}
	};

	const handleClick = () => {
		navigate('/signup');
	};

	return (
		<div className={cn('w-full mx-auto')}>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Добро прожаловать в Move-Life
			</h2>
			<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
				Войдите, чтобы открыть максимум возможностей
			</p>

			<form
				className='my-8'
				onSubmit={handleSubmit}
			>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='email'>Имя пользователя</Label>
					<Input
						id='username'
						placeholder='sergey_ivanov'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</LabelInputContainer>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='password'>Пароль</Label>
					<Input
						id='password'
						placeholder='••••••••'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</LabelInputContainer>

				<button
					className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'
				>
					Войти
					<BottomGradient />
				</button>

				<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

				<TgLogin />

				<button
					className='bg-gradient-to-br relative group/btn from-blue-950 to-blue-400 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'
					onClick={handleClick}
				>
					{isWide ? 'Зарегистрироваться' : 'Регистрация'}
					<BottomGradient />
				</button>
			</form>
		</div>
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

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn('flex flex-col space-y-2 w-full', className)}>
			{children}
		</div>
	);
};

export default LoginForm;
