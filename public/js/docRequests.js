


const user = Moralis.User.current();

async function getRequests(){
let ABIstring = '[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "address", "name": "ReqBy", "type": "address" }, { "internalType": "string", "name": "Reqname", "type": "string" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" } ], "name": "AddDocRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "name": "AddUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ContractOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "RequestIndex", "type": "uint256" } ], "name": "ViewDocRequestHeader", "outputs": [ { "internalType": "address", "name": "Reqby", "type": "address" }, { "internalType": "string", "name": "ReqName", "type": "string" }, { "internalType": "uint256", "name": "Overall_Status", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "ViewDocRequestLength", "outputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "last_completed_migration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "completed", "type": "uint256" } ], "name": "setCompleted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "ReqIndex", "type": "uint256" } ], "name": "viewDocRequest", "outputs": [ { "internalType": "address", "name": "ReqBy", "type": "address" }, { "internalType": "string", "name": "Reqname", "type": "string" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" }, { "internalType": "uint256", "name": "Overall_status", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "viewUser", "outputs": [ { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "stateMutability": "view", "type": "function" } ]';
ABIstring = ABIstring.replace(/'/g , "\"");
const ABIJSON = JSON.parse(ABIstring);

const contractAddress = document.getElementById("contractAddr").value;

//console.log(ABIJSON,contractAddress);
//console.log(user.attributes.ethAddress);

const web3 = await Moralis.enableWeb3();

// const options = {
//     contractAddress: contractAddress,
//     functionName: "ViewDocRequestHeader",
//     abi: ABIJSON,
//     params: {
//       UserAddress: user.attributes.ethAddress,
//       RequestIndex : 0
//     },
//   };
const options = {
  contractAddress: contractAddress,
  functionName: "ViewDocRequestLength",
  abi: ABIJSON,
  params: {
    UserAddress: user.attributes.ethAddress,
  },
};

  //  Moralis.executeFunction(options).then(
  //     (value)=>{
  //       console.log(value);
  //       length = value;
  //     }
  //  ).catch((error)=>{
  //    console.log("No Requests made");
  //  })
  console.log("waiting");
  let length = await Moralis.executeFunction(options);
  if(parseInt(length) == 0){
    console.log("No requests");
  }
  else{
    let reqTable = document.getElementById("requestTable");
    let options = {
      contractAddress: contractAddress,
      functionName: "ViewDocRequestHeader",
      abi: ABIJSON,
      params: {
        UserAddress: user.attributes.ethAddress,
      },
    };
    
    for( let i = 0 ;i<length ; i++){
      options.params['RequestIndex'] = i;
      Moralis.executeFunction(options).then(
        (value)=>{
          console.log(value);
          var listHTML = "<tr><td>"+value.ReqName+"</td><td>"+value.Reqby+"</td><td align='center'><button type='button'>More Info</button></td></tr>";
          reqTable.insertAdjacentHTML('beforeend',listHTML);
        }
      ).catch((err)=>{
        console.log(err);
      })
     

    }
  }
}

getRequests();