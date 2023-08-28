import { Wallet, ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)

const addressBAYC = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
const abiBAYC = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function supportsInterface(bytes4) public view returns(bool)",
]
const contractERC721 = new ethers.Contract(addressBAYC,abiBAYC,provider)

const name = await contractERC721.name()
const symbol = await contractERC721.symbol()
console.log('\n1.读取ERC721合约信息：')
console.log(`合约地址:${addressBAYC}`)
console.log(`合约名称:${name}`)
console.log(`合约代号:${symbol}`)

const selectorERC721 = '0x80ac58cd'
const isERC721 = await contractERC721.supportsInterface(selectorERC721)
console.log('\n2.利用ERC165的supportsInterface，确定合约是否为ERC721标准')
console.log(`合约是否为ERC721标准:${isERC721}`)






