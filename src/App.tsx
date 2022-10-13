import { AddressForm } from '@/components/AddressForm';
import { CEPInput } from '@/components/CEPInput';
import { ToastsContainer } from '@/components/ToastsContainer';

import '@/styles/global.scss';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <ToastsContainer />

      <h1>Eu sei meu CEP</h1>

      <CEPInput />

      <AddressForm />
    </div>
  );
}

export default App;
