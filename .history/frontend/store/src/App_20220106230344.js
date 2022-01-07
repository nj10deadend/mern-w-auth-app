import './App.css';
import { UserProvider } from './context/UserDataContext';
import Home from './Home';

function App() {


  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}

export default App;
