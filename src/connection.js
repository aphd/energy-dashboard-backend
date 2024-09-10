const {Web3} = require('web3');
require('dotenv').config();
const NETWORK = process.env.ETHEREUM_NETWORK;
const url = `https://${NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`;

const testInfuraConnection = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(url)); // prettier-ignore
    const latestBlock = await web3.eth.getBlockNumber(); // Check connection by getting the latest block number
    console.log(`Successfully connected to Infura. Latest block: ${latestBlock}`);
    return latestBlock;
};

if (require.main === module) testInfuraConnection();

module.exports = { testInfuraConnection };

