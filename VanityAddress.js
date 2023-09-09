import { ethers } from "ethers";
const regex = /^0x123.*abc$/
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

第2898次尝试！

VanityAddress is 0xaa435c21DFCFaa887bFFb783BF408e2B9fA4BcF2
VanityAddress's privateKey is 0x9632be537737d57fcb2a7ebd6111cd195e2ab9884c296057d7947d155b0b9d44

VanityAddress is 0xabc0C68A645C3E6CC16E5498724c3b7406c439B7
VanityAddress's privateKey is 0x0b498c569fdc254f930a336f54b8d96ec1c39282a0b23722dcad20be46d9a3a5
*/