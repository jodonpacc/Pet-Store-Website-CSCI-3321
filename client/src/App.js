//App.js

import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:9000').then((data) => {
    //getting data from backend and then console logging it
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App;