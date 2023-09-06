import { ethers } from "ethers";
const provider = new ethers.providers.WebSocketProvider('https://mainnet.infura.io/ws/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')

const contractAddress = '0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a'
const slotIndex = '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103'

console.log('读取slot中的数据:')
const slotdata = await provider.getStorageAt(contractAddress,slotIndex)
console.log(`slot中的数据为:${slotdata}`)
console.log(`用hexDataSlice方法取出来部分数据，slot中的数据为:${ethers.utils.hexDataSlice(slotdata,12)}`)
console.log(`在取出来的数据中getAddress，slot中的数据为:${ethers.utils.getAddress(ethers.utils.hexDataSlice(slotdata,12))}`)

//slot中的数据为:0x000000000000000000000000554723262467f125ac9e1cdfa9ce15cc53822dbd


