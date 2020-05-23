const express=require('express');
const app=express();
var cors=require('cors')
var web3=require('web3')
var mongo=require('mongoose')
const dotenv = require('dotenv');
var bodyparser=require('body-parser')
dotenv.config()
var corsOptions = {
    
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204      
}
app.use(cors(corsOptions));
//block_chain
var web3=new web3('http://127.0.0.1:7545');
var address='0x17AF61d2dFd5c4492a9d31CEAdABDD16d5D763B6';
var abi=[
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "companies",
    "outputs": [
      {
        "internalType": "string",
        "name": "cname",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "exist",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "pass",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "distributors",
    "outputs": [
      {
        "internalType": "string",
        "name": "distname",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "productid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "distid",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "string",
        "name": "pname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "compid",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "retailers",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "productid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "retailerid",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pass",
        "type": "string"
      }
    ],
    "name": "createCompany",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_pass",
        "type": "string"
      }
    ],
    "name": "displayComp",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_pname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_compid",
        "type": "string"
      }
    ],
    "name": "addProduct",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_prodid",
        "type": "uint256"
      }
    ],
    "name": "verifyDistributor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_licenseno",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_distname",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_productid",
        "type": "uint256"
      }
    ],
    "name": "addDistributorDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productid",
        "type": "uint256"
      }
    ],
    "name": "verifyRetailer",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_retailerlicenseno",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_productid",
        "type": "uint256"
      }
    ],
    "name": "addRetailerDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_prodid",
        "type": "uint256"
      }
    ],
    "name": "verificationPortal",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
var contracts=new web3.eth.Contract(abi,address);
console.log(contracts)
//adding company..
contracts.methods.createCompany('nike','nike123').call().then(res=>{
  console.log(res)
})
//mongodb
mongo.connect('mongodb://127.0.0.1:27017/ProductAuthentication',{ useUnifiedTopology: true,useNewUrlParser: true },function(err){
    if(!err){
        console.log('db connected')
    }
    else{
        console.log('Unable to connect to db')
    }
});
var CompanyScheme=new mongo.Schema({
  c_name:String,
  c_id:String,
  contacts:{
    email:String,
    phno:String
  },
  c_location:String,
  address:String,
  c_type:String,
  password:String,
  dis_id:String,
  ret_id:String,
  data:Date 
});
var DistributerScheme=new mongo.Schema({
  d_name:String,
  dis_id:String,
  contacts:{
    email:String,
    phno:String
  },
  d_location:String,
  address:String,
  data:Date 
});
var RetailerScheme=new mongo.Schema({
  r_name:String,
  ret_id:String,
  contacts:{
    email:String,
    phno:String
  },
  r_location:String,
  address:String,
  data:Date 
});
var ProductScheme=new mongo.Schema({
  name:String,
  p_id:String,
  c_id:String,
  p_image:String,
  p_desc:String,
  mrp:String,
  data:Date 
});
var Company=mongo.model('Company',CompanyScheme);
var Product=mongo.model('Product',ProductScheme);
var Distributer=mongo.model('Distributer',DistributerScheme);
var Retailer=mongo.model('Retailer',RetailerScheme);

app.post('/signup',bodyparser.json(),(req,res)=>{
  console.log(req.body)
  return res.send({
    status:true
  })
})
app.post('/login',bodyparser.json(),(req,res)=>{
  console.log(req.body)
  return res.send({
    status:true,
    _id:req.body._id,
    d_id:"11000",
    r_id:"11545"
  })
})
app.listen(3000,(err)=>{
    if(!err){
        console.log("server running...")
    }
})