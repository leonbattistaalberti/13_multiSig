const { expectRevert } = require("@openzeppelin/test-environment");
const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
	let wallet = null;
	before(async () => {
		wallet = await Wallet.deployed();
	});

	it("Should create a transfer", async () => {
		let to = accounts[5];
		let approver = accounts[0];
		await wallet.createTransfer(1000, to, { from: approver });
		let transfer = await wallet.transfers(0);
		assert(transfer.id.toNumber() === 0);
	});
	it("Should not create transfer if not approver", async () => {
		let to = accounts[5];
		let approver = accounts[0];
		await expectRevert(
			wallet.createTransfer(1000, to, { from: approver }),
			"only approver allowed"
		);
	});
});
