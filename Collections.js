import { Wallet, ethers } from "ethers";
console.log('\n1.获取地址信息')
const mnemonic = 'jewel feed group system laptop tribe gesture peanut nut erupt unaware morning'
const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
const numWallet = 20
let basePath = "m/44'/60'/0'/0"
let wallets = []
let addresses = []
for (let i = 0; i < numWallet; i++) {
    let hdNodeNew = hdNode.derivePath(basePath + "/" + i)
    let hdWalletNew = new ethers.Wallet(hdNodeNew.privateKey)
    wallets.push(hdWalletNew)
    console.log(`第${i + 1}个钱包地址是:${hdWalletNew.address}`)
    addresses.push(hdWalletNew.address)
}

console.log('\n2.准备工作包括准备provider,wallet,contract实例等')
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)
const myAddress = await wallet.getAddress()
console.log('创建WETH合约实例')
const WETHaddress = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'
const WETHABI = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
]
const WETHContract = new ethers.Contract(WETHaddress, WETHABI, wallet)

const checkBalance = async () => {
    console.log(`测试钱包ETH余额为${ethers.utils.formatEther(await provider.getBalance(myAddress))}、WETH余额为${ethers.utils.formatEther(await WETHContract.balanceOf(myAddress))}`)
    for (let i = 0; i < addresses.length; i++) {
        console.log(`第${i + 1}个钱包的ETH余额为${ethers.utils.formatEther(await provider.getBalance(addresses[i]))}、WETH余额为${ethers.utils.formatEther(await WETHContract.balanceOf(addresses[i]))}`)
    }
}
await checkBalance()

console.log('\n3.开始归集ETH')
for (let i = 0; i < wallets.length; i++) {
    const txSendETH = {
        to: myAddress,
        value: ethers.utils.parseEther('0.0001')
    }
    let walletWithProvider = wallets[i].connect(provider)
    const tx = await walletWithProvider.sendTransaction(txSendETH)
    console.log(`第${i + 1}个钱包${walletWithProvider.address}的ETH开始归集`)
    await tx.wait()
}
console.log('ETH归集结束！')

await checkBalance()

console.log('\n4.开始归集WETH')
for (let i = 0; i < wallets.length; i++) {
    let walletWithProvider = wallets[i].connect(provider)
    let contractconnect = WETHContract.connect(walletWithProvider)
    const tx1 = await contractconnect.transfer(myAddress,ethers.utils.parseEther('0.0001'))
    console.log(`第${i + 1}个钱包${walletWithProvider.address}的WETH开始归集`)
    await tx1.wait()
}
console.log('WETH归集结束！')

await checkBalance()




