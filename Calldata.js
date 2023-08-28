import { Wallet, ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')

const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const myWallet = new ethers.Wallet(privateKey,provider)
const myAddress = await myWallet.getAddress()
console.log(`The address of mywallet is:${myAddress}`)
console.log(`The balance of mywallet is:${ethers.utils.formatEther(await myWallet.getBalance())}`)

//addressWETH = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'

const abiWETH = [
    "function deposit() public payable",
    "function balanceOf(address) public view returns(uint)"
]

const addressWETH = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'
const contractWETH = new ethers.Contract(addressWETH,abiWETH,myWallet)

console.group('\n1.获取测试账户中WETH的余额')
const addr = await myWallet.getAddress()
const param1 = contractWETH.interface.encodeFunctionData(
    "balanceOf",
    [addr]
)
console.log(`编码结果:${param1}`)
const tx1 = {
    to: addressWETH,
    data:param1
}
const balanceOfMywallet = await provider.call(tx1)
console.log(`存款前测试账户WETH余额:${balanceOfMywallet}`)
console.groupEnd()

console.group('\n2.向测试账户中存入WETH')
const param2 = contractWETH.interface.encodeFunctionData(
    "deposit"
)
console.log(`编码结果:${param2}`)
const tx2 = {
    to:addressWETH,
    data:param2,
    value:ethers.utils.parseEther('0.01')
}
const receipt = await myWallet.sendTransaction(tx2)
await receipt.wait()
console.log('交易详情：')
console.log(receipt)
const balance_receipt = await contractWETH.balanceOf(addr)
console.log(`存款后WETH的持仓:${ethers.utils.formatEther(balance_receipt)}`)
console.groupEnd()










