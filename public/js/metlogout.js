Moralis.initialize("mCSwkSAJpil0vP4GWCQskslXRRXJRRzD3nWh8FV9"); // APP ID
Moralis.serverURL = "https://k95vzhhakuri.moralisweb3.com:2053/server";


async function logOut(){
    let res = await Moralis.User.logOut();
    console.log(res);
    $.post("/logout",
      {
        result:res,
      },
      function(data,status){
        if (status == "success"){
          console.log("Success");
          window.location.href = "/";
      }
      }
    );
  }