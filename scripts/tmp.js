#!/bin/node
const fs = require('fs');

const file = fs.readFileSync(`./tmp/index.txt`, 'utf-8');
fs.writeFileSync(`index.js`, file);
