import clsx from 'clsx';
import { useId, useRef, useState } from 'react';
import type { InputHTMLAttributes, FocusEvent } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  fixed?: boolean;
  hidden?: boolean;
  label?: string;
  success?: boolean;
}

const Input = (({ className, name, error, fixed, hidden, label, success, ...rest }: InputProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) setFocused(false);
  };

  const handleContainerClick = () => {
    if (rest.disabled) return;

    setFocused(true);

    inputRef.current?.focus();
  };

  return (
    <div
      className={clsx('InputComponent', styles.container, className, {
        [styles.containerSuccess]: success,
        [styles.containerError]: error,
        [styles.disabled]: rest.disabled,
        [styles.hidden]: hidden,
      })}
      onClick={handleContainerClick}
    >
      {!!label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, {
            [styles.labelFocused]: focused,
            [styles.labelSuccess]: success,
            [styles.labelError]: error,
            [styles.labelFixed]: fixed,
          })}
        >
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        id={id}
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
