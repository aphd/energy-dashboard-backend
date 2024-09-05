const { Web3 } = require('web3');
require('dotenv').config();
const NETWORK = process.env.ETHEREUM_NETWORK;

async function getEtherBalance(address) {
    // Configuring the connection to an Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://${NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`)); // prettier-ignore

    try {
        // Fetching the balance of the specified address
        const balance = await web3.eth.getBalance(address);
        console.log(`The balance of address ${address} is: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        return balance;
    } catch (error) {
        console.error('An error occurred while fetching the balance:', error);
    }
}

async function main() {
    // You can replace this with any Ethereum address
    const address = process.env.FROM;
    await getEtherBalance(address);
}

main();
