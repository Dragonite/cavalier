const config = require("./botconfig.json");
const Discord = require('discord.js');
const osrs = require("osrs-wrapper");
const fs = require('fs');
const Enmap = require('enmap');
const client = new Discord.Client();

const { prefix, token, activity } = config;

client.commands = new Enmap();

client.on("ready", () => {
  console.log(`Discord Connected!\nLogged in as ${client.user.tag}.`);
  // Set bot activity
  client.user.setActivity(activity, { type: 'WATCHING' });
});

client.on('message', message => {

  // Checking for infinite bot loop, check if message begins with prefix
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Get arguments for space separated commands
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  args.shift();

  // Get arguments for new line separated commands
  const getCommandFromArgs = message.content.slice(prefix.length).trim().split(/[\n\r\s]+/g);
  const command = getCommandFromArgs.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args, osrs);
});

fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];
    console.log(`Loaded command '${cmdName}'.`)
    client.commands.set(cmdName, props);
  })
});

client.login(token)