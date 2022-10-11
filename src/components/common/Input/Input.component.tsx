import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes, FocusEvent } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  label?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ name, error, label, success, ...rest }, ref) => {
  const [focused, setFocused] = useState(false);

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) setFocused(false);
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.containerSuccess]: success,
        [styles.containerError]: !!error,
      })}
      onClick={() => setFocused(true)}
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
        ref={ref}
        id={name + 'Input'}
        className={clsx(styles.input)}
        onBlur={handleInputBlur}
        onFocus={() => setFocused(true)}
        {...rest}
      />
    </div>
  );
});

export default Input;
