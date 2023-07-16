
import nftjson from "../nft.json";
import { ethers } from "ethers";
import Swal from 'sweetalert2'
import { useState } from "react";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

function NTFimages(props) {

    const [imageUer,setImageUrl] = useState('')
    const [mining,setMinting] = useState(false)

    const mintNFT = async (url,id) => {

        setMinting(true)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'success',
            title: 'Mining in projess '
        })

        try{
                const Contract_Address = "0xb652C79Ee4bE5f713e9CbD8291952c0e530fa200";
                const animalnft = [
                    "function mintNFT(string memory tokenURI) payable external returns (uint256)",
                ];
                const CollectionContract = new ethers.Contract(Contract_Address, animalnft, props.signer);
            let response = await CollectionContract.mintNFT(url,{
                    value : ethers.utils.parseEther("0.01")
                });
                await response.wait();

                if(response.hash.length != 0) {
                    Swal.fire({
                        title: 'Cool!',
                        text: 'Mining was succesful',
                        icon: 'success',
                        confirmButtonText: 'close'
                    })
                }
            
        }catch(error){
            setMinting(false)
            const err =  getParsedEthersError(error);
            let text;
            if(err.context === 'UNSUPPORTED_OPERATION'){
                text = 'Connect your wallet to mint'
            }else{
                text = err.context;
            }

            Swal.fire({
                title: 'Error!',
                text: `${text}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }

  return (
    <div>
        <div class="row row-cols-4 row-cols-md-3 mt-4 g-4 p-4">
        {nftjson.map((item, index) => (<div class="col">
                <div class="card">
                <img src={item.image} class="card-img-top" width={200}
                            height={250} alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{item.name}</h5>
                    <p class="card-text">{item.description}</p>
                  <button class="btn btn-success" id={`nft${index}`} onClick={() => mintNFT(item.json,`ntf${index}`)} disabled={mining}>Mint (0.01 Ether) </button> 
                </div>
                </div>
            </div>))}
        </div> 
    </div>
  );
}

export default NTFimages;
