import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import ReactTableDemo from './Components/table/ReactTableDemo';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <ReactTableDemo />
      </ChakraProvider>
    </div>
  );
}

export default App;
