const Drive = require('@telios/nebula-drive');
const DHT = require('@hyperswarm/dht');

(async () => {
  const keyPair = DHT.keyPair();
  const peerDiffKey = null; // Add peer diff key to begin sync

  const drive = new Drive(__dirname + "/drive", peerDiffKey, {
    keyPair,
    swarmOpts: {
      server: true,
      client: true
    }
  });

  await drive.ready();

  // await drive.addPeer('add peer diff key here');

  console.log('Public Key ==> ', drive.publicKey);
  console.log('Diff Key ==> ', drive.diffFeedKey);
})();
