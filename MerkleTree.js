import { ethers } from "ethers"
import { MerkleTree } from "merkletreejs";

console.log('\n1.建MerkleTree')
const addresses = ["0xEcD31d0Af701100c42175E7ee888e6f449B6b546",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"]
const leaf = addresses.map(x => ethers.utils.keccak256(x))
const merkletree = new MerkleTree(leaf, ethers.utils.keccak256, { sortPairs: true })
const root = merkletree.getHexRoot()
const proof = merkletree.getHexProof(leaf[0])
console.log(merkletree.toString())
console.log(`Leaf:${leaf}`)
console.log(`root:${root}`)
console.log(`proof:${proof}`)

console.log('\n2.建provider和wallet')
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/ecdfcd0dfcb74b73b78aa17fad4dc83f')
const privateKey = '0x3dbf5532099c5fba0d319aae7c7ba9019083092656c1dfb70971fdd235766a30'
const wallet = new ethers.Wallet(privateKey, provider)

console.log('\n3.在sepolia上布MerkleTree合约')
const MerkleTreeabi = [{ "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "bytes32", "name": "merkleroot", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approve", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApproveForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovalForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedAddress", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "root", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURL", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const MerkleTreebytecode = '60a06040523480156200001157600080fd5b5060405162003048380380620030488339818101604052810190620000379190620001c3565b82828160009080519060200190620000519291906200007e565b5080600190805190602001906200006a9291906200007e565b505050806080818152505050505062000405565b8280546200008c90620002fc565b90600052602060002090601f016020900481019282620000b05760008555620000fc565b82601f10620000cb57805160ff1916838001178555620000fc565b82800160010185558215620000fc579182015b82811115620000fb578251825591602001919060010190620000de565b5b5090506200010b91906200010f565b5090565b5b808211156200012a57600081600090555060010162000110565b5090565b6000620001456200013f8462000286565b6200025d565b905082815260208101848484011115620001645762000163620003cb565b5b62000171848285620002c6565b509392505050565b6000815190506200018a81620003eb565b92915050565b600082601f830112620001a857620001a7620003c6565b5b8151620001ba8482602086016200012e565b91505092915050565b600080600060608486031215620001df57620001de620003d5565b5b600084015167ffffffffffffffff8111156200020057620001ff620003d0565b5b6200020e8682870162000190565b935050602084015167ffffffffffffffff811115620002325762000231620003d0565b5b620002408682870162000190565b9250506040620002538682870162000179565b9150509250925092565b6000620002696200027c565b905062000277828262000332565b919050565b6000604051905090565b600067ffffffffffffffff821115620002a457620002a362000397565b5b620002af82620003da565b9050602081019050919050565b6000819050919050565b60005b83811015620002e6578082015181840152602081019050620002c9565b83811115620002f6576000848401525b50505050565b600060028204905060018216806200031557607f821691505b602082108114156200032c576200032b62000368565b5b50919050565b6200033d82620003da565b810181811067ffffffffffffffff821117156200035f576200035e62000397565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b620003f681620002bc565b81146200040257600080fd5b50565b608051612c206200042860003960008181610d85015261136a0152612c206000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636352211e11610097578063a22cb46511610066578063a22cb465146102d1578063b88d4fde146102ed578063ebd1d35914610309578063ebf0c7171461033957610100565b80636352211e14610237578063641ce1401461026757806370a082311461028357806395d89b41146102b357610100565b8063154e839e116100d3578063154e839e1461019f57806323b872dd146101cf57806342842e0e146101eb578063630303c61461020757610100565b806301ffc9a71461010557806306fdde0314610135578063081812fc14610153578063095ea7b314610183575b600080fd5b61011f600480360381019061011a9190611dd1565b610357565b60405161012c9190612221565b60405180910390f35b61013d610491565b60405161014a9190612257565b60405180910390f35b61016d60048036038101906101689190611e2b565b610523565b60405161017a91906121ba565b60405180910390f35b61019d60048036038101906101989190611d1d565b610569565b005b6101b960048036038101906101b49190611e2b565b610681565b6040516101c69190612257565b60405180910390f35b6101e960048036038101906101e49190611c07565b6106e9565b005b61020560048036038101906102009190611c07565b610749565b005b610221600480360381019061021c9190611b9a565b610769565b60405161022e9190612221565b60405180910390f35b610251600480360381019061024c9190611e2b565b610789565b60405161025e91906121ba565b60405180910390f35b610281600480360381019061027c9190611d5d565b61083b565b005b61029d60048036038101906102989190611b9a565b6109c2565b6040516102aa9190612439565b60405180910390f35b6102bb610a7a565b6040516102c89190612257565b60405180910390f35b6102eb60048036038101906102e69190611cdd565b610b0c565b005b61030760048036038101906103029190611c5a565b610c8d565b005b610323600480360381019061031e9190611bc7565b610cef565b6040516103309190612221565b60405180910390f35b610341610d83565b60405161034e919061223c565b60405180910390f35b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061042257507f82f86251000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061048a57507f866bc6dc000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b6060600080546104a0906125ad565b80601f01602080910402602001604051908101604052809291908181526020018280546104cc906125ad565b80156105195780601f106104ee57610100808354040283529160200191610519565b820191906000526020600020905b8154815290600101906020018083116104fc57829003601f168201915b5050505050905090565b600061052e82610da7565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061057482610789565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156105e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105dc906123d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610604610df2565b73ffffffffffffffffffffffffffffffffffffffff16148061063357506106328161062d610df2565b610cef565b5b610672576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610669906123f9565b60405180910390fd5b61067c8383610dfa565b505050565b606061068c82610da7565b6000610696610eb3565b905060008151116106b657604051806020016040528060008152506106e1565b806106c084610eca565b6040516020016106d1929190612196565b6040516020818303038152906040525b915050919050565b6106fa6106f4610df2565b82610fa2565b610739576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610730906122b9565b60405180910390fd5b610744838383611037565b505050565b61076483838360405180602001604052806000815250610c8d565b505050565b60066020528060005260406000206000915054906101000a900460ff1681565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610832576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610829906122f9565b60405180910390fd5b80915050919050565b61088e61084785611331565b838380806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050611361565b6108cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c4906123b9565b60405180910390fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561095a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095190612419565b60405180910390fd5b6109648484611396565b6001600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2a90612399565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060018054610a89906125ad565b80601f0160208091040260200160405190810160405280929190818152602001828054610ab5906125ad565b8015610b025780601f10610ad757610100808354040283529160200191610b02565b820191906000526020600020905b815481529060010190602001808311610ae557829003601f168201915b5050505050905090565b8173ffffffffffffffffffffffffffffffffffffffff16610b2b610df2565b73ffffffffffffffffffffffffffffffffffffffff161415610b82576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7990612339565b60405180910390fd5b8060056000610b8f610df2565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16610c3c610df2565b73ffffffffffffffffffffffffffffffffffffffff167f4ab86a02a3a55558db32d0e491b45a209c8310036f6e6d4a7195067e1d2b838483604051610c819190612221565b60405180910390a35050565b610c9e610c98610df2565b83610fa2565b610cdd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd490612379565b60405180910390fd5b610ce9848484846115b4565b50505050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b610db081611610565b610def576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de6906122f9565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610e6d83610789565b73ffffffffffffffffffffffffffffffffffffffff167f6e11fb1b7f119e3f2fa29896ef5fdf8b8a2d0d4df6fe90ba8668e7d8b2ffa25e60405160405180910390a45050565b606060405180602001604052806000815250905090565b606060006001610ed98461167c565b01905060008167ffffffffffffffff811115610ef857610ef7612743565b5b6040519080825280601f01601f191660200182016040528015610f2a5781602001600182028036833780820191505090505b509050600082602001820190505b600115610f97578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581610f8157610f806126b6565b5b0494506000851415610f9257610f97565b610f38565b819350505050919050565b600080610fae83610789565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061101d5750610fee83610523565b73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b8061102e575061102d8185610cef565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661105782610789565b73ffffffffffffffffffffffffffffffffffffffff16146110ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110a490612299565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561111d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111490612279565b60405180910390fd5b61112a83838360016117cf565b8273ffffffffffffffffffffffffffffffffffffffff1661114a82610789565b73ffffffffffffffffffffffffffffffffffffffff16146111a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161119790612299565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461132c83838360016117d5565b505050565b600081604051602001611344919061214f565b604051602081830303815290604052805190602001209050919050565b600061138e82847f00000000000000000000000000000000000000000000000000000000000000006117db565b905092915050565b61139f81611610565b156113df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d6906122d9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561144f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161144690612359565b60405180910390fd5b61145d6000838360016117cf565b61146681611610565b156114a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161149d906122d9565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46115b06000838360016117d5565b5050565b6115c0848484846117f2565b6115ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115f690612319565b60405180910390fd5b61160a848484611037565b50505050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106116da577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816116d0576116cf6126b6565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611717576d04ee2d6d415b85acef8100000000838161170d5761170c6126b6565b5b0492506020810190505b662386f26fc10000831061174657662386f26fc10000838161173c5761173b6126b6565b5b0492506010810190505b6305f5e100831061176f576305f5e1008381611765576117646126b6565b5b0492506008810190505b612710831061179457612710838161178a576117896126b6565b5b0492506004810190505b606483106117b757606483816117ad576117ac6126b6565b5b0492506002810190505b600a83106117c6576001810190505b80915050919050565b50505050565b50505050565b6000816117e88585611989565b1490509392505050565b60006118138473ffffffffffffffffffffffffffffffffffffffff166119df565b1561197c578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261183c610df2565b8786866040518563ffffffff1660e01b815260040161185e94939291906121d5565b602060405180830381600087803b15801561187857600080fd5b505af19250505080156118a957506040513d601f19601f820116820180604052508101906118a69190611dfe565b60015b61192c573d80600081146118d9576040519150601f19603f3d011682016040523d82523d6000602084013e6118de565b606091505b50600081511415611924576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161191b90612319565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611981565b600190505b949350505050565b60008082905060005b84518110156119d4576119bf828683815181106119b2576119b1612714565b5b6020026020010151611a02565b915080806119cc90612610565b915050611992565b508091505092915050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000818310611a39578183604051602001611a1e92919061216a565b60405160208183030381529060405280519060200120611a63565b8282604051602001611a4c92919061216a565b604051602081830303815290604052805190602001205b905092915050565b6000611a7e611a7984612479565b612454565b905082815260208101848484011115611a9a57611a99612781565b5b611aa584828561256b565b509392505050565b600081359050611abc81612b8e565b92915050565b60008083601f840112611ad857611ad7612777565b5b8235905067ffffffffffffffff811115611af557611af4612772565b5b602083019150836020820283011115611b1157611b1061277c565b5b9250929050565b600081359050611b2781612ba5565b92915050565b600081359050611b3c81612bbc565b92915050565b600081519050611b5181612bbc565b92915050565b600082601f830112611b6c57611b6b612777565b5b8135611b7c848260208601611a6b565b91505092915050565b600081359050611b9481612bd3565b92915050565b600060208284031215611bb057611baf61278b565b5b6000611bbe84828501611aad565b91505092915050565b60008060408385031215611bde57611bdd61278b565b5b6000611bec85828601611aad565b9250506020611bfd85828601611aad565b9150509250929050565b600080600060608486031215611c2057611c1f61278b565b5b6000611c2e86828701611aad565b9350506020611c3f86828701611aad565b9250506040611c5086828701611b85565b9150509250925092565b60008060008060808587031215611c7457611c7361278b565b5b6000611c8287828801611aad565b9450506020611c9387828801611aad565b9350506040611ca487828801611b85565b925050606085013567ffffffffffffffff811115611cc557611cc4612786565b5b611cd187828801611b57565b91505092959194509250565b60008060408385031215611cf457611cf361278b565b5b6000611d0285828601611aad565b9250506020611d1385828601611b18565b9150509250929050565b60008060408385031215611d3457611d3361278b565b5b6000611d4285828601611aad565b9250506020611d5385828601611b85565b9150509250929050565b60008060008060608587031215611d7757611d7661278b565b5b6000611d8587828801611aad565b9450506020611d9687828801611b85565b935050604085013567ffffffffffffffff811115611db757611db6612786565b5b611dc387828801611ac2565b925092505092959194509250565b600060208284031215611de757611de661278b565b5b6000611df584828501611b2d565b91505092915050565b600060208284031215611e1457611e1361278b565b5b6000611e2284828501611b42565b91505092915050565b600060208284031215611e4157611e4061278b565b5b6000611e4f84828501611b85565b91505092915050565b611e61816124ed565b82525050565b611e78611e73826124ed565b612659565b82525050565b611e87816124ff565b82525050565b611e968161250b565b82525050565b611ead611ea88261250b565b61266b565b82525050565b6000611ebe826124aa565b611ec881856124c0565b9350611ed881856020860161257a565b611ee181612790565b840191505092915050565b6000611ef7826124b5565b611f0181856124d1565b9350611f1181856020860161257a565b611f1a81612790565b840191505092915050565b6000611f30826124b5565b611f3a81856124e2565b9350611f4a81856020860161257a565b80840191505092915050565b6000611f636033836124d1565b9150611f6e826127ae565b604082019050919050565b6000611f866035836124d1565b9150611f91826127fd565b604082019050919050565b6000611fa96031836124d1565b9150611fb48261284c565b604082019050919050565b6000611fcc6024836124d1565b9150611fd78261289b565b604082019050919050565b6000611fef6016836124d1565b9150611ffa826128ea565b602082019050919050565b60006120126032836124d1565b915061201d82612913565b604082019050919050565b6000612035602c836124d1565b915061204082612962565b604082019050919050565b60006120586027836124d1565b9150612063826129b1565b604082019050919050565b600061207b602e836124d1565b915061208682612a00565b604082019050919050565b600061209e6029836124d1565b91506120a982612a4f565b604082019050919050565b60006120c1600f836124d1565b91506120cc82612a9e565b602082019050919050565b60006120e46021836124d1565b91506120ef82612ac7565b604082019050919050565b6000612107603d836124d1565b915061211282612b16565b604082019050919050565b600061212a600c836124d1565b915061213582612b65565b602082019050919050565b61214981612561565b82525050565b600061215b8284611e67565b60148201915081905092915050565b60006121768285611e9c565b6020820191506121868284611e9c565b6020820191508190509392505050565b60006121a28285611f25565b91506121ae8284611f25565b91508190509392505050565b60006020820190506121cf6000830184611e58565b92915050565b60006080820190506121ea6000830187611e58565b6121f76020830186611e58565b6122046040830185612140565b81810360608301526122168184611eb3565b905095945050505050565b60006020820190506122366000830184611e7e565b92915050565b60006020820190506122516000830184611e8d565b92915050565b600060208201905081810360008301526122718184611eec565b905092915050565b6000602082019050818103600083015261229281611f56565b9050919050565b600060208201905081810360008301526122b281611f79565b9050919050565b600060208201905081810360008301526122d281611f9c565b9050919050565b600060208201905081810360008301526122f281611fbf565b9050919050565b6000602082019050818103600083015261231281611fe2565b9050919050565b6000602082019050818103600083015261233281612005565b9050919050565b6000602082019050818103600083015261235281612028565b9050919050565b600060208201905081810360008301526123728161204b565b9050919050565b600060208201905081810360008301526123928161206e565b9050919050565b600060208201905081810360008301526123b281612091565b9050919050565b600060208201905081810360008301526123d2816120b4565b9050919050565b600060208201905081810360008301526123f2816120d7565b9050919050565b60006020820190508181036000830152612412816120fa565b9050919050565b600060208201905081810360008301526124328161211d565b9050919050565b600060208201905061244e6000830184612140565b92915050565b600061245e61246f565b905061246a82826125df565b919050565b6000604051905090565b600067ffffffffffffffff82111561249457612493612743565b5b61249d82612790565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006124f882612541565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561259857808201518184015260208101905061257d565b838111156125a7576000848401525b50505050565b600060028204905060018216806125c557607f821691505b602082108114156125d9576125d86126e5565b5b50919050565b6125e882612790565b810181811067ffffffffffffffff8211171561260757612606612743565b5b80604052505050565b600061261b82612561565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561264e5761264d612687565b5b600182019050919050565b600061266482612675565b9050919050565b6000819050919050565b6000612680826127a1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160601b9050919050565b7f4552433732313a796f752063616e2774207472616e66657220796f757220746f60008201527f6b656e20746f207a65726f206164647265737300000000000000000000000000602082015250565b7f4552433732313a7472616e736665722066726f6d20746865206164647265737360008201527f2077686f206973206e6f7420746865206f776e65720000000000000000000000602082015250565b7f4552433732313a6d736773656e646572206d75737420626520746865206f776e60008201527f6572206f7220626520617070726f766564000000000000000000000000000000602082015250565b7f4552433732313a746f6b656e2068617320616c7265616479206265656e206d6960008201527f6e74656400000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a696e76616c696420746f6b656e496400000000000000000000600082015250565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4552433732313a746865206d736773656e6465722063616e206e6f742062652060008201527f746865206f70657261746f720000000000000000000000000000000000000000602082015250565b7f4552433732313a796f752063616e206e6f74206d696e7420746f207a65726f2060008201527f6164647265737300000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a7468652063616c6c6572206973206e6f7420746865206f776e60008201527f6572206f7220617070726f766564000000000000000000000000000000000000602082015250565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b7f696e76616c696420616464726573730000000000000000000000000000000000600082015250565b7f4552433732313a63616e206e6f7420617070726f766520746f2068696d73656c60008201527f6600000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b7f616c7265616479206d696e740000000000000000000000000000000000000000600082015250565b612b97816124ed565b8114612ba257600080fd5b50565b612bae816124ff565b8114612bb957600080fd5b50565b612bc581612515565b8114612bd057600080fd5b50565b612bdc81612561565b8114612be757600080fd5b5056fea2646970667358221220b717bef7e54b502a77374f77a46144fa4064758483fed0a656160e6869643c4f64736f6c63430008070033'

const MerkleTreefactory = new ethers.ContractFactory(MerkleTreeabi, MerkleTreebytecode, wallet)
const MerkleTreeContract = await MerkleTreefactory.deploy('lbjyangMerkleTree', 'LMT', root)

console.log("\n等待合约部署上链")
await MerkleTreeContract.deployed()
console.log("合约已上链")

console.log("\n4. 调用mint()函数，利用merkle tree验证白名单，给第一个地址铸造NFT")
console.log(`NFT名称：${await MerkleTreeContract.name()}`)
console.log(`NFT代号：${await MerkleTreeContract.symbol()}`)
const tx = await MerkleTreeContract.mint(addresses[0],'0',proof)
console.log("铸造中，等待交易上链")
await tx.wait()
console.log(`mint成功${addresses[0]}的NFT代币余额为${await MerkleTreeContract.balanceOf(addresses[0])}`)





