import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { toastsAtom } from '@/atoms/toasts';

export function useToast() {
  const setToasts = useSetAtom(toastsAtom);

  const addToast = useCallback(({ type = 'info', timer = 5000, ...message }: Omit<IToast, 'id'>) => {
    const newMessage: IToast = {
      id: uuid(),
      type,
      timer,
      ...message,
    };

    setToasts(toasts => ([...toasts, newMessage]));
  }, [setToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts(toasts => toasts.filter((message) => message.id !== id));
  }, [setToasts]);

  return { addToast, removeToast };
}
