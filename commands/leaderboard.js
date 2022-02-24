const { SlashCommandBuilder } = require('@discordjs/builders');
const { table } = require('table');
const { rows } = require('../leaderboard.json');

// Response to the /leaderboard command
function getLeaderboard() {
    // create table here
    let tableData = [];
    let currentRow = [];

    const header = ['Rank', 'Name', 'Avg'];
    tableData.push(header);

    for (let i = 0; i < rows.length; i++) {

        currentRow = [];
        currentRow.push(rows[i].rank);
        currentRow.push(rows[i].name);
        currentRow.push(rows[i].average);

        tableData.push(currentRow);
    }
    
    return '`' + table(tableData) + '`';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Displays the current Wordle leaderboard.'),
    async execute(interaction) {
        await interaction.reply(getLeaderboard());
    }
}