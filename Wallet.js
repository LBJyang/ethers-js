import { Mnemonic, ethers } from "ethers"
const provider = new ethers.JsonRpcProvider('https://goerli.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
/*const wallet1 = ethers.Wallet.createRandom()
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic;
const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const wallet2 = new ethers.Wallet(privateKey,provider)
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)*/
const address1 = '0xfDAE4dc48009AF1E0228ab034092A6A849a3c9c2'
const wallet1 = ethers.Wallet.fromPhrase("round flower pitch breeze pass dream canvas found summer fee broccoli other",provider)
console.log(`${address1}`)
console.log(`${await wallet1.getAddress()}`)
//const address2 = await wallet2.getAddress()
//const address3 = await wallet3.getAddress()
const addressMain = '0xf102ca9c4d65b0B94412bf1809833ADb1F87DBCF'
console.log(`1.Get the addresses`)
//console.log(`Address of wallet1 is ${address1}`)
//console.log(`Address of wallet2 is ${address2}`)
console.log(`Address of wallet1 is ${address1}`)
console.log(`Address of mywallet is ${addressMain}`)
//console.log(`Is Address1 and Address3 the same:${address1 === address3}`)
//console.log(`The mnemonic of Address1 is ${mnemonic.phrase}`)
//console.log(`The privateKey of wallet2 is ${wallet1.privateKey}`)
//const txCount1 = await wallet1WithProvider.getNonce()
//const txCount2 = await wallet2.getNonce()
//console.log(`Wallet1's nonce is ${txCount1}`)
//console.log(`Wallet2's nonce is ${txCount2}`)
console.log("Send ETH:")
console.log("i.Balance Before Transaction:")
console.log(`Balance of wallet1:${ethers.formatEther(await provider.getBalance(address1))}`)
console.log(`Balance of mywallet:${ethers.formatEther(await provider.getBalance(addressMain))}`)
const tx = {
    to : addressMain,
    value : ethers.parseEther("0.01")
}
console.log("\nii.send ETH test")
const receipt = await wallet1.sendTransaction(tx)
await receipt.wait()
console.log(`\niii.Balance after Transaction`)
console.log(`Balance of wallet1:${ethers.formatEther(await provider.getBalance(address1))}`)
console.log(`Balance of mywallet:${ethers.formatEther(await provider.getBalance(addressMain))}`)