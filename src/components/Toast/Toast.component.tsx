import clsx from 'clsx';
import { useEffect } from 'react';
import { FiAlertOctagon, FiAlertTriangle, FiInfo, FiXCircle } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi';
import { animated } from 'react-spring';
import type { AnimatedProps } from 'react-spring';

import { useToast } from '@/hooks';

import styles from './Toast.module.scss';

interface ToastProps {
  toast: IToast;
  style: AnimatedProps<Record<string, any>>;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <BiCheckCircle size={24} />,
  error: <FiAlertOctagon size={24} />,
  warning: <FiAlertTriangle fontSize={24} />,
};

const Toast = ({ toast, style: { life, ...style } }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeToast(toast.id);
    }, toast.timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [toast, removeToast]);

  console.log(life, style);

  return (
    <animated.div className={clsx(styles.container, styles[toast.type])} style={style}>
      {icons[toast.type]}

      <div className={styles.content}>
        <strong>{toast.heading}</strong>

        <p>{toast.message}</p>
      </div>

      <button onClick={() => removeToast(toast.id)}>
        <FiXCircle size={20} />
      </button>
    </animated.div>
  );
};

export default Toast;
