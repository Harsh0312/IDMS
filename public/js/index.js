//duty bottom spoil stadium before route return trial ill dial voice flock(secret backup)

Moralis.initialize("mCSwkSAJpil0vP4GWCQskslXRRXJRRzD3nWh8FV9"); // APP ID
Moralis.serverURL = "https://k95vzhhakuri.moralisweb3.com:2053/server";


const appHeaderContainer = document.getElementById("app-header-btns");
const contentContainer = document.getElementById("content");
const formContainer = document.getElementById('userdocs');
let ABIstring = '[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "UserAddress", "type": "address" }, { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DocNum", "type": "string" }, { "internalType": "string", "name": "IpfsHash", "type": "string" } ], "name": "AddUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ContractOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "last_completed_migration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "completed", "type": "uint256" } ], "name": "setCompleted", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]';
console.log(ABIstring);
ABIstring = ABIstring.replace(/'/g , "\"");
let ABIJSON = JSON.parse(ABIstring);
//let user = Moralis.User.current();

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
			UserAddress=web3.eth.coinbase;
        } catch (error) {
            alert("User denied account access...");
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
		UserAddress=web3.eth.coinbase;
    }
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function logOut() {
  await Moralis.User.logOut();
  formContainer.innerHTML="";
  appHeaderContainer.innerHTML=" ";
  render();
  console.log("logged out. User:", Moralis.User.current());
}

async function loginWithMetaMask() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.Web3.authenticate();
  }
  console.log(user);

  render();
}

async function loginWithEmail(isSignUp) {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (!email || !pass) {
    alert("please provide both email and password");
    return;
  }

  try {
    if (isSignUp) {
      // when using email for username
      // assign it to the username property
      const user = new Moralis.User();
      user.set("username", email);
      user.set("password", pass);

      await user.signUp();
    } else {
      await Moralis.User.logIn(email, pass);
    }

    render();
  } catch (error) {
    console.log(error);
    alert("invalid username or password");
  }
}

function listenForAccountChange() {
  Moralis.Web3.onAccountsChanged(async function (accounts) {
    console.log("account changed:", accounts);
    const user = Moralis.User.current();
    if (!user || !accounts.length) {
      // not logged in
      return;
    }

    try {
      const address = accounts[0];
      if (addressAlreadyLinked(user, address)) {
        console.log(`address ${getAddressTxt(address)} already linked`);
        return;
      }

      const confirmed = confirm("Link this address to your account?");
      if (confirmed) {
        await Moralis.Web3.link(address);
        alert("Address added!");
        render();
      }
    } catch (error) {
      if (error.message.includes("already used")) {
        alert("That address is already linked to another profile!");
      } else {
        console.error(error);
        alert("Error while linking. See the console.");
      }
    }
  });
}

function addressAlreadyLinked(user, address) {
  return (
    user &&
    address &&
    user.attributes.accounts &&
    user.attributes.accounts.includes(address)
  );
}

async function onUnlinkAddress(event) {
  event.preventDefault();
  try {
    const address = event.target.dataset.addr;
    console.log("onUnlinkAddress:: addr:", address);

    const confirmed = confirm("Are you sure you want to remove this address?");
    if (!confirmed) {
      return;
    }

    await Moralis.Web3.unlink(address);
    alert("Address removed from profile!");
    render();
  } catch (error) {
    console.error(error);
    alert("Error unlinking address. See console.");
  }
}

// Frontend Components  

function renderHeader() {
  const user = Moralis.User.current();
  if (!user) {
    return;
  }
  // show the logout, refresh buttons if user logged in
  appHeaderContainer.innerHTML = `
      <button id="btn-logout">Logout</button>
    `;
  document.getElementById("btn-logout").onclick = logOut;
  
}

function buildLoginComponent(isSignUp = false) {
  const btnSignUp = isSignUp
    ? ""
    : `<button type="button" id="btn-login-email-signup">Sign Up With Email</button>`;

  return `
    <div class="container login">
      <button id="btn-login-metamask">Login/Signup With MetaMask</button>
      <hr/>
      <div id="frm-login">
        <div class="form-group">
          <label for="email">User/Email</label>
          <input type="text" id="email" name="email"/>
        </div>
        <div class="form-group">
          <label for="pass">Password</label>
          <input type="password" id="pass" name="pass"/>
        </div>
        <button type="button" id="btn-login-email" type="button">Submit</button>
        ${btnSignUp}
      </div>
    </div>
  `;
}

