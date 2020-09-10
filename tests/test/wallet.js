const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
	let wallet = null;
	before(async () => {
		wallet = await Wallet.deployed();
	});

	it("Should create a transfer", async () => {
		let to = accounts[5];
		approver = accounts[0];
		await wallet.createTransfer(1000, to, { from: approver });
		let transfer = await wallet.transfers(0);
		assert(transfer.id.toNumber() === 0);
	});
});
