/*import { ethers } from "ethers";

const provider = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')

function throttle(fn, delay) {
    let timer
    return () => {
        if (!timer) {
            fn.apply(this, arguments)
            timer = setTimeout(
                () => {
                    clearTimeout(timer)
                    timer = null
                }, 1000
            )
        }
    }
}
const getTxHash = async () => {
    let i = 0
    provider.on('pending', async (txHash) => {
        if (txHash && i <= 100) {
            console.log(`[${(new Date).toLocaleTimeString()}]监听Pending交易${i}:${txHash}\r`)
            i++
        }
    })
}*/
//await getTxHash()
import { ethers } from "ethers";
console.log("\n1. 连接 wss RPC")
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTF-Solidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md 
const ALCHEMY_MAINNET_WSSURL = 'wss://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
const provider = new ethers.providers.WebSocketProvider(ALCHEMY_MAINNET_WSSURL)
/*let i = 0
provider.on("pending", async (txHash) => {
    if (txHash && i < 100) {
        // 打印txHash
        console.log(`[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`);
        i++
    }
})*/
function throttle(fn, delay) {
    let timer
    return () => {
        if (!timer) {
            fn.apply(this, arguments)
            timer = setTimeout(
                () => {
                    clearTimeout(timer)
                    timer = null
                }, 1000
            )
        }
    }
}

const getHashInfo = async () => {
    let j = 0
    provider.on("pending", throttle(async (txHash) => {
        if (txHash && j >= 100) {
            // 获取tx详情
            let tx = await provider.getTransaction(txHash);
            console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`);
            console.log(tx);
            j++
        }
    }, 1000))
}
await getHashInfo()
