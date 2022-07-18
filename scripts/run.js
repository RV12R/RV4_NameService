const main = async () => {
  // The first return is the deployer, the second is a random account
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("space");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  const startEstimate = await domainContract.estimateGas.register("rv");

  let txn = await domainContract.register("rv", {  gasLimit: startEstimate, });
  await txn.wait();

  const address = await domainContract.getAddress("rv");
  console.log("Owner of domain rv:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain()