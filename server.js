const fs = require('fs');
const Drive = require('@telios/nebula-drive');
const DHT = require('@hyperswarm/dht');

(async () => {
  const keyPair = DHT.keyPair();
  const peerDiffKey = null; // Add peer diff key to begin sync

  const drive = new Drive(__dirname + "/drive", null, {
    keyPair,
    swarmOpts: {
      server: true,
      client: true
    }
  });

  await drive.ready();

  const readStream = fs.createReadStream(__dirname + '/test_file.txt');
  await drive.writeFile('/test_file.txt', readStream);

  //await drive.addPeer(peerDiffKey);

  console.log('Public Key ==> ', drive.publicKey);
  console.log('Diff Key ==> ', drive.diffFeedKey);
})();
