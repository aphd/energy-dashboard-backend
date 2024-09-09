// getEtherBalance.test.js
const {testInfuraConnection} = require('../src/connection'); // Adjust the path to your function file


describe('Connection', () => {
    test('Verify that the web interface successfully connects to the blockchain network.', async () => {
        const block = await testInfuraConnection();
		console.log(`message: ${block}`);
        expect(typeof block).toBe('bigint');
    });
});

