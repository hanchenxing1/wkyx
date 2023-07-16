import './App.css';
import Navbar from './header/Nabar';
import NTFimages from './component/NTFimages';
import { useEffect, useState } from "react";

function App() {

  const [connect,setConnected] = useState();
  const [signer,setSigner] = useState();
  
  console.log(signer)

  return (
    <div className="App">
      <Navbar setSigner={setSigner} isConnected={setConnected}/>
      <NTFimages isConnected={connect}  signer={signer}/>
    </div>
  );
}

export default App;
