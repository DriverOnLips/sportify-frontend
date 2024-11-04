import { Button as AntdButton, ButtonProps } from 'antd';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
	// Здесь можно добавить дополнительные пропсы
}

const Button: React.FC<CustomButtonProps> = ({
	block,
	danger,
	disabled,
	ghost,
	href,
	icon,
	loading,
	shape,
	size,
	target,
	type = 'primary',
	children,
	...rest
}) => (
	<AntdButton
		block={block}
		danger={danger}
		disabled={disabled}
		ghost={ghost}
		href={href}
		icon={icon}
		loading={loading}
		shape={shape}
		size={size}
		target={target}
		type={type}
		{...rest}
	>
		{children}
	</AntdButton>
);

export default Button;
