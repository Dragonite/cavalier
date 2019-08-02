const config = require("../botconfig.json");
const { colors } = config;

exports.run = async (client, message, args, osrs) => {
  osrs.hiscores.getPlayer("Divine")
    .then(player => {
        console.log(player)
        message.channel.send(`Divine has ${player.Skills.Overall.xp} total experience`)
    });
}

exports.help = {
  name: 'profile'
}