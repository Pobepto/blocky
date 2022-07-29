const CryptoBox = artifacts.require("./CryptoBox.sol")

contract("CryptoBox", accounts => {
  it("should something", async () => {
    const cryptoBoxInstance = await CryptoBox.deployed()
  })
})
