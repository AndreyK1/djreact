pragma solidity ^0.4.25;

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }

contract Sheduler {
    // Public variables of the token
    string public name;
    address owner;

    struct Meeting{
        string passport;
        string info;

    }

    //mapping (string => mapping (string => string)) public meetings;
    mapping (string => Meeting) shedulers;

    /**
     * Constructor function
     */
    function Sheduler(
        string contract_name
    ) public {
        name = contract_name;
        owner = msg.sender;

    }

    modifier ownerOnly {
        require(owner == msg.sender);
        _;
    }

    function getMeetingInfo(string time) public view returns (string, string){
        return (shedulers[time].passport, shedulers[time].info);
    }

     function addMeeting(string time, string passport, string info) public ownerOnly {
        Meeting meet = shedulers[time];
       meet.passport = passport;
       meet.info = info;
        // shedulers[time] = meet;
    }

}

