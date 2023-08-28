import {ethers} from "ethers"

const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')

const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey,provider)
const addr = await wallet.getAddress()
console.log(`Your address of test wallet is ${addr}`)
console.log(`The private of wallet is ${wallet.privateKey}`)


const addressWETH = '0xaF951F3dFc3622cfE302Fc96C4b7Bc385A777110'

const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
]

const contractWriteWETH = new ethers.Contract(addressWETH,abiWETH,wallet)

console.log('\n1. get balance of ETH&WETH')
const balanceETH = await provider.getBalance(addr)
const balanceWETH = await contractWriteWETH.balanceOf(addr)
console.log(`the balance of ETH before deposit is ${ethers.utils.formatEther(balanceETH)}\n`)
console.log(`the balance of WETH before deposit is ${ethers.utils.formatEther(balanceWETH)}\n`)

console.log("\n2. 调用desposit()函数，存入0.001 ETH")
const tx = await contractWriteWETH.deposit({value:ethers.utils.parseEther('0.001')})
await tx.wait()
const balanceAfterDeposit = await contractWriteWETH.balanceOf(addr)
console.log(`Balance after deposit is ${ethers.utils.formatEther(balanceAfterDeposit)}`)

console.log("\n3. 调用transfer()函数，给vitalik转账0.001 WETH")
const tx1 = await contractWriteWETH.transfer("vitalik.eth",ethers.utils.parseEther('0.001'))
await tx1.wait()
const balanceAfterTranfer = await contractWriteWETH.balanceOf(addr)
const balanceOfVitalik = await contractWriteWETH.balanceOf('vitalik.eth')
console.log(`Balance after tranfer is ${ethers.utils.formatEther(balanceAfterTranfer)}`)
console.log(`Balance of Vitalik is ${ethers.utils.formatEther(balanceOfVitalik)}`)

console.log("\n4. 调用withdraw()函数，提回剩余的0.002WETH")
console.log(`the balance of ETH before withdraw is ${ethers.utils.formatEther(await provider.getBalance(addr))}\n`)
const tx2 = await contractWriteWETH.withdraw(ethers.utils.parseEther('0.002'))
await tx2.wait()
const balanceAfterWithdraw = await contractWriteWETH.balanceOf(addr)
console.log(`Balance after withdraw is ${ethers.utils.formatEther(balanceAfterWithdraw)}`)
console.log(`the balance of ETH after withdraw is ${ethers.utils.formatEther(await provider.getBalance(addr))}\n`)
