import { ethers } from "ethers"
console.log('\n1.连接RPC')
const provider = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
/*let i = 0;
provider.on('pending',async(txHash) => {
    if(txHash && i <= 100){
        console.log(`[${(new Date).toLocaleTimeString()}]监听到Pending交易:${i}:${txHash}`)
        i++
    }
})*/
function throttle(fn, delay) {
    let canCall = true
    return function () {
        if (canCall) {
            fn.apply(this, arguments)
            canCall = false;
            setTimeout(() => {
                canCall = true
            }, delay)
        }
    }
}
console.log(`\n2.监听交易信息：`)
let j = 0;
provider.on('pending', throttle(async (txHash) => {
    if (txHash && j <= 2) {
        const tx = await provider.getTransaction(txHash)
        console.log(`[${(new Date).toLocaleTimeString()}]监听到Pending交易${j + 1}:${txHash}\r交易详情：`)
        console.log(tx)
        j++;
    }
}, 1000))
