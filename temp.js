import { ethers } from "ethers";
const provider = new ethers.providers.WebSocketProvider('http://127.0.0.1:8545')
let network = provider.getNetwork()
network.then(res => console.log(`[${(new Date).toLocaleTimeString()}]链接到网络${res.chainId}`))


const txHash = '0xa74e111246f58111b642104e9363209d9fa35d5370b7760528037ed5ba6d89e9';
const tx = await provider.getTransaction(txHash)
const block = await provider.getBlock(tx.blockNumber)
console.log(block.transactions)
