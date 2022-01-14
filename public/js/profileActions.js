let user = Moralis.User.current();
const contentContainer = document.getElementById("content");
renderProfile(user);
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
function getAddressTxt(address) {
    return `${address.substr(0, address.length)}`;
  }
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
      
     await Moralis.enableWeb3();
      
     await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account)
    await Moralis.link(account);
    window.location.href = "/profile";
      //console.log(res);
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
      window.location.href = "/profile";
     
    } catch (error) {
      console.error(error);
      alert("Error unlinking address. See console.");
    }
  }