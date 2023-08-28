import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)

const ContractAddress = '0xe02EcDe5513306F63DbC767A11d2FaDB1C24f5BC'
const ContractABI = [
    "constructor(string memory _name, string memory _symbol, address _signer)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function mint(address _account, uint256 _tokenId, bytes memory _signature) external",
    "function ownerOf(uint256) view returns (address)",
    "function balanceOf(address) view returns (uint256)",
    "function getMessageHash(address,uint256) public pure returns(bytes32)"
]
const ContractIns = new ethers.Contract(ContractAddress,ContractABI,wallet)

console.log(`合约名称是:${await ContractIns.name()}`)
console.log(`合约符号是:${await ContractIns.symbol()}`)

const account = '0xEcD31d0Af701100c42175E7ee888e6f449B6b546'
const tokenId = '0'
const msgHash = await ContractIns.getMessageHash(account,tokenId)
const singer = await wallet.signMessage(ethers.utils.arrayify(msgHash))
console.log(singer)

const tx = await ContractIns.mint(account,tokenId,singer)
await tx.wait()
console.log(`mint成功，地址${account} 的NFT余额: ${await ContractIns.balanceOf(account)}\n`)












