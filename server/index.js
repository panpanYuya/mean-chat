const express = require('express');

const app = express();

app.get('/chat',  function(req, res) {
  res.json({'success': true})
})

const PORT = process.env.PORT || '3001'

app.listen('3001', function() {
  console.log('I am running')
})
