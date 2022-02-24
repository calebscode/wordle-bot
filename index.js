const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { RequestManager } = require('@discordjs/rest');


require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Read command files and associate them with the client
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// When the client is ready, let me know
client.once('ready', () => {
	console.log('Ready!');
});

// Listen for commands and respond accordingly
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply({ content: 'There was an error while fetching the current leaderboard!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(token);