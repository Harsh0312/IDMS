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
    window.location.href = "/downloadMetamask";
}