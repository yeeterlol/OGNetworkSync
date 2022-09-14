// Load discord.js
require('dotenv').config();

const {
    Client,
    Intents
  } = require('discord.js')
  // Create Discord intentions, required in v13
  const intents = new Intents(['GUILDS', 'GUILD_MESSAGES'])
  // Create Discord client
  const client = new Client({
    intents
  })
  
  let channel = process.env.DISCORD_CHANNEL
  
  // Load mineflayer
  const mineflayer = require('mineflayer')
  const bot = mineflayer.createBot({
    host: "og-network.net",
    port: "25565",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    version: process.env.VERSION,
    auth: "microsoft"
  })
  
  client.on('ready', () => {
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
    // Find the Discord channel messages will be sent to
    channel = client.channels.cache.get(channel)
  })
  
  // Redirect Discord messages to in-game chat
  client.on('messageCreate', message => {
    // Only handle messages in specified channel
    if (message.channel.id !== channel.id) return
    // Ignore messages from the bot itself
    if (message.author.id === client.user.id) return
    bot.chat(`/gc ${message.author.username}: ${message.content}`)
  })
  
  // Redirect in-game messages to Discord channel
  bot.on('chat', (username, message) => {
    // Ignore messages from the bot itself
    if (username.startsWith("Guild") === false) return
    if (message.startsWith(`[Tribute] ${proccess.env.USERNAME}`) === true) return
    if (username === bot.username) return
    
    channel.send(`${username}: ${message}`)
  })
  
  // Login Discord bot
  client.login(process.env.TOKEN)
