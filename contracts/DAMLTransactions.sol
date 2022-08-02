// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DAMLTransactions {
  struct Transaction {
    string id;
    string value;
  }

  mapping (address => Transaction[]) public transactions;

  function addTransaction(string memory _id, string memory _value) public {
    transactions[msg.sender].push(Transaction(_id, _value));
  }
}
