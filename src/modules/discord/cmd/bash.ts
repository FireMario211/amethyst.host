// execute a bash command
import { Client, Message } from "discord.js";
import child_process       from "child_process";
import config from "../../../config.json";

let error: boolean = false;

export const prop = {
  name : "bash",
  desc : "Execute a bash command.",
  usage: "bash [command] [...args]",

  run: async (bot: Client, msg: Message, args: Array<string>): Promise<void> => { 
  	if (!config.discord.dev.includes(msg.author.id)) return;

	const cmd : string = args[0];
	args.shift();
	const sh  : string = "```\n# " + cmd + " " + args.join(" ");
	let   data: string = "";

	const m       : Message = await msg.channel.send(sh);
	const exec    : any     = child_process.spawn(cmd, args);
	const interval: any     = setInterval(m.edit, 1000,
	  								  sh + "\n" + data + "```"
	  								 );

	exec.stdout.on("data", (d) => data += d);
	exec.on("error", (e) => error = true);
	exec.on("close", async (c) => {
	  clearInterval(interval);
	  if (error) {
	    await m.edit("Err");
	    return error = false;
	  } else await m.edit(sh + "\n" + data + "\n#```");
	});
  }
}
