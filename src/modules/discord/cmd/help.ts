// help command
import { Client, Message, Collection } from "discord.js";
import { Command } from "../../../types/discord/command";

export const prop = {
  name    : "help",
  desc    : "See help on some command.",
  usage   : "help [command]",
  category: "Bot",

  run: (bot : Client, 
        msg : Message,
        args: Array<string>,
        cmds: Collection<string, Command>): void => {
    // display all commands
    if (args.length == 0) {
      const names = [];
      cmds.forEach(c => names.push("`" + c.prop.name + "`"));
      msg.reply(`All commands: ${names.join(", ")}`);
    } else {
      const cmd: Command = cmds.get(args[0]);
      msg.reply(`**${cmd.prop.name}**\n${cmd.prop.desc}\n\nCategory: **${cmd.prop.category}**\nUsage: \`${cmd.prop.usage}\``);
    }
  }
}
