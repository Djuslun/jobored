import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter >
  );
}

export default App;
