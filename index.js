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

  // await drive.addPeer('b8f6a9ebef18e167f3e46405a3ec4ad6f9b558b65750caa9948a5fb3d4e5752d');

  console.log('Diff Key ==> ', drive.diffFeedKey);
  console.log('Public Key ==> ', drive.publicKey);

})();