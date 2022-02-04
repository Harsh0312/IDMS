const e = require('express');
const Moralis = require('moralis/node');
Moralis.initialize("mCSwkSAJpil0vP4GWCQskslXRRXJRRzD3nWh8FV9");
Moralis.serverURL = "https://k95vzhhakuri.moralisweb3.com:2053/server";
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
let ABIstring = '[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "address", "name": "ReqBy", "type": "address" }, { "internalType": "string", "name": "Reqname", "type": "string" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" } ], "name": "AddDocRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "name": "AddUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ContractOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "RequestIndex", "type": "uint256" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" }, { "internalType": "uint256", "name": "Overall_Status", "type": "uint256" } ], "name": "UpdateRequestStatus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "RequestIndex", "type": "uint256" } ], "name": "ViewDocRequestHeader", "outputs": [ { "internalType": "address", "name": "Reqby", "type": "address" }, { "internalType": "string", "name": "ReqName", "type": "string" }, { "internalType": "uint256", "name": "Overall_Status", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "ViewDocRequestLength", "outputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "OrgAddress", "type": "address" }, { "internalType": "uint256", "name": "ReqIndex", "type": "uint256" } ], "name": "ViewDocsOrg", "outputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "Index", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "OrgAddress", "type": "address" } ], "name": "ViewOrgRequestLength", "outputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "OrgAddress", "type": "address" }, { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "ViewReqExists", "outputs": [ { "internalType": "bool", "name": "exists", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "last_completed_migration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "completed", "type": "uint256" } ], "name": "setCompleted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "uint256", "name": "ReqIndex", "type": "uint256" } ], "name": "viewDocRequest", "outputs": [ { "internalType": "address", "name": "ReqBy", "type": "address" }, { "internalType": "string", "name": "Reqname", "type": "string" }, { "internalType": "uint256", "name": "nameFlag", "type": "uint256" }, { "internalType": "uint256", "name": "numFlag", "type": "uint256" }, { "internalType": "uint256", "name": "ipfsHashFlag", "type": "uint256" }, { "internalType": "uint256", "name": "Overall_status", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" } ], "name": "viewUser", "outputs": [ { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "stateMutability": "view", "type": "function" } ]';


ABIstring = ABIstring.replace(/'/g , "\"");
const ABIJSON = JSON.parse(ABIstring);
const contractAddress = "0x899548a4FAcacCdfF2b6cbfa3fD5e84B044C073C";

exports.getWrapper = (req,res,next) =>{

    if(req.session.user && req.session.isAuth){
        console.log("User already Logged in");
       return res.redirect('/index');
    }
    else{
        return res.redirect('/login');
    }
}


exports.getIndex = (req,res,next) =>{
    console.log("----TempIndex Called -----");
    //i get all the user details here
    

   return res.render("tempind",{sess:req.session});
}

exports.getLogin = (req,res,next) =>{
    // if(req.session.user){

    //     return res.redirect('/index');
    //  }
    //  else{
    //      return res.render('login');
    //  }
    return res.render('login');
}

exports.LoginwithEmPass = (req,res,next)=>{
    req.session.user = req.body.user;
    req.session.isAuth= true;
    req.session.save(err => {
        console.log("Inside Session save Empass");
        return res.redirect('/index');      
      });

}


exports.LoginWithMeta = async (req,res,next)=>{
    console.log("--Login With Meta--");
    // console.log(Object.getOwnPropertyNames(Moralis.Web3));
    //console.log(req.body.user);
    let usr = req.body.user;
   
    req.session.usrObj = req.body.otherData;
    console.log(usr);
    req.session.user = usr;
    req.session.isAuth = true;
    req.session.save(err => {
        console.log("Inside Session save Meta");
        return res.redirect('/index');      
      });

    
}
exports.logOut = (req,res,next)=>{
    console.log(req.result);
    req.session.isAuth=false;
    console.log("Inside Logout");
    req.session.user =req.result;
    return res.redirect("/");
}


exports.getProfile = (req,res,next)=>{
    if(req.session.isAuth){
    
        return res.render("profile",{sess:req.session});
    }else{
        return res.redirect("/");
    }
}
exports.getDocUpload =(req,res,next)=>{
    if(req.session.isAuth){
        return res.render("document",{sess:req.session});
    }else{
        return res.redirect("/");
    }

}

exports.storeblock = async (req,res,next)=>{
    
    const contract = new web3.eth.Contract(ABIJSON, contractAddress);
    let addr = req.body.addr;
    let nameOnDoc = req.body.name;
    let docnum = req.body.docnum;
    let iphash = req.body.iphash;
    req.session.user = req.body.user;
    console.log(" -------------Here-------------");
    // web3.eth.getBalance(addr, function(err, result) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       console.log(web3.utils.fromWei(result, "ether") + " ETH")
    //     }
    //   })
    console.log(addr);

      contract.methods.AddUser(addr,nameOnDoc,docnum,iphash).send({from:addr,gas: 250000}).then(
        (value)=>{
        console.log("--Here--");
          //console.log(value);
        req.session.user.doc_uploaded = 'true';
        res.send(true);
        }
      ).catch(e => {
        
        console.log(e);
        res.send(e);
    });
    
    

    // contract.methods.viewUser(addr).call().then((resblock)=>{
    //     console.log("Succerssssss");
    //     console.log(resblock);

    // }

    // ).catch((err)=>{
    //     console.log("=======Here===========");
    //     console.log(err);
    // })



}


exports.getDocRequests = (req,res,next)=>{
    if(req.session.isAuth){
    
        return res.render("viewDoc",{abiStr:ABIstring,contractAddr:contractAddress,sess:req.session});
    }else{
        return res.redirect("/");
    }
  
}
exports.getReqDetail = (req,res,next)=>{
    const reqIndex = req.params.reqIndex;
    if(req.session.isAuth){
    
        return res.render("reqDetail",{reqInd:reqIndex,contractAddr:contractAddress,sess:req.session});
    }else{
        return res.redirect("/");
    }
    
}
exports.updtReqDetail = (req,res,next)=>{
    console.log("Request aaya");
    console.log(req.body);
    const contract = new web3.eth.Contract(ABIJSON, contractAddress);
    contract.methods.UpdateRequestStatus(req.body.UserAddress,req.body.RequestIndex,req.body.nameFlag,req.body.numFlag,req.body.ipfsHashFlag,req.body.Overall_Status).send({from:req.body.UserAddress,gas: 250000}).then(
    (value)=>{
        console.log(value);
        res.send(true);
    }
        ).catch((err)=>{
            res.send(false);
        });
}


exports.downloadMeta = (req,res,next)=>{
    res.render("downMeta",{metaLink:"https://metamask.io/download/"});
}
//i have added comment. to check how to publish a branch.