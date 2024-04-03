const express = require("express");
const app = express();
const requestIp = require('request-ip')
const { networkInterfaces } = require('os');



app.get('/', async (req, res)=>{
 const clientIp = requestIp.getClientIp(req);

const nets = networkInterfaces();
 const results = Object.create(null);
 
 for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
      if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
              results[name] = [];
          }
          results[name].push(net.address);
      }
  }
}
  res.send(`Your IP Address is ${results["en0"][0]}.`)
})
app.listen(3000, ()=>{
    console.log('runnig server')
});

