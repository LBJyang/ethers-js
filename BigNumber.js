import { ethers, logger } from "ethers";

const oneGwei = ethers.BigNumber.from("1000000000")
console.log(oneGwei)
//console.log(ethers.BigNumber.from('0x3b9aca00'))
//console.log(ethers.BigNumber.from(1000000000))
//console.log("js中最大安全整数：",Number.MAX_SAFE_INTEGER)
//ethers.BigNumber.from(Number.MAX_SAFE_INTEGER)

console.log('add:',oneGwei.add(1).toString())
console.log('sub:',oneGwei.sub(1).toString())
console.log('mul:',oneGwei.mul(1).toString())
console.log('div:',oneGwei.div(1).toString())
console.log('isEqual:',oneGwei.eq("1000000000"))

console.group('\n2. 格式化：小单位转大单位，formatUnits')
console.log(ethers.utils.formatUnits(oneGwei,0))
console.log(ethers.utils.formatUnits(oneGwei,9))
console.log(ethers.utils.formatUnits(oneGwei,'gwei'))
console.log(ethers.utils.formatEther(oneGwei))
console.log(ethers.utils.formatUnits(1000000000,'gwei'))
console.groupEnd()

console.group('\n3. 解析：大单位转小单位，parseUnits');
console.log(ethers.utils.parseUnits('1').toString())
console.log(ethers.utils.parseUnits('1','ether').toString())
console.log(ethers.utils.parseUnits('1',18).toString())
console.log(ethers.utils.parseUnits('1','gwei').toString())
console.log(ethers.utils.parseUnits('1',9).toString())
console.log(ethers.utils.parseEther('10000').toString())

console.groupEnd()












