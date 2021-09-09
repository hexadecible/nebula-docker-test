const Drive = require('@telios/nebula-drive');
const DHT = require('@hyperswarm/dht');
const ipc = require('hyper-ipc')('somesupersecrettopic');

(async () => {
  const keyPair = DHT.keyPair();
  const peerKey = '';

  const drive = new Drive(__dirname + "/server_drive", peerKey, {
    keyPair,
    swarmOpts: {
      server: true,
      client: true
    }
  });

  drive.on('file-sync', (file) => {
    console.log('FILE', file);
  });

  await drive.ready();

  ipc.serve('addPeer', async (query, callback) => {
    console.log('ADDING PEER...');
    await drive.addPeer(query.toString());

    callback(null, 'done');
  });

  ipc.run('addPeer', drive.diffFeedKey, (err, data) => {
    if (err) return console.error(err);

    console.log('PEER ADDED');
  });

  console.log('Public Key ==> ', drive.publicKey);
  console.log('Diff Key ==> ', drive.diffFeedKey);
})();
