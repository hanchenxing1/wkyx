import { ethers } from "ethers";
import Swal from 'sweetalert2'
import { useState } from "react";


function Navbar(props) {

   const [wallet, setWallet] = useState('');
   const [connect,setConnected] = useState(false);



    async function  connectWallet()
    {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner()
            // const {address} = props;
            props.setSigner(signer);
            props.isConnected(true);
            setWallet(await signer.getAddress())
            setConnected(true)
            Swal.fire({
                title: 'Connected!',
                text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        }catch(error){
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: 'Failed to connect',
                icon: 'error',
                confirmButtonText: 'Try Again'
              })
        }
    }

  return (
    <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Pet NFT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    {/* <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown link
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                    </ul> */}
                </div>
            </div>
            <ul class="nav justify-content-end">
                <li class="nav-item">
                   { connect ? <button class="btn btn-danger" onClick={connectWallet}> {wallet.slice(0,9)+"..."} </button> : <button class="btn btn-danger" onClick={connectWallet}>Connect</button>  } 
                </li>
                
            </ul>
        </nav>
      
    </div>
  );
}

export default Navbar;