function renderLogin(isSignUp) {
  contentContainer.innerHTML = buildLoginComponent(isSignUp);
  document.getElementById("btn-login-metamask").onclick = loginWithMetaMask;
  document.getElementById("btn-login-email").onclick = function () {
    loginWithEmail(isSignUp);
  };
  if (!isSignUp) {
    document.getElementById("btn-login-email-signup").onclick = function () {
      loginWithEmail(true);
    };
  }
}

function getAddressTxt(address) {
  return `${address.substr(0, address.length)}`;
}
/*<div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            cols="50"
            maxlength="200" >${user.attributes.bio || ""}</textarea>
        </div>*/
function buildProfileComponent(user) {
  return `
    <div class="container">
      <div>
        <div class="form-group">
          <label for="name">Username</label>
          <input type="text" id="name" value="${
            user.attributes.username || ""
          }"/>
        </div>
  
        <div id="profile-set-pass">
          ${buildSetPassComponent()}
        </div>
        ${buildAddrListComponent(user)}
        <button class="mt" type="button" id="btn-profile-save">Save Profile</button>
      </div>
    </div>
  `;
}

function buildAddrListComponent(user) {
  // add each address to the list
  let addressItems = "";
  if (user.attributes.accounts && user.attributes.accounts.length) {
    addressItems = user.attributes.accounts
      .map(function (account) {
        return `<li>
          <button class="btn-addr btn-remove" type="button" data-addr="${account}">X</button>
          ${getAddressTxt(account)}
        </li>`;
      })
      .join("");
  } else {
    // no linked addreses, add button to link new address
    addressItems = `
    <li>
      <button class="btn-addr" type="button" id="btn-add-addr">+</button>
      Link
    </li>
    `;
  }

  return `
    <div>
      <h3>Linked Addresses</h3>
      <ul>
        ${addressItems}
      </ul>
    </div>
  `;
}

function renderProfile(user) {

  contentContainer.innerHTML = buildProfileComponent(user);
  document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
  document.getElementById("btn-profile-save").onclick = onSaveProfile;
  document.querySelectorAll(".btn-remove").forEach(function (button) {
    button.onclick = onUnlinkAddress;
  });

  const btnAddAddress = document.getElementById("btn-add-addr");
  if (btnAddAddress) {
    btnAddAddress.onclick = onAddAddress;
  }
}


async function uploadfile(user,doctype,docnum,name,file){
  console.log(doctype,docnum,name,file.name);
  
  const fOnIPFS = new Moralis.File(file.name,file);
  await fOnIPFS.saveIPFS();
  console.log(fOnIPFS.ipfs(), fOnIPFS.hash());
  user.set("doc_uploaded",true);
  user.set("nameOnDoc",name);
  user.set("docNum",docnum);
  user.set("ipfsURL",fOnIPFS.ipfs());
  user.set("doctype",doctype);
  user.set("ipfsHash",fOnIPFS.hash());
  await user.save();

  formContainer.innerHTML= rawFormComponent(user);
  
  // storing on ledger
    const contractAddress = "0x3f251F51C8ff62cA780d268B1335620575fBEE7c";
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(ABIJSON, contractAddress);
    
    const addr= await web3.eth.getCoinbase();
    const iphash = fOnIPFS.hash();
    contract.methods.AddUser(addr,name,docnum,iphash).send({from:addr}).then(
      (value)=>{
        console.log(value);
      }
    ).catch(e => {
      console.log(e);
  });

}

