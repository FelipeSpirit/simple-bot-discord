import { Client, Message } from "discord.js";
import { EventEmitter, listenerCount } from 'events';
import { Command } from "./command";

/**
 * Bot optimized
 */
export abstract class Bot {
  protected prefix:string;
  private token:string;
  private client: Client;
  private emitter:EventEmitter;
  private commands:Command[];

  /**
   * Build a bot
   * @param prefix Bot's prefix
   * @param token Discord token
   */
  constructor(prefix:string, token: string) {
    this.prefix = prefix;
    this.token = token;
    this.client = new Client();
    this.emitter = new EventEmitter();
    this.commands = [];

    this.client.on('message', (message: Message) => {
      if (!message.content.startsWith(this.prefix)) return;
      if (message.author.bot) return;
      this.emitter.emit(this.getArguments(message.content)[0], message);
    });

    this.init();
  }

  /**
   * Connects the bot to Discord
   */
  start(){
    return this.client.login(this.token);
  }

  private setResponse(names:string[], listener:(message:Message) => void){
    names.forEach(e=>{
      this.emitter.on(e, listener);
    })
  }

  /**
   * Get arguments of the command
   * @param message content
   */
  getArguments(message:string){
    return message.slice(this.prefix.length).trim().split(/ +/g);
  }

  /**
   * Initialize the commands and custom configs;
   */
  protected abstract init();

  /**
   * Add n comands to the bot
   * @param commands The commands
   */
  addCommands(...commands:Command[]){
    commands.forEach(c=>{
      this.setResponse(c.names,c.listener);
    })
  }
}