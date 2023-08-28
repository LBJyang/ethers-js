import { Wallet, ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const myWallet = new ethers.Wallet(privateKey, provider)
console.log('test')
const addressUSDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const addressBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
  ]

const contractUSDT = new ethers.Contract(addressUSDT,abi,provider)

/*const balanceOfBinance = await provider.getBalance(addressBinance)
console.log(`1.读取币安热钱包USDT余额：\nUSDT余额：${ethers.utils.formatUnits(ethers.BigNumber.from(balanceOfBinance),6)}`)
*/

const withFilterIn = async() => {
    console.log("\n2. 创建过滤器，监听转移USDT进交易所")
    let filterIn = contractUSDT.filters.Transfer(null,addressBinance)
    console.log("过滤器详情：")
    console.log(filterIn)
    contractUSDT.on(filterIn, (from, to, value) => {
        console.log('---------监听USDT进入交易所--------');
        console.log(
          `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
        )
      }).on('error', (error) => {
        console.log(error)
      })
}

const withFilterOut = async() => {
    console.log("\n3. 创建过滤器，监听转出USDT进交易所")
    let filterOut = contractUSDT.filters.Transfer(addressBinance,null)
    console.log("过滤器详情：")
    console.log(filterOut)
    contractUSDT.on(filterOut, (from, to, value) => {
        console.log('---------监听USDT转出交易所--------');
        console.log(
          `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
        )
      }).on('error', (error) => {
        console.log(error)
      })
}

withFilterOut()
