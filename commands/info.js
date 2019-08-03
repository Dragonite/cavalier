const config = require("../botconfig.json");
const Discord = require('discord.js');
let pool = require('../sql');
let ehp = require('../utils/ehp')
const { colors, emojiGuild } = config;

// const exampleEmbed = new Discord.RichEmbed()
// .setColor(colors.info)
// .setTitle('Some title')
// .setURL(`${emoji} ${option} Information for ${rsn}`)
// // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
// .addField("Rank", player.Skills[option].rank.toLocaleString())
// .addField("Level", player.Skills[option].level.toLocaleString())
// .addField("XP", player.Skills[option].xp.toLocaleString())
// .addField('Inline field title', 'Some value here', true)
// .setTimestamp()
// .setFooter(rsn, message.author.avatarURL);

exports.run = (client, message, args, osrs) => {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getEmoji(skill) {
    return client.guilds.get(emojiGuild).emojis.find(emoji => emoji.name == skill)
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
  let option;
  if (args.length !== 0) {
    option = capitalizeFirstLetter(args[0].toLowerCase())
  }

  var emoji = client.guilds.get(emojiGuild).emojis.find(emoji => emoji.name == option);

  getRSN(message.author.id).then((result) => {
    console.log(result)
    if (result === null || result === undefined || result.length === 0) {
      message.channel.send(
        {
          embed: {
            color: colors.info,
            title: 'You have no RSN registered',
            description: 'To register your rsn, please type `.register YourRSNHere`.',
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'Bot'
            }
          }
        }
      )
    } else {
      if (args.length === 0) {
        const rsn = result[0].rsn;
        osrs.hiscores.getPlayer(rsn).then(player => {
          ehp.total(player).then(total => {
            const exampleEmbed = new Discord.RichEmbed()
              .setColor(colors.info)
              .setTitle(`${client.guilds.get(emojiGuild).emojis.find(emoji => emoji.name == 'Overall')} Information for ${rsn}`)
              .setDescription(`${rsn} has **${total.toLocaleString()}** efficient hours played.`)
              // https://oldschoolrunescape.fandom.com/wiki/Skills
              // Row 1
              .addField(getEmoji('Attack') + " " + player.Skills.Attack.level.toLocaleString(), "**EHP:** " + ehp.calc('Attack', player.Skills.Attack.xp).toLocaleString(), true)
              .addField(getEmoji('Hitpoints') + " " + player.Skills.Hitpoints.level.toLocaleString(), "**EHP:** " + ehp.calc('Hitpoints', player.Skills.Hitpoints.xp).toLocaleString(), true)
              .addField(getEmoji('Mining') + " " + player.Skills.Mining.level.toLocaleString(), "**EHP:** " + ehp.calc('Mining', player.Skills.Mining.xp).toLocaleString(), true)
              // Row 2
              .addField(getEmoji('Strength') + " " + player.Skills.Strength.level.toLocaleString(), "**EHP:** " + ehp.calc('Strength', player.Skills.Strength.xp).toLocaleString(), true)
              .addField(getEmoji('Agility') + " " + player.Skills.Agility.level.toLocaleString(), "**EHP:** " + ehp.calc('Agility', player.Skills.Agility.xp).toLocaleString(), true)
              .addField(getEmoji('Smithing') + " " + player.Skills.Smithing.level.toLocaleString(), "**EHP:** " + ehp.calc('Smithing', player.Skills.Smithing.xp).toLocaleString(), true)
              // Row 3
              .addField(getEmoji('Defence') + " " + player.Skills.Defence.level.toLocaleString(), "**EHP:** " + ehp.calc('Defence', player.Skills.Defence.xp).toLocaleString(), true)
              .addField(getEmoji('Herblore') + " " + player.Skills.Herblore.level.toLocaleString(), "**EHP:** " + ehp.calc('Herblore', player.Skills.Herblore.xp).toLocaleString(), true)
              .addField(getEmoji('Fishing') + " " + player.Skills.Fishing.level.toLocaleString(), "**EHP:** " + ehp.calc('Fishing', player.Skills.Fishing.xp).toLocaleString(), true)
              // Row 4
              .addField(getEmoji('Ranged') + " " + player.Skills.Ranged.level.toLocaleString(), "**EHP:** " + ehp.calc('Ranged', player.Skills.Ranged.xp).toLocaleString(), true)
              .addField(getEmoji('Thieving') + " " + player.Skills.Thieving.level.toLocaleString(), "**EHP:** " + ehp.calc('Thieving', player.Skills.Thieving.xp).toLocaleString(), true)
              .addField(getEmoji('Cooking') + " " + player.Skills.Cooking.level.toLocaleString(), "**EHP:** " + ehp.calc('Cooking', player.Skills.Cooking.xp).toLocaleString(), true)
              // Row 5
              .addField(getEmoji('Prayer') + " " + player.Skills.Prayer.level.toLocaleString(), "**EHP:** " + ehp.calc('Prayer', player.Skills.Prayer.xp).toLocaleString(), true)
              .addField(getEmoji('Crafting') + " " + player.Skills.Crafting.level.toLocaleString(), "**EHP:** " + ehp.calc('Crafting', player.Skills.Crafting.xp).toLocaleString(), true)
              .addField(getEmoji('Firemaking') + " " + player.Skills.Firemaking.level.toLocaleString(), "**EHP:** " + ehp.calc('Firemaking', player.Skills.Firemaking.xp).toLocaleString(), true)
              // Row 6
              .addField(getEmoji('Magic') + " " + player.Skills.Magic.level.toLocaleString(), "**EHP:** " + ehp.calc('Magic', player.Skills.Magic.xp).toLocaleString(), true)
              .addField(getEmoji('Fletching') + " " + player.Skills.Fletching.level.toLocaleString(), "**EHP:** " + ehp.calc('Fletching', player.Skills.Fletching.xp).toLocaleString(), true)
              .addField(getEmoji('Woodcutting') + " " + player.Skills.Woodcutting.level.toLocaleString(), "**EHP:** " + ehp.calc('Woodcutting', player.Skills.Woodcutting.xp).toLocaleString(), true)
              // Row 7
              .addField(getEmoji('Runecrafting') + " " + player.Skills.Runecrafting.level.toLocaleString(), "**EHP:** " + ehp.calc('Runecrafting', player.Skills.Runecrafting.xp).toLocaleString(), true)
              .addField(getEmoji('Slayer') + " " + player.Skills.Slayer.level.toLocaleString(), "**EHP:** " + ehp.calc('Slayer', player.Skills.Slayer.xp).toLocaleString(), true)
              .addField(getEmoji('Farming') + " " + player.Skills.Farming.level.toLocaleString(), "**EHP:** " + ehp.calc('Farming', player.Skills.Farming.xp).toLocaleString(), true)
              // Row 8
              .addField(getEmoji('Construction') + " " + player.Skills.Construction.level.toLocaleString(), "**EHP:** " + ehp.calc('Construction', player.Skills.Construction.xp).toLocaleString(), true)
              .addField(getEmoji('Hunter') + " " + player.Skills.Hunter.level.toLocaleString(), "**EHP:** " + ehp.calc('Hunter', player.Skills.Hunter.xp).toLocaleString(), true)
              .addField(getEmoji('Overall') + " Total Level", player.Skills.Overall.level.toLocaleString(), true)
              .setTimestamp()
              .setFooter(rsn, message.author.avatarURL);
            message.channel.send(exampleEmbed)
          }).catch(console.error)
        })
      } else if (args.length == 2 && args[0] === 'ehp' && args[1]) {
        osrs.hiscores.getPlayer(args[1])
          .then(player => {
            if (player.Skills.Overall.rank !== -1) {
              ehp.total(player).then(result => {
                message.channel.send(
                  {
                    embed: {
                      color: colors.info,
                      title: `${getEmoji('Overall')} Information for ${args[1]}`,
                      fields: [
                        {
                          name: "Rank",
                          value: player.Skills.Overall.rank.toLocaleString()
                        },
                        {
                          name: "Level",
                          value: player.Skills.Overall.level.toLocaleString()
                        },
                        {
                          name: "XP",
                          value: player.Skills.Overall.xp.toLocaleString()
                        },
                        {
                          name: "EHP",
                          value: result.toLocaleString()
                        }
                      ],
                      timestamp: new Date(),
                      footer: {
                        icon_url: client.user.avatarURL,
                        text: args[1]
                      }
                    }
                  }
                )
              }).catch(console.error);
            } else {
              message.channel.send(
                {
                  embed: {
                    color: colors.danger,
                    title: `This player does not exist!`,
                    description: 'Please try searching for a different player.',
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: args[1]
                    }
                  }
                }
              )
            }
          });
      } else {
        if (args[0].toLowerCase() === 'help') {
          message.channel.send(
            {
              embed: {
                color: colors.info,
                title: '.info Help',
                description: '\n**`.info`** is for finding out information about your skills.\n\n To begin, start by registering your RSN using **`.register YourRSNHere`**.',
                fields: [
                  {
                    name: "Current supported commands:",
                    value: "**`.info`** - An overall summary of each skill's level and EHP\n**`.info Overall`** - Your Overall statistics and EHP\n**`.info Skillname`** - Your statistics and EHP for the given skillname\n**`.info help`** - Brings up this interface"
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: 'NHM'
                }
              }
            }
          )
        } else {
          const rsn = result[0].rsn;
          osrs.hiscores.getPlayer(rsn).then(player => {
            if (player.Skills[option]) {
              ehp.total(player).then(result => {
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
                          value: option === 'Overall' ? result.toLocaleString() : ehp.calc(option, player.Skills[option].xp).toLocaleString()
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

              }
              ).catch(console.error)
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
        }
      }
    }
  })
}

exports.help = {
  name: 'info'
}