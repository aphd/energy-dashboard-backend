const { Web3 } = require('web3');
const { ETH_DATA_FORMAT } = require('web3');
require('dotenv').config();
const NETWORK = process.env.ETHEREUM_NETWORK;
const TO = process.env.TO;

const getEstimateGasParams = ({ web3, signer }) => ({
    from: signer.address,
    to: TO,
    value: web3.utils.toWei('0.0001', 'ether'),
});

async function main() {
    // Configuring the connection to an Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://${NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`)); // prettier-ignore
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY || ``);
    const from = signer.address || process.env.FROM;
    web3.eth.accounts.wallet.add(signer);
    const limit = await web3.eth.estimateGas(getEstimateGasParams({ web3, signer }),'latest',ETH_DATA_FORMAT).catch(err => ({err})); // prettier-ignore
    const tx = await getTx({ from, web3, limit });
    const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
    console.log('Raw transaction data: ' + signedTx.rawTransaction);
    // Sending the transaction to the network
    const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).once('transactionHash', onTransactionHash).catch((err) => ({ err })); // prettier-ignore
    // The transaction is now on chain!
    console.log(`Mined in block ${txHash.blockNumber}`);
}

const onTransactionHash = (txhash) => {
    console.log(`Mining transaction ...`);
    console.log(`https://${NETWORK}.etherscan.io/tx/${txhash}`);
};

const getTx = async ({ from, web3, limit }) => {
    const nonce = await web3.eth.getTransactionCount(from, `latest`);
    return {
        from,
        to: TO,
        value: web3.utils.toWei('0.01', 'ether'),
        gas: limit,
        nonce,
        maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
        maxFeePerGas: web3.utils.toWei('100', 'gwei'),
        chainId: 11155111,
        type: 0x2,
    };
};

main();

