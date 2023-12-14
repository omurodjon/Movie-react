import React from 'react';

export type IOption = {
  value: string | number;
  label: string;
};

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  error?: string | number;
  options: IOption[];
}

const Select = ({ name, label, error = '', options, ...args }: SelectProps) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select className="form-select" name={name} {...args}>
      <option disabled value="">
        Select Genre
      </option>
      {options.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
    {error && <div className="invalid-feedback d-block">{error}</div>}
  </div>
);

export default Select;
