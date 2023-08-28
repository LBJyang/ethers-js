import { ethers } from "ethers";

//const mnemonic = 'air organ twist rule prison symptom jazz cheap rather dizzy verb glare jeans orbit weapon universe require tired sing casino business anxiety seminar hunt'
const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32))
const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
console.log(hdNode.mnemonic)    

const numWallet = 30
let basePath = "m/44'/60'/0'/0"
let wallets = []
for(let i = 0;i < numWallet;i++){
    let hdNodeNew = hdNode.derivePath(basePath+'/'+i)
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey)
    console.log(`第${i+1}个钱包地址是:${hdNodeNew.address}`)
    wallets.push(walletNew)
}

const wallet = ethers.Wallet.fromMnemonic(mnemonic)
console.log('通过助记词创建的钱包：')
console.log(wallet)
const pwd = 'lbjyang'
const json = await wallet.encrypt(pwd)
console.log('钱包的加密json:')
console.log(json)

const wallet2 = await ethers.Wallet.fromEncryptedJson(json,pwd)
console.log("\n4. 从加密json读取钱包：")
console.log(wallet2)



