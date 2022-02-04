

const user = Moralis.User.current();

function UpdateReqStatus(){
//Opcodes for requested Data
//0 
  let nameFlag=2,numFlag=2,hashFlag=2;
  let updtNum,updtName,updtHash;
  
  if(document.getElementById("docNumFlag")){
    
    
     updtNum = document.getElementById("docNumFlag").checked;
    if(updtNum){
        numFlag = 3;
    }
    
  }
 
  if(document.getElementById("docNameFlag")){
   
    updtName = document.getElementById("docNameFlag").checked;
    if(updtName){
      nameFlag = 3;
    }
    
  }
  
  if(document.getElementById("docHashFlag")){
   
    updtHash = document.getElementById("docHashFlag").checked;
    if(updtHash){
      hashFlag = 3;
    }
    
  }
  

  console.log( typeof updtHash, updtName, updtNum);
  let Overall_Status = 2;

  
  if(numFlag == 3 && nameFlag == 3 && hashFlag == 3){
    //Approved  
    Overall_Status = 3;
  }
  else if(numFlag ==2 && nameFlag == 2 && hashFlag == 2){
      //completely Rejected
      Overall_Status = 1;
    }
    else if (numFlag == 3 || nameFlag == 3 || hashFlag == 3){
      //Partially approved
      Overall_Status = 2;
    }
    if (confirm("Are you sure about updated Access") == true) {
      $.post("/updateStatus",
      {
        UserAddress:user.attributes.ethAddress, 
        RequestIndex : parseInt(indValue),
        nameFlag:nameFlag , 
        numFlag:numFlag,
        ipfsHashFlag:hashFlag, 
        Overall_Status : Overall_Status
      },function(data,status){
        if(data){
          alert("Successfully updated Request");
          window.location.href = "/";
        }
        else if(data == false){
          alert("An error Occurred please try again later");
          window.location.href = "/";
        }

      }
        
      );
      
    }
    
  

  

}


let indValue="";

async function getRequestDetail(){

let ABIstring = '[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "address", "name": "ReqBy", "type": "address" }, { "internalType": "string", "name": "Reqname", "type": "string" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" } ], "name": "AddDocRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "name": "AddUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ContractOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "RequestIndex", "type": "uint256" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" }, { "internalType": "uint256", "name": "Overall_Status", "type": "uint256" } ], "name": "UpdateRequestStatus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "RequestIndex", "type": "uint256" } ], "name": "ViewDocRequestHeader", "outputs": [ { "internalType": "address", "name": "Reqby", "type": "address" }, { "internalType": "string", "name": "ReqName", "type": "string" }, { "internalType": "uint256", "name": "Overall_Status", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "ViewDocRequestLength", "outputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "OrgAddress", "type": "address" }, { "internalType": "uint256", "name": "ReqIndex", "type": "uint256" } ], "name": "ViewDocsOrg", "outputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "Index", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "OrgAddress", "type": "address" } ], "name": "ViewOrgRequestLength", "outputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "OrgAddress", "type": "address" }, { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "ViewReqExists", "outputs": [ { "internalType": "bool", "name": "exists", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "last_completed_migration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "completed", "type": "uint256" } ], "name": "setCompleted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "ReqIndex", "type": "uint256" } ], "name": "viewDocRequest", "outputs": [ { "internalType": "address", "name": "ReqBy", "type": "address" }, { "internalType": "string", "name": "Reqname", "type": "string" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" }, { "internalType": "uint256", "name": "Overall_status", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "viewUser", "outputs": [ { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "stateMutability": "view", "type": "function" } ]';
ABIstring = ABIstring.replace(/'/g , "\"");
const ABIJSON = JSON.parse(ABIstring);
await Moralis.enableWeb3();
const contractAddress = document.getElementById("contractAddr").value;
indValue = document.getElementById("ReqIndex").value;
const rqTable = document.getElementById("requestDet");
const options = {
    contractAddress: contractAddress,
    functionName: "viewDocRequest",
    abi: ABIJSON,
    params: {
      UserAddress: user.attributes.ethAddress,
      ReqIndex:indValue
    },
  };

  Moralis.executeFunction(options).then(
    (value)=>{
        console.log(value);

        let nameFlag = value.numFlag;
        let numFlag = value.nameFlag;
        let reqName = value.Reqname;
        let reqAddr = value.ReqBy;
        let ipfsHashFlag = value.ipfsHashFlag;
        let Overall_Status = value.Overall_Status;

      // if flag value is 1 it means they are requested
      // 0 means not requested

        var lHtml = `<tr> <th> Institution Name</th> <td>${reqName} </td> </tr><tr> <th> Institution Address</th> <td>${reqAddr} </td> </tr>`;
        if(numFlag == 0 && nameFlag == 0 && ipfsHashFlag == 0){
          lHtml += "<tr> <td> This case exists only for testing </td> <td>&nbsp;</td></tr>";
        }
        else{
        if(numFlag == 1){
          lHtml += '<tr> <td> Document number </td> <td><input type="checkbox" id="docNumFlag" name = "numflg"> </td> </tr>'; 
        }
        if(nameFlag == 1){
          lHtml += '<tr> <td> Document Name </td> <td><input type="checkbox" id="docNameFlag" name = "nameflg"> </td> </tr>'; 
        }
        if(ipfsHashFlag == 1){
          lHtml += '<tr> <td> Document Image </td> <td><input type="checkbox" id="docHashFlag" name = "hashflg"> </td> </tr>'; 
        }
      }
        lHtml+= '<tr><td colspan="2"> <button onclick="UpdateReqStatus()"> Update Status </button></td></tr> ';
        rqTable.insertAdjacentHTML('beforeend',lHtml);

        



    }
  ).catch(
      (err)=>{
          console.log(err);
      }
  )
  

}
getRequestDetail();

