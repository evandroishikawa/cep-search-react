import { AddressForm } from '@/components/AddressForm';
import { CEPInput } from '@/components/CEPInput';

import '@/styles/global.scss';
import { ToastsContainer } from './components/ToastsContainer';

function App() {
  return (
    <div>
      <ToastsContainer />

      <h1 style={{ marginBottom: '24px' }}>Eu sei meu CEP</h1>

      <CEPInput />

      <AddressForm />
    </div>
  );
}

export default App;
