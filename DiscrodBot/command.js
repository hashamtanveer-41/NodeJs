const {REST,Routes} = require("discord.js")
const commands = [
    {
        name: 'create',
        description: "Creates a new short URL"
    },
]
const rest = new REST({version: "10"}).setToken("MTUxNzU2NTc2NTY0NDA1ODY4NA.GyMo2Q.apzDTHIbyDbFpt8cFJApH7aEGJhM41K0SCGkUY");

(async () => {
    try{
        console.log("Started")
        await rest.put(Routes.applicationCommands("1517565765644058684"), {
            body: commands,
        });
        console.log("Successfully")
    }catch (error){
        console.log(error)
    }
})();