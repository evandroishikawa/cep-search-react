import { useEffect, useRef } from 'react';
import type { FormEvent, FormHTMLAttributes } from 'react';
import { INPUT_ELEMENTS } from '@/constants';
import { getFormData } from './getFormData';

interface FormProps<T = any> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
  initialData?: T;
  onSubmit: (data: T) => void;
}

function Form<T = any>({ children, initialData, onSubmit, ...rest }: FormProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    const data = getFormData(formRef.current.children);

    onSubmit(data as T);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
