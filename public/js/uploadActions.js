


const formContainer = document.getElementById('userdocs');


async function uploadfile(user,doctype,docnum,name,file){
    console.log(doctype,docnum,name,file.name);
    
    const fOnIPFS = new Moralis.File(file.name,file);
    await fOnIPFS.saveIPFS();
    console.log(fOnIPFS.ipfs(), fOnIPFS.hash());
    
    user.set("nameOnDoc",name);
    user.set("docNum",docnum);
    user.set("ipfsURL",fOnIPFS.ipfs());
    user.set("doctype",doctype);
    user.set("ipfsHash",fOnIPFS.hash());
    await user.save();
  
    //formContainer.innerHTML= rawFormComponent(user);
    const addr= user.attributes.ethAddress;
    const iphash = fOnIPFS.hash();
    const web3 = await Moralis.enableWeb3();
    $.post("/storeblock",{
      addr :addr,
      name:name,
      docnum:docnum,
      iphash:iphash,
      user:user.attributes

    },function  (data,status){
      
      if(data === true){
        alert("Block Success");
        user.set("doc_uploaded",true);
        user.save().then(()=>{
          window.location.href = "/updoc";
        }).catch((error)=>{
          alert("updating user failed please try again");
          window.location.href = "/";
          console.log(error);
        })
          
        
       
      }
      else{
        alert("Problem in Uploading data, See Console");
        console.log(data);
      }
    })
    
    // storing on ledger
    //   const contractAddress = "0x3b6eBB8D2f693D3Be7Eed9b06636301b2a27653D";
    //   const web3 = await Moralis.enableWeb3();
    //   const contract = new web3.eth.Contract(ABIJSON, contractAddress);
      
      
      
    //   contract.methods.AddUser(addr,name,docnum,iphash).send({from:addr}).then(
    //     (value)=>{
    //       console.log(value);
    //     }
    //   ).catch(e => {
    //     console.log(e);
    // });
  
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
  
 async function docForm(){
    let user = await Moralis.User.current();
    user = await frm(user);
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

  docForm();