const express = require("express");
const router = express.Router({ mergeParams: true });
const api = require('axios');
const crypto = require('crypto');
const ts = Date.now();
const limit = 20;
const {PRIVATE_KEY, API_KEY} = process.env;

router.get('/', (req, res) => {
  const page = Number(req.query.page);
  let offset = (page-1) * limit;
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + API_KEY).digest("hex");

  api.get('https://gateway.marvel.com:443/v1/public/characters', {params: {
    apikey: API_KEY,
    hash,
    ts,
    limit,
    offset
  }})
  .then(response => {
    const { total, results } = response.data.data;
    let totalPage = 0;
    
    totalPage = Math.trunc(total/limit);
    if((total%limit)>0) {
      totalPage++
    }
     
    return res.status(200).json({results, total,  totalPage});
  });
});


module.exports = router;