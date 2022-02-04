// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  
  uint public last_completed_migration;
  address public ContractOwner;
  
  constructor() public {
        ContractOwner = msg.sender;
    }
  

    struct UserInfo{
		string FullName;
		string DocNum;
		string IpfsHash;
    }

    struct DocRequest{
		address ReqBy;
    string reqName;
    uint DocName;
    uint DocNum;
		uint IpfsHash;
    uint Overall_status;

    }

    struct Org_reqlist{
      address UserAddress;
      uint Index;
    }
  mapping(address => UserInfo[]) UserMap;
  mapping (address => DocRequest[]) DocReqMap;
  mapping (address => Org_reqlist[]) Org_DocReqMap;

  function AddUser(address UserAddress,string memory FullName,string memory DocNum,string memory IpfsHash) public {
        UserMap[UserAddress].push(UserInfo(FullName,DocNum,IpfsHash));
        
    } 


    function ViewDocRequestLength(address UserAddress) public view returns(uint length){
        return DocReqMap[UserAddress].length;
    }


    function ViewOrgRequestLength(address OrgAddress) public view returns(uint length){
        return Org_DocReqMap[OrgAddress].length;
    }



    function viewUser(address UserAddress) public view returns(string memory FullName,string memory DocNum, string memory IpfsHash) {
        UserInfo memory ThisUser = UserMap[UserAddress][0];
        return (ThisUser.FullName, ThisUser.DocNum, ThisUser.IpfsHash);
    }
  


    function AddDocRequest (address UserAddress,address ReqBy, string memory Reqname, uint nameFlag, uint numFlag , uint ipfsHashFlag) public{
      uint len = DocReqMap[UserAddress].length;
      DocReqMap[UserAddress].push(DocRequest(ReqBy,Reqname,nameFlag,numFlag,ipfsHashFlag,0));
      Org_DocReqMap[ReqBy].push(Org_reqlist(UserAddress,len));
    }
 

     function ViewDocRequestHeader(address UserAddress, uint RequestIndex) public view returns(address Reqby,string memory ReqName, uint Overall_Status)
    {
        DocRequest memory ThisDocRequest=DocReqMap[UserAddress][RequestIndex];
        return (ThisDocRequest.ReqBy,ThisDocRequest.reqName,ThisDocRequest.Overall_status);
    }

   
    function ViewDocsOrg (address OrgAddress, uint ReqIndex)public view returns(address UserAddress,uint Index){
        Org_reqlist memory Org_req = Org_DocReqMap[OrgAddress][ReqIndex];
        return (Org_req.UserAddress, Org_req.Index);
    }

    function ViewReqExists (address OrgAddress,address UserAddress) public view returns (bool exists){
      bool res = false;
      for (uint i = 0; i < Org_DocReqMap[OrgAddress].length ; i++){
        
        if(Org_DocReqMap[OrgAddress][i].UserAddress == UserAddress){
          return (true);
        }
      }
      return (res);
    }

    function viewDocRequest (address UserAddress,uint ReqIndex) public view returns (address ReqBy, string memory Reqname, uint nameFlag, uint numFlag , uint ipfsHashFlag,uint Overall_status){
      DocRequest memory ThisRequest = DocReqMap[UserAddress][ReqIndex];
      return (ThisRequest.ReqBy,ThisRequest.reqName,ThisRequest.DocName,ThisRequest.DocNum,ThisRequest.IpfsHash,ThisRequest.Overall_status);

    }



     function UpdateRequestStatus(address UserAddress, uint RequestIndex, uint nameFlag, uint numFlag, uint ipfsHashFlag ,uint Overall_Status) public {
    
    DocReqMap[UserAddress][RequestIndex].DocName=nameFlag;
		DocReqMap[UserAddress][RequestIndex].DocNum=numFlag;
		DocReqMap[UserAddress][RequestIndex].IpfsHash=ipfsHashFlag;
		DocReqMap[UserAddress][RequestIndex].Overall_status=Overall_Status;
		
    }
  
  function setCompleted(uint completed) public {
    last_completed_migration = completed;
  } 


}
