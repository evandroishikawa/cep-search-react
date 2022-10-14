import { useRef } from 'react';
import type { FormEvent, FormHTMLAttributes } from 'react';

import { getFormData } from './getFormData';
import { resetFormData } from './resetFormData';

interface FormProps<T = any> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
  initialData?: T;
  onSubmit: (data: T) => void;
}

function Form<T = any>({ children, initialData, onSubmit, onReset, ...rest }: FormProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    const data = getFormData(formRef.current.children);

    onSubmit(data as T);
  };

  const handleFormReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    resetFormData(formRef.current.children);

    if (onReset) onReset(event);
  }

  return (
    <form ref={formRef} onReset={handleFormReset} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
