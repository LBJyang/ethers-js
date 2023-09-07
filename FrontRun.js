import { ethers } from "ethers";
const provider = new ethers.providers.WebSocketProvider('http://127.0.0.1:8545')
let network = provider.getNetwork()
network.then(res => console.log(`[${(new Date).toLocaleTimeString()}]链接到网络${res.chainId}`))

const contractABI = [
    "function mint() public",
    "function getTotalSupply() public view returns(uint256)"
]
const contractAddress = '0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F'
const contractFM = new ethers.Contract(contractAddress,contractABI,provider)

const iface = new ethers.utils.Interface(contractABI)

function getSignature(fn){
    return iface.getSighash(fn)
}
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const wallet = new ethers.Wallet(privateKey,provider)

provider.on('pending',async(txHash) => {
    const tx = await provider.getTransaction(txHash)
    const parsedTx = iface.parseTransaction(tx)
    if(tx.data.indexOf(getSignature("mint") !== -1 && tx.from != wallet.address)){
        console.log(`[${(new Date).toLocaleTimeString()}]监听到交易:${txHash}`)
        console.log(`打印原始交易:${JSON.stringify(tx)}`)
        console.log(`打印解码后的交易:${JSON.stringify(parsedTx)}`)
        console.log(`mint地址是:${tx.from}`)
        console.log(`mint的NFT编号:${await contractFM.getTotalSupply()}`)
        tx.wait().then(console.log(`mint完成时间:[${(new Date).toLocaleTimeString()}]`))
    }
    //setTimeout(console.log(),11000)
})