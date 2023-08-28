import { ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')

const addressOfMywallet = '0xEcD31d0Af701100c42175E7ee888e6f449B6b546'

console.log(`Balance of my test wallet is ${ethers.utils.formatEther(await provider.getBalance(addressOfMywallet))}`)
console.log(`Balance of my wallet is ${ethers.utils.formatEther(await provider.getBalance('0xf102ca9c4d65b0B94412bf1809833ADb1F87DBCF'))}`)