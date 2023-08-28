import { ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const myWallet = new ethers.Wallet(privateKey, provider)

const getAddressandBalance = async () => {
    const myAddress = await myWallet.getAddress()
    console.log(`The address of mywallet is:${myAddress}`)
    console.log(`The balance of mywallet is:${ethers.utils.formatEther(await myWallet.getBalance())}`)
    console.log(`Balance of my wallet is ${ethers.utils.formatEther(await provider.getBalance('0xf102ca9c4d65b0B94412bf1809833ADb1F87DBCF'))}`)
}

const main = async() => {
    const addressWETH = '0x9fc38297f1ab12315c840a30c1456650bbe034fb'
    const abiWETH = [
        "event  Transfer(address indexed src, address indexed dst, uint wad)"
    ]
    const contract = new ethers.Contract(addressWETH,abiWETH,provider)
    const block = await provider.getBlockNumber()
    console.log(`\nCurrent Block Number:${block} `)
    const tranferEvent = await contract.queryFilter('Transfer',block - 10000000,block)
    console.log('\n1.Print the first event:')
    console.log(tranferEvent[0])
    console.log('\n2.Print the args:')
    const amount = ethers.utils.formatUnits(ethers.BigNumber.from(tranferEvent[0].args["wad"]),"ether")
    console.log(`The address${tranferEvent[0].args["src"]}transfer${amount}WETH to the address ${tranferEvent[0].args["dst"]}`)
}

main()