function rawFormComponent(user){
  frm(user).then((value)=> user = value);
  if(user.attributes.doc_uploaded){
    
    const doctype = user.attributes.doctype;
    console.log(doctype);
    const nameOnDoc = user.attributes.nameOnDoc;
    const docNum = user.attributes.docNum;
    const fileLoc = user.attributes.ipfsURL; 
    
    return`
    <div class = "docform">
      <div class="form-group">
             
        <label for="docType">Choose document:</label>
        <input type = "text" id="doct" value="${doctype}" readonly>
      </div>
      <br>
      <div class="form-group">
        <label for="namefield">Name:</label>
        <input type = "text"  id="namefield" name="holdersname" value = "${nameOnDoc}" readonly>
      </div>
      
      <br>

      <div class="form-group">
      <label for="uniquenumfield">Doc. No.</label>
      <input type = "text"  id="uniquenumfield" name="uniqueId" placeholder="Unique Document Number"  value = "${docNum}" readonly>
      </div>
      <br>
      
      <div class="form-group">
      <label for="docfile">File</label>
      <a href="${fileLoc}" target="_blank">Your Document</a>
      </div>
      <br>
    </div>
  `;

  }
  else{

    return`
      <div class = "docform">
        <div class="form-group">
               
          <label for="docType">Choose document:</label>
          <select id="docType" name="docType" size="3">
            <option value="Pan" selected>Pan</option>
            <option value="Aadhar">Aadhar</option>
          </select>
        </div>
        <br>
        <div class="form-group">
          <label for="namefield">Name:</label>
          <input type = "text"  id="namefield" name="holdersname" placeholder="Full Name as per doc">
        </div>
        
        <br>

        <div class="form-group">
        <label for="uniquenumfield">Doc. No.</label>
        <input type = "text"  id="uniquenumfield" name="uniqueId" placeholder="Unique Document Number">
        </div>
        <br>
        
        <div class="form-group">
        <label for="docfile">File</label>
        <input type = "file"  id="docfile" name="docfile">
        </div>
        <br>
        
        <button type="button" id="btn-upload-file" type="button">Upload</button>
      </div>
    `;
  }
}

const frm = async (user)=>{
  const query = new Moralis.Query("User");
  //const qres = await query.find();
  
  query.equalTo("ethAddress",user.attributes.ethAddress);
  const qres = await query.first();

   
  
  return qres;
} 

function docForm(user){
  if(user){
    
      formContainer.innerHTML= rawFormComponent(user); 
      if(!user.attributes.doc_uploaded){
      document.getElementById("btn-upload-file").onclick = function(){ 
      
        uploadfile(user,document.getElementById("docType").value,document.getElementById("uniquenumfield").value,document.getElementById("namefield").value,document.getElementById("docfile").files[0])
      //updating the form component after uploading the file
      }
      
    }
  }
}










// Password Functions

function onSetPassword(event) {
  const containerSetPass = document.getElementById("profile-set-pass");
  containerSetPass.innerHTML = buildSetPassComponent(true);
  document.getElementById("btn-save-pass").onclick = onSaveNewPassword;
  document.getElementById("btn-cancel-pass").onclick = onCancelNewPassword;
}

function buildSetPassComponent(showForm = false) {
  if (!showForm) {
    return `
      <p>Setting a password allows login via username</p>
      <button type="button" id="btn-profile-set-pass">Change Password</button>
    `;
  }

  return `
    <div class="set-password">
      <div class="form-group">
        <label for="pass">New Password</label>
        <input type="password" id="pass" autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="confirm-pass">Confirm</label>
        <input type="password" id="confirm-pass" autocomplete="off" />
      </div>
      <button type="button" id="btn-save-pass">Save Password</button>
      <button type="button" id="btn-cancel-pass">Cancel</button>
    </div>
  `;
}

async function onSaveNewPassword(event) {
  event.preventDefault();
  const user = Moralis.User.current();

  try {
    // make sure new and confirmed password the same
    const newPass = document.getElementById("pass").value;
    const confirmPass = document.getElementById("confirm-pass").value;

    if (newPass !== confirmPass) {
      alert("passwords not equal");
      return;
    }

    user.setPassword(newPass);
    await user.save();
    alert("Password updated successfully!");

    render();
  } catch (error) {
    console.error(error);
    alert("Error while saving new password. See the console");
  }
}

function onCancelNewPassword() {
  const containerSetPass = document.getElementById("profile-set-pass");
  containerSetPass.innerHTML = buildSetPassComponent();
  document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
}

async function onAddAddress() {
  try {
    
    await Moralis.Web3.enable();
  } catch (error) {
    console.error(error);
    alert("Error while linking new address. See console");
  }
}

async function onSaveProfile(event) {
  event.preventDefault();
  const user = Moralis.User.current();

  try {
    // get values from the form
    const username = document.getElementById("name").value;
    // update user object
    user.setUsername(username); // built in
    await user.save();
    alert("saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Error while saving. See the console.");
  }
}




function render() {
  const user = Moralis.User.current();
  renderHeader();
  if (user) {
    renderProfile(user);
    docForm(user);
  } else {
    renderLogin();
  }
}

function init() {
  listenForAccountChange();

  // render on page load
  render();
}

init();