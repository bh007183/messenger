import logo from './logo.svg';
import './App.css';
import configureStore from "./store/configureStore"
import {Provider} from "react-redux"
import Main from "./pages/Main"

function App() {
  const store = configureStore();
  
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
    
  );
}

export default App;
