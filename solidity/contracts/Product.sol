pragma solidity >=0.4.21 <0.7.0;


contract Company {
    //Structure of company
    struct TheCompany {
        string cname; //Name of the Company
        address account; //Account address for the Company
        uint exist; //Boolean Value to check the Existence of Company
        bytes32 pass; //Password/ID of the company
    }

    //to store the set of companies
    mapping(address => TheCompany) public companies;

    //to ensure that a account can story only one company details
    modifier isAdd(address _add) {
        require(companies[_add].exist != 1,"Company Already Added");
        _;
    }

    //to add company details
    function createCompany(string memory _name, string memory _pass)
        public
        isAdd(msg.sender)
    {
        bytes32 val = keccak256(abi.encode(_pass)); //Here we will store the hash of Company ID/Password
        companies[msg.sender] = TheCompany(_name, msg.sender, 1, val); //Adding the Company
    }

    //structure for product
    struct Product {
        string pname; //Name of the Product
        string compid; //The ID of the Company to which it belongs
        uint id; //The Unique ID of the Product (Hash of Product Name)
    }

    //to ensure that entered company id is correct
    modifier isComp(string memory _p) {
        require(companies[msg.sender].pass == keccak256(abi.encode(_p)),"Invalid Company ID");
        _;
    }

    //to authenticate using Company ID while adding product
    function displayComp(string memory _pass)
        public view
        isComp(_pass)
        returns (string memory)
    {
        return _pass; //Return Company ID
    }

    //to store the set of product details
    mapping(uint => Product) public products;

    //to add the product details (can only be used once authenticated(displayComp))
    function addProduct(string memory _pname, string memory _compid)
        public
        returns (uint)
    {
        bytes32 val = keccak256(abi.encode(_pname)); //Obtaining the Hash of Product Name(_pname)
        products[uint(val)] = Product(
            _pname,
            _compid,
            uint(val) //Storing the Hash in Integer form as Product ID
        );
        return uint(val); //Return the Integer form of Product ID(Hash)
    }

    //to ensure that entered product id is correct
    modifier isProd(uint _id) {
        require(
            products[_id].id == _id,"Invalid Product ID"
        );
        _;
    }

    //to authenticate using Product ID while adding Distributor details
    function verifyDistributor(uint _prodid)
        public view
        isProd(_prodid)
        returns (uint,string memory)
    {
        return (products[_prodid].id,products[_prodid].compid); //Return the Product ID and Company ID
    }

    //Structure for Distributor
    struct Distributor {
        string distname; //Name of the Distributor
        uint productid; //The Product ID
        string distid; //The License Number of Distributor
    }

    //to store set of distributor details
    mapping(uint => Distributor) public distributors;

    //to add distributor details (can only be used once authenticated(verifyDistributor))
    function addDistributorDetails(string memory _licenseno,string memory _distname, uint _productid)
        public
        returns (string memory)
    {
        distributors[_productid] = Distributor(_distname,_productid, _licenseno);
        return 'Distributor Details Added Successfully';
    }

    //to verify that entered Product id is correct
    modifier isDist(uint _prodid) {
        require(distributors[_prodid].productid == _prodid,"Invalid Distributor");
        _;
    }

    //to authenticate using Product ID while adding Retailer details
    function verifyRetailer(uint _productid)
        public view
        isDist(_productid)
        returns (string memory,string memory,uint)
    {
        (uint prodid,string memory compid) = verifyDistributor(_productid);
        return (compid,distributors[_productid].distid,prodid); //Return Company ID, Distributors License number and Product ID
    }

    //Structure for Retailer
    struct Retailer {
        string name; //Name of the Retailer
        uint productid; //The Product ID
        string retailerid; //The Retailers License Number
    }

    //to store set of Retailer details
    mapping(uint => Retailer) public retailers;

    //to add Retailer details (can only be used once authenticated(verifyRetailer))
    function addRetailerDetails(string memory _name,string memory _retailerlicenseno, uint _productid)
        public
        returns (string memory)
    {
        retailers[_productid] = Retailer(_name, _productid,_retailerlicenseno);
        return "Retailer Details Added Successfully";
    }

    //to verify whether entered Product id is correct
    modifier isRet(uint _pass) {
        require(retailers[_pass].productid == _pass,"Invalid Retailer");
        _;
    }

    //to authenticate the Product Using Product ID at User Side
    function verificationPortal(uint _prodid) public view isRet(_prodid) returns (string memory,string memory,string memory,uint,bool) {
        (string memory compid,string memory distriID,uint produID) = verifyRetailer(_prodid);
        return (compid,retailers[_prodid].retailerid,distriID,produID,true); /*Return the Company ID,Retailer's License Number,
         Distributor's License Number, Product ID and True(indicating that Product Exist)*/
    }
}
