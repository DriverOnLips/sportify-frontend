import React, { useState } from 'react';
import Input from 'components/lib/Aceternity/Input/AceternityInput.tsx';
import Label from 'components/lib/Aceternity/Label/AceternityLabel.tsx';
import { cn } from 'lib/utils.ts';
import { SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserWithPwModel } from 'types/types/User/UserWithPw.ts';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { showToast } from '../../../components/lib/Toast/Toast.tsx';

const SignupForm = () => {
	const { register } = useUserInfo();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setrepeatPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== repeatPassword) {
			showToast('error', 'Пароли не совпадают');
			return;
		}

		const user: UserWithPwModel = {
			username,
			password,
		};

		try {
			await register(user);
			showToast('success', 'Вы вошли в аккаунт');
			navigate('/events');
		} catch (_) {}
	};

	const handleClick = () => {
		navigate('/login');
	};

	return (
		<div className={cn('w-full mx-auto')}>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Добро прожаловать в MoveLife
			</h2>

			{/*<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>*/}
			{/*	Зарегистрируйтесь, чтобы открыть максимум возможностей*/}
			{/*</p>*/}

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

				<LabelInputContainer className='mb-4'>
					<Label htmlFor='password'>Повторите пароль</Label>
					<Input
						id='password'
						placeholder='••••••••'
						type='password'
						value={repeatPassword}
						onChange={(e) => setrepeatPassword(e.target.value)}
					/>
				</LabelInputContainer>

				<button
					className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'
				>
					Создать аккаунт
					<BottomGradient />
				</button>

				<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

				{/*<div className='flex flex-col space-y-4'>*/}
				{/*	<button*/}
				{/*		className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'*/}
				{/*		type='submit'*/}
				{/*	>*/}
				{/*		<SendOutlined />*/}
				{/*		<span className='text-neutral-700 dark:text-neutral-300 text-sm'>*/}
				{/*			Telegram*/}
				{/*		</span>*/}
				{/*		<BottomGradient />*/}
				{/*	</button>*/}
				{/*</div>*/}

				{/*<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />*/}

				<button
					className='bg-gradient-to-br relative group/btn from-blue-950 to-blue-400 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'
					onClick={handleClick}
				>
					Войти в аккаунт
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

export default SignupForm;
