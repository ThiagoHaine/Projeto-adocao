export const DBFolder='mensagens';
export interface Message {
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
}