const Drive = require('@telios/nebula-drive');
const DHT = require('@hyperswarm/dht');

(async () => {
  const keyPair = DHT.keyPair();

  const drive = new Drive(__dirname + "/drive", "170ac7b9bb280312427ea89ea31cb8d485c1e3be2f4eb8609f050b64cab046f4", {
    keyPair,
    swarmOpts: {
      server: true,
      client: true
    }
  });

  await drive.ready();

  await drive.addPeer('8f751f910de4883fd6b9193477b73b06da643390df5f442d6763c837ffcf86cd');

  console.log('Diff Key ==> ', drive.diffFeedKey);
  console.log('Public Key ==> ', drive.publicKey);

})();