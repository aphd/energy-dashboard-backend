const { Web3 } = require('web3');
require('dotenv').config();
const NETWORK = process.env.ETHEREUM_NETWORK;
const address = process.env.FROM;
const url = `https://${NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`

const getEtherBalance = async () => {
    if (!address) throw new Error('Environment variable FROM is not set');
    const web3 = new Web3(new Web3.providers.HttpProvider(url)); // prettier-ignore
    const balance = await web3.eth.getBalance(address);
    const ethBalance = web3.utils.fromWei(balance, 'ether');
    console.log(`The balance of address ${address} is: ${ethBalance} ETH`);
    return +ethBalance;
};

if (require.main === module) getEtherBalance();

module.exports = { getEtherBalance };

