const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.info = {
    name: 'servers',
    description: 'manages servers minecraft',
    argument: false,
    group: 'modules',
    info: 'TO DO',
    slash: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('manages servers minecraft')
        .addSubcommand(s => 
            s.setName('create')
            .setDescription('everyone can create a one day test server !')
        )
        .addSubcommand(s => 
            s.setName('list')
            .setDescription('Are there a little place for a poor little server ?')
        ).addSubcommand(s => 
            s.setName('remove')
            .setDescription('if you doesn\'t need it anymore')
        ).addSubcommand(s => 
            s.setName('connect')
            .setDescription('if you have lost your login')
        )
}

module.exports.run = async (client, interaction) => {
    client.db.get(interaction.guild.id);
    if(!client.db[interaction.guild.id].serverMinecraft) return interaction.reply({content: 'Systeme désactivé !', ephemeral: true})

    

}