import cn from 'classnames';
import * as React from 'react';
import { ReactNode } from 'react';

import './Text.scss';

type TextProps = {
	className?: string;
	size?: 's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
	text_align?: 'center' | 'start' | 'end';
	weight?: 'medium' | 'bold';
	color?: 'primary' | 'secondary' | 'main';
	display?: 'flex';
	ref?: React.RefObject<HTMLSpanElement>;
	gap?: string;
	decoration?: string;
	cursor?: string;
	maxLines?: number;
	style?: React.CSSProperties;
	onClick?(): void;
	children: ReactNode;
};

const Text: React.FC<TextProps> = ({
	className,
	size = 's5',
	text_align = 'start',
	weight = 'medium',
	color,
	display,
	ref,
	gap,
	decoration,
	cursor,
	maxLines,
	style: customStyle,
	onClick,
	children,
}) => {
	const style: React.CSSProperties = {
		textAlign: text_align,
		'--max-lines-count': maxLines,
		...customStyle,
	} as React.CSSProperties;

	if (display) style.display = display;
	if (gap) style.gap = gap;
	if (decoration) style.textDecoration = decoration;
	if (cursor) style.cursor = cursor;

	return (
		<span
			className={cn(
				!!className && className,
				size,
				weight,
				!!color && color,
				!!maxLines && 'max_lines',
			)}
			ref={ref}
			style={style}
			onClick={onClick}
		>
			{children}
		</span>
	);
};

export default Text;
