const express = require("express");
const app = express();

app.listen(() => console.log("start GiveawayNates"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');

//لا تلعب اي شي في الكود



const prefix = "gn!"
const developers = "732410630157369364"

////////////////////////////

 
  client.on('message',async message => {
  var room;
  var title;
  var duration;
  var gMembers;
  var filter = m => m.author.id === message.author.id;
  if(message.content.startsWith(prefix + "start")) {
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| ** <a:alert:642733642614964229> You dont have permission **');
    message.channel.send(`:eight_pointed_black_star:| **Please write the giveaway channel !**`).then(msgg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name', collected.first().content);
        if(!room) return message.channel.send(':heavy_multiplication_x:| **I cant find the channel**');
        room = collected.first().content;
        collected.first().delete();
        msgg.edit(':eight_pointed_black_star:| **  Write the duration of this giveaway with munites  , for example : 60**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **You need to specify the correct time.. ``Please write the command agin !``**');
            duration = collected.first().content * 60000;
            collected.first().delete();
            msgg.edit(':eight_pointed_black_star:| **Finally write the giveaway prize**').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                   .setColor("PURPLE")
                   .setThumbnail('https://cdn.discordapp.com/emojis/687073834863558660.gif?v=1')
                  .setAuthor(message.guild.name, message.guild.iconURL)
                  .setTitle(title)
                  .setDescription(`Duration :timer:   : ${duration / 60000} Minutes`)
                  .setFooter(message.author.username, message.author.avatarURL);
                  message.guild.channels.find('name', room).send(giveEmbed).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users;
                       let list = users.array().filter(u => u.id !== m.author.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0];
                         if(users.size === 1) gFilter = '** <a:alert:642733642614964229> I cant specify **';
                       let endEmbed = new Discord.RichEmbed()
                        .setColor("BLUE")
                    .setThumbnail('https://cdn.discordapp.com/attachments/753651323257487492/754357928374566942/giveaeaea.png')
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .addField('The giveaway is ended  !',` The winner is : ${gFilter} <a:partying_face:767956417772257370>`)
                       .setFooter(message.guild.name, message.guild.iconURL);
                       m.edit(endEmbed);
                     },duration);
                   });
                  msgg.edit(`:heavy_check_mark:| **A giveaway has been set up**`);
                } catch(e) {
                  msgg.edit(`:heavy_multiplication_x:| **I am unable to setup Giveaway due to lack of features**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  }
});






client.login(process.env.token);