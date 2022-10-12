import { useAtomValue } from 'jotai';
import { useTransition } from 'react-spring';

import { toastsAtom } from '@/atoms';

import { Toast } from '@/components/Toast';

import styles from './ToastsContainer.module.scss';

const ToastsContainer = () => {
  const toasts = useAtomValue(toastsAtom);

  const toastsTransitions = useTransition(toasts, {
    from: { right: '-120%', opacity: 0, life: '0%' },
    enter: { right: '0%', opacity: 1, life: '100%' },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <div className={styles.container}>
      {toastsTransitions((style, toast) => (
        <Toast toast={toast} style={style} />
      ))}
    </div>
  );
};

export default ToastsContainer;
