import clsx from 'clsx';

import styles from './Button.module.scss';

const Button = ({ styling = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.container, styles[styling], props.className)}
      {...props}
    />
  );
};

export default Button;
