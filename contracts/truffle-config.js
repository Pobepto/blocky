require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

const privateKey = process.env["PRIVATE_KEY"]

module.exports = {
  networks: {
    local: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    mumbai: {
      provider: () => new HDWalletProvider(privateKey, "https://rpc-mumbai.maticvigil.com"),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      chainId: 80001
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    }
  },
  db: {
    enabled: true
  }
}
