import { Message } from "discord.js"

export class Command{ 
    names:string[];
    listener:(message:Message) => void 
}