var tessel = require('tessel');
var infraredlib = require('ir-attx4');
var infrared = infraredlib.use(tessel.port['B']);
var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);
const opn = require('opn');

var path = require('path');
// var av = require('tessel-av');




const userRFID = {}
let currentUser = ''
let currentSong = ''
const bufferObject = []

let i = 0
// If we get data, push to database
// infrared.on('data', function (data) {
//   if (i < 2) {
//     bufferObject.push({ name: i, bufferObj: JSON.stringify(data) })
//     console.log("Received RX Data: ", bufferObject);
//     i++
//   } else {
// currentSong = userRFID[currentUser][JSON.stringify(data)]
// console.log(JSON.stringify(data), userRFID[currentUser], currentSong);
// opn(currentSong)
//     //Play song currentSong
//     // var sound = new av.Speaker(currentSong);

//     // sound.play();

//     // sound.on('ended', function(seconds) {
//     // sound.play();
//     // });
//   }
// });

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function (card) {
    if (i < 2) {
      userRFID[card.uid.toString('hex')] = 'https://www.youtube.com/watch?v=FTQbiNvZqaY'
      i++
    } else {
      currentSong = userRFID[currentUser]
      console.log(userRFID[currentUser], currentSong);
      opn(currentSong)

      currentUser = card.uid.toString('hex')
      console.log('UID:', card.uid.toString('hex'));
      console.log(userRFID)
    }
  })

  rfid.on('error', function (err) {
    console.error(err);
  });



// // When we're connected
// infrared.on('ready', function () {
//   console.log("Connected to IR!");
//   // Start sending a signal every three seconds
//   setInterval(function () {
//     // Make a buffer of on/off durations (each duration is 16 bits)
//     var powerBuffer = new Buffer([0x22, 0xc4, 0xee, 0xd0, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x8a, 0xf9, 0xf2, 0x2, 0x8a, 0xf9, 0xc0, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x8a, 0xfe, 0x3e, 0x2, 0x8a, 0xfe, 0x3e, 0x2, 0x8a, 0xf9, 0xc0, 0x2, 0x58, 0xf9, 0xc0, 0x2, 0x8a, 0xfe, 0x3e, 0x2, 0x8a, 0xf9, 0xc0, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x8a, 0xfe, 0x3e, 0x2, 0x8a, 0xf9, 0xc0, 0x2, 0x58, 0xf9, 0xc0, 0x2, 0x8a, 0xf9, 0xf2, 0x2, 0x8a, 0xf9, 0xc0, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x8a, 0xfe, 0x3e, 0x2, 0x8a, 0xfe, 0x3e, 0x2, 0x8a, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xfe, 0xc, 0x2, 0x58, 0xf9, 0xc0, 0x2, 0x8a, 0xf9, 0xc0, 0x2, 0x58, 0xf9, 0xc0, 0x2, 0x58, 0xf9, 0xc0, 0x2, 0x58]);
//     Send the signal at 38 kHz
//     infrared.sendRawSignal(38, powerBuffer, function (err) {
//       if (err) {
//         console.log("Unable to send signal: ", err);
//       } else {
//         console.log("Signal sent!");
//       }
//     });
//   }, 3000); // Every 3 seconds
// });
