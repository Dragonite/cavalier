const config = require("../botconfig.json");
let pool = require('../sql');
let ehp = require('../utils/ehp')
const { colors, emojiGuild } = config;

exports.run = (client, message, args, osrs) => {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function getRSN(id) {
    let query = `SELECT rsn FROM users WHERE discord_id=${id}`;
    return new Promise((resolve, reject) => {
      pool.query(query, function (err, result) {
        if (err) throw err;
        resolve(result)
      })
    })
  }

  let option = capitalizeFirstLetter(args[0].toLowerCase())
  var emoji = client.guilds.get(emojiGuild).emojis.find(emoji => emoji.name == option);

  getRSN(message.author.id).then((result) => {
    console.log(result)
    if (result !== []) {
      const rsn = result[0].rsn;
      osrs.hiscores.getPlayer(rsn).then(player => {
        if(player.Skills[option]){
          message.channel.send(
            {
              embed: {
                color: colors.info,
                title: `${emoji} ${option} Information for ${rsn}`,
                fields: [
                  {
                    name: "Rank",
                    value: player.Skills[option].rank.toLocaleString()
                  },
                  {
                    name: "Level",
                    value: player.Skills[option].level.toLocaleString()
                  },
                  {
                    name: "XP",
                    value: player.Skills[option].xp.toLocaleString()
                  },
                  {
                    name: "EHP",
                    value: ehp.calc(option, player.Skills[option].xp).toLocaleString() || 'Error'
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: message.author.avatarURL,
                  text: rsn
                }
              }
            }
          )
        } else {
          message.channel.send(
            {
              embed: {
                color: colors.danger,
                title: `Error`,
                description: 'That skill does not exist. Please try again.',
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "NHM"
                }
              }
            }
          )
        }
      })
    } else {

    }
  })
}

exports.help = {
  name: 'info'
}