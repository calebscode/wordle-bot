const { Client, Intents } = require('discord.js');
const { table } = require('table');
const { rows } = require('./leaderboard.json');

require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

function getLeaderboard() {
    // create table here
    let tableData = [];
    let currentRow = [];

    const header = ['Rank', 'Name', 'Avg', 'Misses'];
    tableData.push(header);

    for (let i = 0; i < rows.length; i++) {
        console.log(rows[i]);
        currentRow = [];
        currentRow.push(rows[i].rank);
        currentRow.push(rows[i].name);
        currentRow.push(rows[i].average);
        currentRow.push(rows[i].misses);

        tableData.push(currentRow);
    }
    
    return '`' + table(tableData) + '`';
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Listen for commands and respond accordingly
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand) return;

    const { commandName } = interaction;

    if (commandName == 'leaderboard') {
        await interaction.reply(getLeaderboard());
    }
});

// Login to Discord with your client's token
client.login(token);