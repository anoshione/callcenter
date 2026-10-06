const fs = require('fs');

const buf = fs.readFileSync('c:\\Users\\anosh\\Documents\\Call Center\\screenshot\\ref-site-01.png');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log('ref-site-01.png dimensions:', width, 'x', height);
