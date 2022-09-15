const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey10';

const passHash = pass => bcrypt.hashSync(pass, 10);
const passCompare = (pass, hash) => bcrypt.compareSync(pass, hash);

const tokenSign = payload => jwt.sign(payload, secretKey); // alias access_token
const tokenVerify = token => jwt.verify(token, secretKey);

const SpotifyWebApi = require('spotify-web-api-node');

const spotify = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: '15faa2233e544c6b9159d67899e0888b',
    clientSecret: '5a0c6273104d4f61b6e5542afd91fcc0',
  });
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body['access_token']);
  return spotifyApi;
};

module.exports = { spotify, passHash, passCompare, tokenSign, tokenVerify };
