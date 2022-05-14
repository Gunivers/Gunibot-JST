
module.exports = async (client) => {
    client.rolesMemberBan = {};
    client.on('guildMemberRemove', (member) => {
        client.rolesMemberBan[member.guild.id] = {}
        client.rolesMemberBan[member.guild.id][member.id] = member.roles.cache.map(r => r.id);
        //console.info(client.rolesMemberBan)
    })
}