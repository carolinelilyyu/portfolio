// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const fs = require('fs')
const JSZip = require("jszip")
var http = require('https');

// get rid of file
if(fs.existsSync("../img/members.txt")){
	fs.unlink("../img/members.txt", (err) => {
		if (err) throw err //handle your error the way you want to;
		console.log('path/file.txt was deleted');//or else the file will be deleted
		});	
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

// Log in to Discord with your client's token
client.login(token);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	const guild = client.guilds.resolve("767114102153019442");
	var iteration = 0
	// Fetch the members of the guild and log them
	guild.members.fetch()
		.then((members)=>
			members.each((member) => {
				iteration = iteration + 1;
				fs.appendFile('../img/members.txt', member.displayAvatarURL() + "\n", (err) => {
					// In case of a error throw err.
					if (err) throw err;
				})
				
				const file = fs.createWriteStream("../img/" + iteration + ".jpg");
				const request = http.get( member.displayAvatarURL(), function(response) {
					response.pipe(file);

					// after download completed close filestream
					file.on("finish", () => {
						file.close();
						console.log("Download Completed");
					});
				});
				console.log(request)
				// downloadImage(member.displayAvatarURL())
				// async function downloadImage(imageSrc) {
				// 	const image = await fetch(imageSrc)
				// 	const imageBlog = await image.blob()
				// 	const imageURL = URL.createObjectURL(imageBlog)
				// 	const imageName = '../img/test1.webp';
				// 	fs.createWriteStream(imageName).write(imageURL);

					// console.log(imageURL)
					// const link = document.createElement('a')
					// link.href = imageURL
					// link.download = 'image file name here'
					// document.body.appendChild(link)
					// link.click()
					// document.body.removeChild(link)
				// }
			}
				

			)
			)
		.catch(console.error);

});
