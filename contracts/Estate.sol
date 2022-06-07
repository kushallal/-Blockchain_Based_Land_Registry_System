pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Estate {
    address contractOwner;

    constructor() public {
        contractOwner = msg.sender;
    }

    struct Landreg {
        address oAddr;
        uint256 id;
        uint256 area;
        string district;
        string vdcMunicipality;
        uint256 wardNo;
        uint256 kittaNo;
        bool isLandVerified;
    }

    struct User {
        address id;
        string name;
        string citizenshipNo;
        string email;
        bool isUserVerified;
    }

    struct Admin {
        uint256 id;
        address addr;
        string name;
        string district;
        string vdcMunicipality;
    }

    uint256 adminCount;
    uint256 public userCount;
    uint256 public landsCount;

    mapping(address => Admin) public AdminMapping;
    mapping(uint256 => address[]) allAdminList;
    mapping(address => bool) RegisteredAdminMapping;
    mapping(address => User) public UserMapping;
    mapping(uint256 => address) AllUsers;
    mapping(uint256 => address[]) allUsersList;
    mapping(address => bool) RegisteredUserMapping;
    mapping(uint256 => address[]) UnverifiedUsersList; //new for UnverfdUser
    //mapping(uint256 => address[]) RegisteresUserList; //new for UnverfddUser
    mapping(address => uint256[]) MyLands;
    mapping(uint256 => Landreg) public lands;
    mapping(uint256 => uint256[]) allLandList;
    mapping(uint256 => uint256[]) UnverifiedLandList; //new for UnverfdLand
    mapping(address => uint256[]) MyVerifiedLandList;

    modifier onlyOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    function getter() public view returns (address) {
        return contractOwner;
    }

    function isContractOwner(address _addr) public view returns (bool) {
        if (_addr == contractOwner) return true;
        else return false;
    }

    function changeContractOwner(address _addr) public onlyOwner {
        contractOwner = _addr;
    }

    //-----------------------------------------------Admin-----------------------------------------------

    function addAdmin(
        address _addr,
        string memory _name,
        string memory _district,
        string memory _vdcMunicipality
    ) public onlyOwner {
        require(
            !RegisteredAdminMapping[_addr],
            "Admin with this address already exist."
        );
        //is it good to make contract owner the admin?
        adminCount++;
        RegisteredAdminMapping[_addr] = true;
        allAdminList[1].push(_addr);
        AdminMapping[_addr] = Admin({
            id: adminCount,
            addr: _addr,
            name: _name,
            district: _district,
            vdcMunicipality: _vdcMunicipality
        });
    }

    function ReturnAllAdminList() public view returns (address[] memory) {
        return allAdminList[1];
    }

    function isAdmin(address _addr) public view returns (bool) {
        if (RegisteredAdminMapping[_addr]) return true;
        else return false;
    }

    function removeAdmin(address _addr) public onlyOwner {
        require(
            RegisteredAdminMapping[_addr],
            "No admin with this address exists."
        );
        RegisteredAdminMapping[_addr] = false;

        uint256 l = allAdminList[1].length;
        for (uint256 i = 0; i < l; i++) {
            if (allAdminList[1][i] == _addr) {
                allAdminList[1][i] = allAdminList[1][l - 1];
                allAdminList[1].pop();
                break;
            }
        }
    }

    function returnAdmin(address _addr)
        public
        view
        onlyOwner
        returns (
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            AdminMapping[_addr].id,
            AdminMapping[_addr].name,
            AdminMapping[_addr].district,
            AdminMapping[_addr].vdcMunicipality
        );
    }

    function viewAdminDetails(address _addr)
        public
        view
        returns (Admin memory)
    {
        return AdminMapping[_addr];
    }

    //-----------------------------------------------User-----------------------------------------------

    function isUserRegistered(address _addr) public view returns (bool) {
        if (RegisteredUserMapping[_addr]) return true;
        else return false;
    }

    function registerUser(
        address _addr,
        string memory _name,
        string memory _citizenshipNo,
        string memory _email
    ) public {
        require(
            !RegisteredUserMapping[msg.sender] &&
                !RegisteredAdminMapping[msg.sender] &&
                (contractOwner != msg.sender)
        );

        RegisteredUserMapping[_addr] = true;
        userCount++;
        allUsersList[1].push(_addr);
        UnverifiedUsersList[1].push(_addr); //new for UnverfdUser
        AllUsers[userCount] = _addr;
        UserMapping[_addr] = User({
            id: _addr,
            name: _name,
            citizenshipNo: _citizenshipNo,
            email: _email,
            isUserVerified: false
        });
        //emit Registration(msg.sender);
    }

    function verifyUser(address _userId) public {
        require(isAdmin(msg.sender));
        UserMapping[_userId].isUserVerified = true;
        //for removing verified users from unverified list
        uint256 l = UnverifiedUsersList[1].length;
        for (uint256 i = 0; i < l; i++) {
            if (UnverifiedUsersList[1][i] == _userId) {
                UnverifiedUsersList[1][i] = UnverifiedUsersList[1][l - 1];
                UnverifiedUsersList[1].pop();
                break;
            }
        }
    }

    function isUserVerified(address id) public view returns (bool) {
        return UserMapping[id].isUserVerified;
    }

    function ReturnAllUserList() public view returns (address[] memory) {
        return allUsersList[1];
    }

    //unverifiedUserlist
    function ReturnUnverifiedUsersList()
        public
        view
        returns (address[] memory)
    {
        return UnverifiedUsersList[1];
    }

    function viewUserDetails(address _addr) public view returns (User memory) {
        return UserMapping[_addr];
    }

    //-----------------------------------------------Land-----------------------------------------------
    function addLand(
        uint256 _area,
        string memory _district,
        string memory _vdcMunicipality,
        uint256 _wardNo,
        uint256 _kittaNo
    ) public {
        require(isUserVerified(msg.sender));
        address _addr = msg.sender;
        landsCount++;
        lands[landsCount] = Landreg({
            oAddr: _addr,
            id: landsCount,
            area: _area,
            district: _district,
            vdcMunicipality: _vdcMunicipality,
            wardNo: _wardNo,
            kittaNo: _kittaNo,
            isLandVerified: false
        });
        MyLands[msg.sender].push(landsCount);
        allLandList[1].push(landsCount);
        UnverifiedLandList[1].push(landsCount);
        // emit AddingLand(landsCount);
    }

    function ReturnAllLandList() public view returns (uint256[] memory) {
        return allLandList[1];
    }

    function verifyLand(uint256 _id) public {
        require(isAdmin(msg.sender));
        lands[_id].isLandVerified = true;
        MyVerifiedLandList[lands[_id].oAddr].push(_id);
        //for removing verified Land from UnverifiedLandList
        uint256 l = UnverifiedLandList[1].length;
        for (uint256 i = 0; i < l; i++) {
            if (UnverifiedLandList[1][i] == _id) {
                UnverifiedLandList[1][i] = UnverifiedLandList[1][l - 1];
                UnverifiedLandList[1].pop();

                break;
            }
        }
    }

    //UnverifiedLandList
    function ReturnUnverifiedLandList() public view returns (uint256[] memory) {
        return UnverifiedLandList[1];
    }

    function isLandVerified(uint256 id) public view returns (bool) {
        return lands[id].isLandVerified;
    }

    function myVerifiedLands() public view returns (uint256[] memory) {
        return MyVerifiedLandList[msg.sender];
    }

    function myAllLands(address id) public view returns (uint256[] memory) {
        return MyLands[id];
    }

    function viewLandDetails(uint256 _id) public view returns (Landreg memory) {
        return lands[_id];
    }
}
