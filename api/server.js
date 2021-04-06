const express = require('express');
const request = require('request');
const yelp = require('yelp-fusion');
const client = yelp.client('dI0U12otFbB2R3lTzXpowD0FBRfLW5WYuFeNjPmrWo2qVyqnQBOzCmMzprP-nVAD2HnDDfj1Bg9dCQypQBb0ZH0J82IG0udm8xG8UvDloQ7hwwpUjNKaFaiQgRRsYHYx');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/businesses/search', (req, res) => {
  client.search({
	  term: req.query.term || "",
	  location: 'Naperville, IL',
	}).then(response => {
	  res.send(response.jsonBody);
	}).catch(e => {
	  console.log(e);
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));