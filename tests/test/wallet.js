const { expectRevert } = require("@openzeppelin/test-helpers");
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
		let approver = accounts[5];
		await expectRevert(
			wallet.createTransfer(1000, to, { from: approver }),
			"only approver allowed"
		);
	});
	it("Should not send transfer if not enough approvers", async () => {
		/**
		 *	1. get balance
		 *	2. createTransfer with a non-approver
		 *	3. get balance
		 *	4. compare balance
		 *	5. assert
		 */
		let to = accounts[5];
		let approver = accounts[0];
		const initialBalance = web3.utils.toBN(await web3.eth.getBalance(to));
		await wallet.createTransfer(1000, to, { from: approver });
		await wallet.sendTransfer(0, { from: approver });
		const finalBalance = web3.utils.toBN(await web3.eth.getBalance(to));
		assert(finalBalance.sub(initialBalance).isZero());
	});
});
