import { Wallet, ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)

const abiDai = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address,uint) external returns(bool)",
]

const addressDai = '0x46896e512a77112493eE04213f1404bA42Fd5f88'
const addressMain = '0xf102ca9c4d65b0B94412bf1809833ADb1F87DBCF'

const contractDai = new ethers.Contract(addressDai, abiDai, provider)

const addr = await wallet.getAddress()
const balOfwallet = await contractDai.balanceOf(addr)
console.log('\n1.获取我的DAI持仓：')
console.log(`我的DAI持仓：${ethers.utils.formatEther(balOfwallet)}`)
console.log('获取主账户DAI持仓：')
console.log(`主账户DAI持仓：${ethers.utils.formatEther(await contractDai.balanceOf(addressMain))}`)

const test1 = async () => {
    const tx = await contractDai.callStatic.transfer(addr, ethers.utils.parseEther('1000'), { from: addressMain })
    console.log('\n2.测试用主账户给测试账户发送1000DAI。')
    console.log((`结果：${tx}`))
}

const test2 = async () => {
    const tx = await contractDai.callStatic.transfer(addressMain, ethers.utils.parseEther('1000'), { from: addr })
    console.log('\n2.测试用主账户给测试账户发送1000DAI。')
    console.log((`结果：${tx}`))
}

test2()




