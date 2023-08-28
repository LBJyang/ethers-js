//address"0x1d34D3F6B57F6E168322bD58101b8095fa416093"
import { Wallet, ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')

const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)
const myAddress = await wallet.getAddress()
const main = async () => {
    console.log('\n1.创建HD钱包')
    const mnemonic = 'jewel feed group system laptop tribe gesture peanut nut erupt unaware morning'
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
    console.log(`生成的随机HD钱包地址是${hdNode.address}`)

    console.log('\n2.生成20个空投钱包地址')
    const numWallet = 20
    let basePath = "m/44'/60'/0'/0"
    let addresses = []
    for (let i = 0; i < numWallet; i++) {
        let hdNodeNew = hdNode.derivePath(basePath + "/" + i)
        let hdWalletNew = new ethers.Wallet(hdNodeNew.privateKey)
        console.log(`第${i + 1}个钱包地址是:${hdWalletNew.address}`)
        addresses.push(hdWalletNew.address)
    }
    //console.log(`${addresses}`)
    const amount = Array(20).fill(ethers.utils.parseEther('0.0001'))
    console.log(`对应空投数量为:${amount}`)

    console.log('\n3.创建Airdrop合约实例')
    const AirdropAddress = '0x1d34D3F6B57F6E168322bD58101b8095fa416093'
    const AirdropABI = [
        "function multiTransferToken(address,address[],uint256[]) external",
        "function multiTransferETH(address[],uint256[]) external payable"
    ]
    const AirdropContract = new ethers.Contract(AirdropAddress, AirdropABI, wallet)

    console.log('\n4.创建WETH合约实例')
    const WETHaddress = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'
    const WETHABI = [
        "function balanceOf(address) public view returns(uint)",
        "function transfer(address, uint) public returns (bool)",
        "function approve(address, uint256) public returns (bool)",
        "function deposit() public payable"
    ]
    const WETHContract = new ethers.Contract(WETHaddress, WETHABI, wallet)

    console.log('\n检查随机一个钱包的余额')
    console.log(`查看第十个钱包的ETH余额:${ethers.utils.formatEther(await provider.getBalance(addresses[9]))}`)
    console.log(`查看第十个钱包的WETH余额:${ethers.utils.formatEther(await WETHContract.balanceOf(addresses[9]))}`)

    console.log('\n5.给所有钱包空投ETH')
    const tx = await AirdropContract.multiTransferETH(addresses, amount, { value: ethers.utils.parseEther('0.002') })
    await tx.wait()

    console.log('\n检查随机一个钱包的余额')
    console.log(`查看第十个钱包的ETH余额:${ethers.utils.formatEther(await provider.getBalance(addresses[9]))}`)
    console.log(`查看第十个钱包的WETH余额:${ethers.utils.formatEther(await WETHContract.balanceOf(addresses[9]))}`)

    /*console.log('\n6.给所有钱包空投WETH')
    const tx1 = await WETHContract.approve(AirdropAddress, ethers.utils.parseEther('0.02'))
    await tx1.wait()
    const tx2 = await AirdropContract.multiTransferToken(WETHaddress, addresses, amount)
    await tx2.wait()

    console.log('\n检查随机一个钱包的余额')
    console.log(`查看第十个钱包的ETH余额:${ethers.utils.formatEther(await provider.getBalance(addresses[9]))}`)
    console.log(`查看第十个钱包的WETH余额:${ethers.utils.formatEther(await WETHContract.balanceOf(addresses[9]))}`)*/
}
main()






