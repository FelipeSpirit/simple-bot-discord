# Simple Bot DIscord

Customizable discord bot. Ready to set the commands and responses. 
Bot de discord personalizable. Listo implementar comandos y respuestas


# Installation | Instalación

En la consola coloca | On the console type:
`npm i @felipespirit/simple-bot-discord`

## Usage | Uso

```
import { Bot } from "./bot";

export  class  CustomBot  extends  Bot{
    constructor(){
        super("prefix","TOKEN");
    }

    protected  init() {
        this.addCommands(
            { 
                names:['test', 't'],
                listener: message=> message.channel.send("You request a Test!")
            }
        )
    }
}

var bot = new CustomBot();

bot.start().then(res=>{
    console.log("Logged in!")
}).catch(err=>{
    console.log("Oh no");
})
```
