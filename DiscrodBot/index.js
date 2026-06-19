const {Client, GatewayIntentBits} = require("discord.js")
const clients = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

clients.on('messageCreate', (message)=>{
    if (message.author.bot)return;
    if (message.content.startsWith("create")){
        const url = message.content.split('create')[1]
        return message.reply({
            content: "Generating short id for url "+url
        })
    }
    message.reply({content: "Hi from bot"})
})

clients.on("interactionCreate",(interaction)=>{
    console.log(interaction)
    interaction.reply("Pong!!")
})

clients.login("MTUxNzU2NTc2NTY0NDA1ODY4NA.GyMo2Q.apzDTHIbyDbFpt8cFJApH7aEGJhM41K0SCGkUY")