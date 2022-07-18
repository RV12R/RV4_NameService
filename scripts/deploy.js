const main = async () => {
    // The first return is the deployer, the second is a random account
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("space");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);
  
    // const startEstimate = await domainContract.estimateGas.register("rv");

    let txn = await domainContract.register("rv", {value: hre.ethers.utils.parseEther('0.001')});
    await txn.wait();
    console.log("Minted domain rv.space");

    txn = await domainContract.setRecord("rv", "This was my first DNS");
  await txn.wait();
  console.log("Set record for rv.space");
  
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