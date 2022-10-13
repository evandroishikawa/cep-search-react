import Btn from './Button.component';

export const Button = {
  Primary: (props: Omit<ButtonProps, 'styling'>) => <Btn {...props}/>,
  Secondary: (props: Omit<ButtonProps, 'styling'>) => <Btn styling="secondary" {...props}/>,
};
