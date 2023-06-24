// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const fs = require('fs')
const JSZip = require("jszip")

// get rid of file
fs.unlink("../img/members.txt", (err) => {
	if (err) throw err //handle your error the way you want to;
	console.log('path/file.txt was deleted');//or else the file will be deleted
	});
	
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

// Log in to Discord with your client's token
client.login(token);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	const guild = client.guilds.resolve("767114102153019442");

	// Fetch the members of the guild and log them
	guild.members.fetch()
		.then((members)=>
			members.each((member) => {
				fs.appendFile('../img/members.txt', member.displayAvatarURL() + "\n", (err) => {
					// In case of a error throw err.
					if (err) throw err;
				})
				
			}
				

			)
			)
		.catch(console.error);

});
