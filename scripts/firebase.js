const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');
let db = undefined;

function init() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://chatventure-af118-default-rtdb.europe-west1.firebasedatabase.app',
  });
  db = admin.database();
}

async function getUserSnapshot(userId) {
  var ref = db.ref(`users/${userId}`);
  return await ref.once('value');
}

async function setUser(id, user) {
  let ref = db.ref('users');
  ref.child(id).set(user);
}

module.exports = { init, getUserSnapshot, setUser };
