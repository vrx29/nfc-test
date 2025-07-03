const { NFC } = require('nfc-pcsc');

const nfc = new NFC(); // optionally pass logger

nfc.on('reader', reader => {
  console.log(`🟢 Reader detected: ${reader.name}`);

  reader.on('card', async card => {
    console.log(`📱 Card detected:`, card);

    try {
      // SELECT command (Example AID for NDEF, modify as per use)
      const selectNdef = Buffer.from([
        0x00, // CLA
        0xA4, // INS
        0x04, // P1
        0x00, // P2
        0x07, // Length
        0xD2, 0x76, 0x00, 0x00, 0x85, 0x01, 0x01, // NDEF AID
        0x00  // Le
      ]);

      const response = await reader.transmit(selectNdef, 40);
      console.log(`📨 Response:`, response.toString('hex'));
    } catch (err) {
      console.error('❌ Error reading tag', err);
    }
  });

  reader.on('card.off', card => {
    console.log(`❎ Card removed:`, card);
  });

  reader.on('error', err => {
    console.error(`💥 Error (${reader.name}):`, err);
  });

  reader.on('end', () => {
    console.log(`🔴 Reader removed: ${reader.name}`);
  });
});

nfc.on('error', err => {
  console.error('💥 NFC error:', err);
});
