const fs = require('fs');
const Drive = require('@telios/nebula-drive');
const DHT = require('@hyperswarm/dht');
const ipc = require('hyper-ipc')('somesupersecrettopic');

(async () => {
  const keyPair = DHT.keyPair();

  const drive = new Drive(__dirname + "/client_drive", null, {
    keyPair,
    swarmOpts: {
      server: true,
      client: true
    }
  });

  await drive.ready();

  if (!fs.existsSync(__dirname + '/client_drive/Files/test_file.txt')) {
    const readStream = fs.createReadStream(__dirname + '/test_file.txt');
    await drive.writeFile('/test_file.txt', readStream);
  }

  ipc.serve('addServerPeer', async (query, callback) => {
    console.log('ADDING SERVER PEER...');
    await drive.addPeer(query.toString());

    ipc.run('addClientPeer', drive.diffFeedKey, (err, data) => {
      if (err) return console.error(err);

      console.log('CLIENT PEER ADDED');
    });

    callback(null, 'done');
  });

  console.log('Public Key ==> ', drive.publicKey);
  console.log('Diff Key ==> ', drive.diffFeedKey);
})();
