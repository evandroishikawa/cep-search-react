import { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';

// import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ name, label, ...rest }, ref) => {
  return (
    <div>
      {!!label && <label htmlFor={name + 'Input'}>{label}</label>}

      <input ref={ref} id={name + 'Input'} {...rest} />
    </div>
  );
});

export default Input;
