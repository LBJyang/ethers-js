import { ethers } from "ethers";

/*const iface = new ethers.utils.Interface([
  "function transfer(address,uint256) public returns (bool)", // 注意 uint 改为 uint256
]);

const functionSignature = `transfer(address,uint256)`;
const selector = iface.getSighash(functionSignature);

console.log(`函数选择器是${selector}`);*/

const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const vanityAddressPrivateKey = '0x6daf13e101a07cb1084233f92bc4279bb973d7ce098fb663d99e142974a42d07'
const MyVanityWallet = new ethers.Wallet(vanityAddressPrivateKey, provider)
const MyVanityAddress = MyVanityWallet.address
console.log(`My VanityAddress is ${MyVanityAddress}`)
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)
const myAddress = await wallet.getAddress()
console.log(`My Normal Address is ${myAddress}`)
console.log(`Balance of my normal wallet is ${ethers.utils.formatEther(await provider.getBalance(myAddress))}`)
console.log(`Balance of my vanity wallet is ${ethers.utils.formatEther(await provider.getBalance(MyVanityAddress))}`)

/*const tx = {
  to:MyVanityAddress,
  value:ethers.utils.parseEther('1')
}
const receipt = await wallet.sendTransaction(tx)
await receipt.wait()
console.log(`回执内容:${JSON.stringify(receipt,null,2)}`)

console.log(`Balance of my normal wallet is ${ethers.utils.formatEther(await provider.getBalance(myAddress))}`)
console.log(`Balance of my vanity wallet is ${ethers.utils.formatEther(await provider.getBalance(MyVanityAddress))}`)*/

const WETHaddress = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'
const WETHABI = [
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
  "function approve(address, uint256) public returns (bool)",
  "function deposit() public payable"
]
const WETHContract = new ethers.Contract(WETHaddress, WETHABI, wallet)
console.log(`WETH Balance of my normal wallet:${ethers.utils.formatEther(await WETHContract.balanceOf(myAddress))}`)
console.log(`WETH Balance of my vanity wallet:${ethers.utils.formatEther(await WETHContract.balanceOf(MyVanityAddress))}`)

const tx1 = await WETHContract.transfer(MyVanityAddress,ethers.utils.parseEther('0.025'))
await tx1.wait()
console.log(`WETH Balance of my normal wallet:${ethers.utils.formatEther(await WETHContract.balanceOf(myAddress))}`)
console.log(`WETH Balance of my vanity wallet:${ethers.utils.formatEther(await WETHContract.balanceOf(MyVanityAddress))}`)

