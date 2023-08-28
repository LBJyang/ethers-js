import { Wallet, ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)
console.log(`我的测试钱包地址是:${wallet.address}`)


const networkInfo = await provider.getNetwork()
console.log(`Sepolia的chainId是${networkInfo.chainId}`)

const WETHaddress = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'
const WETHABI = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
    "function approve(address, uint256) public returns (bool)",
    "function deposit() public payable"
]

const WETHContract = new ethers.Contract(WETHaddress,WETHABI,wallet)
/*const tx = await WETHContract.deposit({value:ethers.utils.parseEther("0.02")})
await tx.wait()*/
console.log(`WETH余额:${ethers.utils.formatEther(await WETHContract.balanceOf(wallet.address))}`)
console.log(`ETH余额:${ethers.utils.formatEther(await wallet.getBalance())}`)


