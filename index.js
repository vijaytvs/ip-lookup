const express = require("express");
const app = express();
const requestIp = require('request-ip')
app.get('/', async (req, res)=>{
 const clientIp = requestIp.getClientIp(req)
  res.send(`Your IP Address is ${clientIp}.`)
})
app.listen(3000, ()=>{
    console.log('runnig server')
});