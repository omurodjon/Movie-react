import React, { Component } from 'react';
import * as yup from 'yup';
import Input from './input';
import Select, { IOption } from './select';

interface State<T> {
  values: T;
  errors: Partial<T>;
  isLoading: boolean;
}

class Form<IForm extends Record<TKey, string | number>, TProps = {}, TKey extends keyof IForm = keyof IForm> extends Component<TProps, State<IForm>> {
  schema?: yup.ObjectSchema<Partial<IForm>>;
  doSubmit?: (data: IForm) => void;

  validate = (values: IForm) => {
    const errors: Partial<IForm> = {};

    try {
      this.schema!.validateSync(values, { abortEarly: false });
      return null;
    } catch (error: any) {
      if (error instanceof yup.ValidationError)
        // @ts-ignore
        for (const { path = '', message } of error.inner) errors[path] = message;
      return errors;
    }
  };

  validateField = (name: TKey, value: string) => {
    const errors: Partial<IForm> = this.state.errors;

    if (!errors[name]) return errors;

    try {
      this.schema!.pick([name]).validateSync({ [name]: value }, { abortEarly: false });
      delete errors[name];
      return errors;
    } catch (error: any) {
      if (error instanceof yup.ValidationError)
        for (const { path = '', message } of error.inner) {
          // @ts-ignore
          errors[path] = message;
        }
      return errors;
    }
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({ target }) => {
    const value = target.type === 'number' ? (target as any)?.valueAsNumber : target.value;

    const errors = this.validateField(target.name as TKey, value);
    this.setState({ errors, values: { ...this.state.values, [target.name]: value } });
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const errors = this.validate(this.state.values);

    if (errors) return this.setState({ errors });

    this.doSubmit!(this.state.values);
  };

  renderInput = (name: TKey, label: string, type: React.HTMLInputTypeAttribute = 'text') => (
    <Input name={name as string} label={label} type={type} value={this.state.values[name]} error={this.state.errors[name]} onChange={this.handleChange} placeholder={label} />
  );

  renderSelect = (name: TKey, label: string, options: IOption[] = []) => (
    <Select
      name={name as string}
      label={label}
      value={this.state.values[name]}
      error={this.state.errors[name]}
      onChange={this.handleChange}
      options={options}
      placeholder={label}
    />
  );

  renderButton = (title: string) => {
    const { isLoading } = this.state;
    return (
      <button className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} disabled={isLoading}>
        {isLoading ? `${title}...` : title}
      </button>
    );
  };
}

export default Form;
