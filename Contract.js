//import the ethers
import { ContractTransactionReceipt, ethers } from "ethers";
//get prodiver
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
//get the address
const WETHaddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
//get the WETHabi
const WETHabi = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]'
//create the contract
const contractWETH = new ethers.Contract(WETHaddr,WETHabi,provider);
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)

const main = async() => {
    //Info of WETH
    /*console.log("1. 查询WETH合约信息：")
    const nameWETH = await contractWETH.name()
    console.log(`名称：${nameWETH}`)
    const symbolWETH = await contractWETH.symbol()
    console.log(`符号:${symbolWETH}`)
    console.log(`合约地址:${WETHaddr}`)
    const totalSupplyWETH = await contractWETH.totalSupply()
    console.log(`总量：${ethers.formatEther(totalSupplyWETH)}`)
    const balanceWETHofVitalik = await contractWETH.balanceOf(`vitalik.eth`)
    console.log(`Vitalik持仓WETH量:${ethers.formatEther(balanceWETHofVitalik)}`)
    //Info of DAI
    console.log("1. 查询DAI合约信息:")
    const nameDAI = await contractDAI.name()
    console.log(`名称：${nameDAI}`)
    const symbolDAI = await contractDAI.symbol()
    console.log(`符号:${symbolDAI}`)
    console.log(`合约地址:${addressDAI}`)
    const totalSupplyDAI = await contractDAI.totalSupply()
    console.log(`总量：${ethers.formatEther(totalSupplyDAI)}`)
    const balanceDAIofVitalik = await contractDAI.balanceOf(`vitalik.eth`)
    console.log(`Vitalik持仓DAI量:${ethers.formatEther(balanceDAIofVitalik)}`)*/
    console.log(`address:${await contractDAI.getAddress()}`)
 }      
main()