import { ethers } from "ethers";
const regex = /^0x0622.*$/
let wallet
let gotit = false
let i = 0
while(!gotit) {
    wallet = ethers.Wallet.createRandom()
    gotit = regex.test(wallet.address)
    i++
    console.log(`第${i}次尝试！\n`)

}
console.log(`VanityAddress is ${wallet.address}`)
console.log(`VanityAddress's privateKey is ${wallet.privateKey}`)

/*
第148026次尝试！

VanityAddress is 0x0622BC5a5012E67B4113d5BeA8DaeDDF02F8B4aa
VanityAddress's privateKey is 0x6daf13e101a07cb1084233f92bc4279bb973d7ce098fb663d99e142974a42d07
*/