import { Toaster } from 'sonner';
import './App.css';
import { CreateNewUser } from './components/CreateNewUser';
import { ListOfUsers } from './components/ListOfUsers';

function App() {
  return (
    <div className="App">
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </div>
  );
}

export default App;
