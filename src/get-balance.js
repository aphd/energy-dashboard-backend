const { Web3 } = require('web3');
require('dotenv').config();
const NETWORK = process.env.ETHEREUM_NETWORK;
const address = process.env.FROM;

const getEtherBalance = async () => {
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

if (require.main === module) getEtherBalance();

module.exports = {getEtherBalance};
