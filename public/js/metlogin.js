Moralis.initialize("mCSwkSAJpil0vP4GWCQskslXRRXJRRzD3nWh8FV9"); // APP ID
Moralis.serverURL = "https://k95vzhhakuri.moralisweb3.com:2053/server";

async function loginWithMetaMask() {
     let  user = await Moralis.Web3.authenticate();
    user = Moralis.User.current();
    console.log(user.attributes);
    $.post("/meta",
    {
      user:user.attributes,
      otherData: user,
    },function(data,status){
        if (status == "success"){
            window.location.href = "/";
        }
    });
  }
async function loginwithEmPass(){
  let em = document.getElementById("email").value;
  let pass= document.getElementById("pass").value;
  console.log(em,pass);
  let user= await Moralis.User.logIn(em, pass);

    $.post("/empass",
    {
      user:user.attributes,
      otherData:user,

    },function(data,status){
      if (status == "success"){
          window.location.href = "/";
      }
  });
    


}



