interface IToast {
  id: string;
  heading: string;
  message: string;
  timer?: number;
  type: 'success' | 'error' | 'info' | 'warning';
}
