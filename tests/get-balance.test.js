// getEtherBalance.test.js
const {getEtherBalance} = require('../src/get-balance'); // Adjust the path to your function file


describe('Balance', () => {
    test('Should be able to read the balance of a given address.', async () => {
        const balance = await getEtherBalance();
        expect(typeof balance).toBe('number');
        expect(balance).toBeCloseTo(0.942247891432223, 15);
    });
});

