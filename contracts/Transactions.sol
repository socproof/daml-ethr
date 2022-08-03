// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Transactions {
  address private _owner;

  mapping (address => string[]) public transactions;

  constructor() {
    _owner = msg.sender;
  }

  function addTransaction(string memory _value) public {
    transactions[_owner].push(_value);
  }

  function getTransactionsByOwner() public view returns(string[] memory) {
    return transactions[_owner];
  }

  function getLengthByOwner() public view returns(uint) {
    return getTransactionsByOwner().length;
  }

  function removeTransactionByKey(uint _index) public {    
    uint length = getLengthByOwner();
    uint counter = 0;
    string[] memory transactionByOwnerArray = getTransactionsByOwner();
    string[] memory tmpArray = new string[](length - 1);

    require(_index < length, "index out of bound");   

    for (uint i = 0; i < length; i++) {
        if(i != _index) {
          tmpArray[counter] = transactionByOwnerArray[i];     
          counter++;     
        }
    }

    transactions[_owner] = tmpArray;
  }
}
