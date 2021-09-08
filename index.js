const Drive = require('@telios/nebula-drive');
const DHT = require('@hyperswarm/dht');

(async () => {
  const keyPair = DHT.keyPair();

  const drive = new Drive(__dirname + "/drive", null, {
    keyPair,
    swarmOpts: {
      server: true,
      client: true
    }
  });

  await drive.ready();

  console.log('Diff Key ==> ', drive.diffFeedKey);
  console.log('Public Key ==> ', drive.publicKey);

})();
