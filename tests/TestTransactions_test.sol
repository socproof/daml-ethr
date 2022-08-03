// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol";
import "../contracts/Transactions.sol";

contract testSuite is Transactions {
    function beforeEach() public {
        addTransaction("test1");
    }

    function afterEach() public {
        removeTransactionByKey(0);
    }

    function testAddTransaction() public {        
        Assert.equal(getTransactionsByOwner()[0], "test1", "should add value to mapping");
    }

    function testGetLengthByOwner() public {
        Assert.equal(getLengthByOwner(), 1, "should increase key counter");
    }
}
