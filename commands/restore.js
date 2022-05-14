const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.info = {
    name: 'restore',
    description: 'give to a user roles that he lose',
    argument: false,
    group: 'moderation',
    info: 'TO DO',
    slash: new SlashCommandBuilder()
        .setName('restore')
        .setDescription('re-give to a user his roles')
        .addUserOption(o =>
            o.setName('user')
                .setDescription('user to give roles')
                .setRequired(true)
        )
}

module.exports.run = async (client, interaction) => {
    client.db.get(interaction.guild.id);
    if(!client.db[interaction.guild.id].restoreRoles) return interaction.reply({content: 'Systeme désactivé !', ephemeral: true})


    if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply('Vous n\'avez pas les bonnes permissions');

    const member = interaction.options.getMember('user');

    if (!client.rolesMemberBan[interaction.guild.id][member.user.id]) return interaction.reply({ content: 'Ce membre n\'a pas de role a remettre !', ephemeral: true });

    const roles = client.rolesMemberBan[interaction.guild.id][member.user.id];

    const road = { succes: [], fail: [], already: [] };

    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];

        if (member.roles.cache.has(role)) {
            road.already.push(role)
        } else {
            try {
                await member.roles.add(role)
                road.succes.push(role)
            }catch(e){
                road.fail.push(role)
            }
            
            

        }


    }

    const embed = new Discord.MessageEmbed()
        .setTitle('Roles restauré :')
        .setColor(client.config.color)
        .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
        .setDescription(
            `\`\`\`diff\n${roles.map(r => {
                const rName = interaction.guild.roles.cache.find(role => role.id == r).name
                return road.succes.includes(r) ? `+ ${rName}` : `${road.fail.includes(r) ? `- ${rName}` : `  ${rName}`}`
            }).join('\n')}
            \`\`\``
        )
        .setFooter({text: 'Legende : 🟢  role restauré • 🔴  role non restauré'})
        .setTimestamp()

    interaction.reply({ embeds: [embed], ephemeral: false })
}