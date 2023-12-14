import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	error?: string | number;
}

const Input = ({ name, label, error = '', ...args }: InputProps) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<input id={name} className="form-control" name={name} {...args} />
		{error && <div className="invalid-feedback d-block">{error}</div>}
	</div>
);

export default Input;
