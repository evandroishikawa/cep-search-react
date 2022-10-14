import clsx from 'clsx';

import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styling?: 'primary' | 'secondary' | 'tertiary';
}

const Button = ({ className, styling = 'primary', type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.container, styles[styling], className)}
      type={type}
      {...props}
    />
  );
};

export default Button;
