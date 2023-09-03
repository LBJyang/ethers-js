import { ethers } from "ethers";

const iface = new ethers.utils.Interface([
  "function transfer(address,uint256) public returns (bool)", // 注意 uint 改为 uint256
]);

const functionSignature = `transfer(address,uint256)`;
const selector = iface.getSighash(functionSignature);

console.log(`函数选择器是${selector}`);
