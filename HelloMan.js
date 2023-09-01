import {ethers} from "ethers";
const provider = ethers.getDefaultProvider();
const main = async() => {
    const balance = await provider.getBalance('0xf102ca9c4d65b0B94412bf1809833ADb1F87DBCF');
    console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);
}
main()