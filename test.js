const morse = require('morse-decoder');
const encoded = morse.encode('SOS'); // ... --- ...
const decoded = morse.decode('... --- ...'); // SOS
const characters = morse.characters(); // {'1': {'A': '.-', ...}, ..., '11': {'ㄱ': '.-..', ...}}
const audio = morse.audio('SOS');
audio.play(); // play audio
audio.stop(); // stop audio
audio.exportWave(); // download audio wave file (promise)
const url = await audio.getWaveUrl(); // get audio wave url (promise)
const blob = await audio.getWaveBlob(); // get audio wave blob (promise)