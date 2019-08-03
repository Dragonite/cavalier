const config = require("../botconfig.json");
let pool = require('../sql');
const { colors } = config;

exports.run = (client, message, args, osrs) => {

  async function createUser(id, rsn) {
    let query = `INSERT IGNORE INTO users (discord_id, rsn) VALUES ("${id}", "${rsn}")`;
    return new Promise((resolve, reject) => {
      pool.query(query, function (err, result) {
        if (err) throw err;
        resolve(result)
      })
    })
  }

  let rsn = args[0]

  createUser(message.author.id, rsn).then((result) => {
    if (result === null || result === undefined || result.affectedRows === 0) {
      message.channel.send(
        {
          embed: {
            color: colors.warning,
            title: `You are already registered!`,
            description: 'If you would like to change your RSN, please contact an Administrator.',
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'NHM'
            }
          }
        }
      )
    } else {
      message.channel.send(
        {
          embed: {
            color: colors.success,
            title: "Profile created successfully!",
            timestamp: new Date(),
            footer: {
              icon_url: message.author.avatarURL,
              text: message.author.username
            }
          }
        }
      )
    }
  })
}

exports.help = {
  name: 'register'
}