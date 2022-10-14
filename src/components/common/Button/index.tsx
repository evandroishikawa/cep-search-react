import Btn, { ButtonProps } from './Button.component';

export const Button = {
  Primary: (props: Omit<ButtonProps, 'styling'>) => <Btn {...props}/>,
  Secondary: (props: Omit<ButtonProps, 'styling'>) => <Btn styling="secondary" {...props}/>,
  Tertiary: (props: Omit<ButtonProps, 'styling'>) => <Btn styling="tertiary" {...props}/>,
};
