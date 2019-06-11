import { Foto } from "./foto"

export const DBFolder='mensagens';
export interface Message {
    ordem:number;
    msg:string;
    from:string;
    to:string;
    status:string;
    date:string;
}

export interface MessageList{
    n:number;
    nome:string;
    lastmsg:string;
    foto:Foto;
}