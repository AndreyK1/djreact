pragma solidity ^0.4.16;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }

contract Meetings {
    // Public variables of the token
    string public name;
    address owner;

    //mapping (string => mapping (string => string)) public meetings;
    mapping (string => string) meetings;

    /**
     * Constructor function
     */
    function Meetings(
        string contract_name
    ) public {
        name = contract_name;
        owner = msg.sender;

    }

    modifier ownerOnly {
        require(owner == msg.sender);
        _;
    }

    function getMeetingInfo(string passport) public view returns (string){
        return meetings[passport];
    }

     function addMeeting(string passport, string info) public ownerOnly {
        meetings[passport] = info;
    }

}