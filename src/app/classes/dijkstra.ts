import { Vertex } from './vertex'
import { Arc } from './arc'
import { Digraph } from './digraph'

export class Dijkstra {
    public ordem:Vertex[]

    public constructor(D:Digraph,inicial:Vertex)
    {
        let atual:Vertex=null;
        let proximos:Arc[] = [];
        let percorridos:Vertex[] = [];
        
        do
        {
            let increment:number;
            if (percorridos.length == 0)
            {
                atual = inicial;
                increment = 0;
            }
            else
            {
                let indexMenor:number = this.menor(proximos);
                increment = proximos[indexMenor].distancia;
                atual = proximos[indexMenor].to;
                proximos = proximos.filter((value, index, arr)=>{
                    return value.to!=atual;
                });
            }

            D.ArcList.forEach(arco=>{
                if (arco.from == atual && !percorridos.includes(arco.to))
                {
                    proximos.push(new Arc(atual, arco.to, increment));
                }
            });

            percorridos.push(atual);
        } while (proximos.length != 0);

        this.ordem = percorridos;
    }

    public menor(arcos:Arc[]):number
    {
        let retorno:number = 0;
        for(let i = 0; i < arcos.length; i++)
        {
            if (arcos[i].distancia<arcos[retorno].distancia)
            {
                retorno = i;
            }
        }
        return retorno;
    }
}
