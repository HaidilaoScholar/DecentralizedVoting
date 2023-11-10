const hre = require("hardhat");

async function main() {
  const contractName = "BlockchainVoting";

  // deploy contract
  const contractFactory = await hre.ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
  console.log("Contract deployed to:", contract.target);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
