import clsx from 'clsx';
import { forwardRef, useRef, useState } from 'react';
import type { InputHTMLAttributes, FocusEvent } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  label?: string;
  success?: boolean;
}

const Input = (({ name, error, label, success, ...rest }: InputProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) setFocused(false);
  };

  return (
    <div
      className={clsx('InputComponent', styles.container, {
        [styles.containerSuccess]: success,
        [styles.containerError]: !!error,
      })}
      onClick={() => {
        setFocused(true);

        inputRef.current?.focus();
      }}
    >
      {!!label && (
        <label
          htmlFor={name + 'Input'}
          className={clsx(styles.label, {
            [styles.labelFocused]: focused,
            [styles.labelSuccess]: success,
            [styles.labelError]: !!error,
          })}
        >
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        id={name + 'Input'}
        name={name}
        className={clsx(styles.input)}
        onBlur={handleInputBlur}
        onFocus={() => setFocused(true)}
        {...rest}
      />
    </div>
  );
});

export default Input;
