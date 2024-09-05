// getEtherBalance.test.js
const Web3 = require('web3');
const { getEtherBalance } = require('./path/to/your/file'); // Adjust the path to your function file

// Mocking Web3 to prevent actual network requests during tests
jest.mock('web3', () => {
    const mWeb3 = {
        eth: {
            getBalance: jest.fn(),
        },
        utils: {
            fromWei: jest.fn(),
        },
    };
    return jest.fn(() => mWeb3);
});

describe('getEtherBalance', () => {
    let web3;

    beforeEach(() => {
        web3 = new Web3();
    });

    it('should fetch the balance of the given address', async () => {
        const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
        const mockBalance = '1000000000000000000'; // 1 ETH in Wei
        const expectedBalance = '1';

        // Mocking getBalance and fromWei
        web3.eth.getBalance.mockResolvedValue(mockBalance);
        web3.utils.fromWei.mockReturnValue(expectedBalance);

        const balance = await getEtherBalance(mockAddress);
        expect(web3.eth.getBalance).toHaveBeenCalledWith(mockAddress);
        expect(balance).toBe(mockBalance);
        expect(web3.utils.fromWei).toHaveBeenCalledWith(mockBalance, 'ether');
    });

    it('should handle errors gracefully', async () => {
        const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
        const errorMessage = 'Error fetching balance';

        // Mocking getBalance to throw an error
        web3.eth.getBalance.mockRejectedValue(new Error(errorMessage));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        const balance = await getEtherBalance(mockAddress);
        expect(balance).toBeUndefined(); // Assuming the function returns undefined on error
        expect(consoleSpy).toHaveBeenCalledWith('An error occurred while fetching the balance:', expect.any(Error));

        consoleSpy.mockRestore();
    });
});
