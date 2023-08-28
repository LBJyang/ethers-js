import { ContractTransactionReceipt, ethers } from "ethers"
const INFURA_Id = 'ecdfcd0dfcb74b73b78aa17fad4dc83f'
const providerETH = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_Id}`)
const providerGoerli = new ethers.JsonRpcProvider('https://goerli.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
console.log("1.查询vitalik在主网和Goerli测试网的ETH余额")
const balance = await providerETH.getBalance('Vitalik.eth')
const balanceGoerli = await providerGoerli.getBalance('Vitalik.eth')
const balanceEth = ethers.formatEther(balance)
const banlanceGoerliEth = ethers.formatEther(balanceGoerli)
console.log(`ETH balance of Vitalik is ${balanceEth} ETH`)
console.log(`Goerli ETH balance of Vitalik is ${balanceGoerli} ETH`)
console.log("2. 查询使用的网络")
const network = await providerETH.getNetwork();
console.log(network.name)
console.log(network.isTestnet)
console.log("3.获取区块高度：")
const blockNum = await providerETH.getBlockNumber()
console.log(blockNum)
console.log("4. 查询当前gas费用")
const feeData = await providerETH.getFeeData()
console.log(feeData)
console.log("5.查询区块信息：")
const blockInfo = await providerETH.getBlock(0)
console.log(blockInfo)
console.log("6.查询合约bytecode:")
const bytecode = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab")
console.log(bytecode)



