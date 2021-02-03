import { Client, Message } from "discord.js";
import { EventEmitter } from 'events';
import { Command } from "./command";

/**
 * Bot optimized
 */
export abstract class Bot {
  protected prefix:string;
  private token:string;
  private client: Client;
  private emitter:EventEmitter;

  constructor(prefix:string, token: string) {
    this.prefix = prefix;
    this.token = token;
    this.client = new Client();
    this.emitter = new EventEmitter();

    this.client.on('message', (message: Message) => {
      if (!message.content.startsWith(this.prefix)) return;
      if (message.author.bot) return;
      this.emitter.emit(this.getArguments(message.content)[0], message);
    });

    this.init().forEach(oo=>this.setResponse(oo.names, oo.listener));
  }

  start(){
    return this.client.login(this.token);
  }

  private setResponse(names:string[], listener:(message:Message) => void){
    names.forEach(e=>{
      this.emitter.on(e, listener);
    })
  }

  getArguments(message:string){
    return message.slice(this.prefix.length).trim().split(/ +/g);
  }

  protected abstract init():Command[];
}