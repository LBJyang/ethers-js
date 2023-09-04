import { ethers } from "ethers";
const provider = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
let network = provider.getNetwork()
network.then(res => console.log(`[${(new Date).toLocaleTimeString()}]连接到chain-id:${res.chainId}`))

const contractABI = [
    "function transfer(address, uint) public returns (bool)",
]
const iface = new ethers.utils.Interface(contractABI)

function throttle(fn, delay) {
    let canCall = true
    return function () {
        if (canCall) {
            fn.apply(this, arguments)
            canCall = false
            setTimeout(() => {
                canCall = true
            }, delay)
        }
    }
}
const functionSignature = 'transfer(address,uint)'
const selector = iface.getSighash(functionSignature)
console.log(`函数选择器是${selector}`)
let j = 0
provider.on('pending', async (txHash) => {
    if (txHash) {
        const tx = await provider.getTransaction(txHash)
        j++
        if (tx !== null && tx.data.indexOf(selector) !== -1) {
            console.log(`[${(new Date).toLocaleTimeString()}]监听到第${j + 1}个pending交易:${txHash}`)
            console.log(`打印解码交易详情:${JSON.stringify(iface.parseTransaction(tx), null, 2)}`)
            console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`)
            console.log(`转账金额:${ethers.utils.formatEther(iface.parseTransaction(tx).args[1])}`)
            provider.removeListener('pending', this)
        }
    }
}
)
/*provider.on("pending", throttle(async (txHash) => {
    if (txHash) {
        // 获取tx详情
        let tx = await provider.getTransaction(txHash);
        if (tx) {
            // filter pendingTx.data
            if (tx.data.indexOf(iface.getFunction("transfer").selector) !== -1) {
                // 打印txHash
                console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易: ${txHash} \r`);

                // 打印解码的交易详情
                let parsedTx = iface.parseTransaction(tx)
                console.log("pending交易详情解码：")
                console.log(parsedTx);
                // Input data解码
                console.log("Input Data解码：")
                console.log(parsedTx.args);
            }
        }
    }
}, 100))*/
