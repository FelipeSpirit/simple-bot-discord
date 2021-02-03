# Simple Bot DIscord

Customizable discord bot. Ready to set the commands and responses. 
Bot de discord personalizable. Listo implementar comandos y respuestas


# Installation | Instalación

En la consola coloca | On the console type:
`npm i @felipespirit/simple-bot-discord`

## Usage | Uso

```
import { Bot, Command } from  "@felipespirit/simple-bot-discord";

export  class  AcademicSetupBot  extends  Bot{
    constructor(){
        super("prefix","TOKEN");
    }

    protected  init(): Command[] {
        return [
            { 
	            names:['test','t'], 
	            listener:  message  => {message.channel.send("You request a test!")} 
            }
        ];
    }
}
```
