import textToSpeech from "@google-cloud/text-to-speech";
// Imports the Texttospeech library
// const {TextToSpeechClient} = require('@google-cloud/text-to-speech').v1;

// Instantiates a client
// const texttospeechClient = new TextToSpeechClient();

export async function callListVoices() {
  // Construct request
  const request = {};

  // Run request
  const response = await client.listVoices(request);
  console.log(response);
  return response;
}

// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

export async function quickStart() {
  // The text to synthesize
  const text = "hello, world!";

  const ssml = `
  <speak>
  <voice name="es-US-Neural2-A">
  
  <prosody rate="0.9" pitch="-5st" >Hola, la palabra del dia es </prosody >

  </voice>
  <break time="250ms"/>

  <prosody rate="0.9" >Automation</prosody >

  
  <break time="250ms"/>
  <voice name="es-US-Neural2-A"> 
<prosody rate="0.8" pitch="-5st" >Significa Automatizar  </prosody >
</voice>
  <break time="250ms"/>
  <prosody rate="0.6" pitch="-1st" volume="1">Automation</prosody >

  <break time="250ms"/>

  <voice name="es-US-Neural2-A"> Ejemplo </voice>
  <break time="250ms"/>
  
<prosody rate="0.8" pitch="-1st" > 
  The company says its automation process helps engineers to cut chip designing time by up to 90%
</prosody >
  
  <voice name="es-US-Neural2-A"> 
<prosody rate="0.9" pitch="-5st" >suscríbete y aprende mas, app inglés, Bye bye   </prosody >

</voice>
  </speak>
  `
  ;

  // Construct the request
  const request: any = {
    input: { ssml: ssml },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: "en-US",
      name: "en-US-Neural2-F",
    //   ssmlGender: "NEUTRAL",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");
}
