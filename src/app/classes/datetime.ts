export class DateTime {
    public date:string="";
    public time:string="";

    constructor(datetime?:string){
        if (datetime==undefined){
            this.atualiza();
        }else{
            let parts=datetime.split(" ");
            switch(parts.length){
                case 0:
                    this.atualiza();
                    break;
                case 1:
                    if (parts[0].includes(":")){
                        this.time=parts[0];
                        this.date=this.getDate();
                    }else{
                        this.date=parts[0];
                        this.time=this.getTime();
                    }
                    break;
                case 2:
                    this.date=parts[0];
                    this.time=parts[1];
                    break;
            }
        }
        this.formata();
    }
    
    public atualiza():void{
        this.date=this.getDate();
        this.time=this.getTime();
    }

    public formata():void{
        let d=this.date.split("/");
        let t=this.time.split(":");
        let df="";
        let tf="";

        for(let i=0;i<d.length;i++){
            if (parseInt(d[i])<10){
                df+="0";
            }
            df+=parseInt(d[i]).toString();
            if (i<d.length-1){
                df+="/";
            }
        }

        for(let i=0;i<t.length;i++){
            if (parseInt(t[i])<10){
                tf+="0";
            }
            tf+=parseInt(t[i]).toString();
            if (i<d.length-1){
                tf+=":";
            }
        }

        this.date=df;
        this.time=tf;
    }

    public compara(other:DateTime):number{
        //retorna 1 se essa for maior que a outra
        //retorna 2 se a outra for maior que essa
        //retorna 0 se forem iguais
        let date1=this.date.split("/");
        let date2=other.date.split("/");
        if (date1[2]==date2[2]){
            if (date1[1]==date2[1]){
                if (date1[0]==date2[0]){
                    let minutes1 = this.time.split(":");
                    let minutes2 = other.time.split(":");

                    if (minutes1[0]==minutes2[0]){
                        if (minutes1[1]==minutes2[1]){
                            if (minutes1[2]==minutes2[2]){
                                return 0;
                            }else{
                                if (minutes1[2]>minutes2[2]){
                                    return 1;
                                }else{
                                    return 2;
                                }
                            }
                        }else{
                            if (minutes1[1]>minutes2[1]){
                                return 1;
                            }else{
                                return 2;
                            }
                        }
                    }else{
                        if (minutes1[0]>minutes2[0]){
                            return 1;
                        }else{
                            return 2;
                        }
                    }
                }else{
                    if (date1[0]>date2[0]){
                        return 1;
                    }else{
                        return 2;
                    }
                }
            }else{
                if (date1[1]>date2[1]){
                    return 1;
                }else{
                    return 2;
                }
            }
        }else{
            if (date1[2]>date2[2]){
                return 1;
            }else{
                return 2;
            }
        }
    }

    public toText():string{
        return this.date+" "+this.time;
    }

    public getDate():string{
        var currentdate = new Date(); 
        return currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
    }

    public getTime():string{
        var currentdate = new Date(); 
        return currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();   
    }   
}
