import { AddressForm } from '@/components/AddressForm';
import { CEPInput } from '@/components/CEPInput';

import '@/styles/global.scss';

function App() {
  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Eu sei meu CEP</h1>

      <CEPInput />

      <AddressForm />
    </div>
  );
}

export default App;
