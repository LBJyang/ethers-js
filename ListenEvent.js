import { Wallet, ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const myWallet = new ethers.Wallet(privateKey, provider)

const getAddressandBalance = async () => {
    const myAddress = await myWallet.getAddress()
    console.log(`The address of mywallet is:${myAddress}`)
    console.log(`The balance of mywallet is:${ethers.utils.formatEther(await myWallet.getBalance())}`)
    console.log(`Balance of my wallet is ${ethers.utils.formatEther(await provider.getBalance('0xf102ca9c4d65b0B94412bf1809833ADb1F87DBCF'))}`)
}
const abiUSDT = [
    "event Transfer(address indexed from, address indexed to, uint value)"
]
const addressUSDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const contractUSDT = new ethers.Contract(addressUSDT, abiUSDT, myWallet)

const once = async () => {
    console.log('\n1.Use contract.once function,listen to the tranferevent for once:')
    contractUSDT.once('Transfer', (from, to, value) => {
        console.log(
            `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value), 6)}`
        )
    })
}
const on = async () => {
    console.log('\n1.Use contract.on function,listen to the tranferevent persistently:')
    contractUSDT.on('Transfer', (from, to, value) => {
        console.log(
            `\n${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value), 6)}`
        )
    })
}

on()

