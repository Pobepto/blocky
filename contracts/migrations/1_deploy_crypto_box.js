const CryptoBox = artifacts.require("CryptoBox");
const CryptoBoxDB = artifacts.require("CryptoBoxDB");

module.exports = async (deployer) => {
  await deployer.deploy(CryptoBoxDB)
  const db = await CryptoBoxDB.deployed()
  await deployer.deploy(CryptoBox, db.address)
  const game = await CryptoBox.deployed()

  console.log("CryptoBox address:", game.address)
}
