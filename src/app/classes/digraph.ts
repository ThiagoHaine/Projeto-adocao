import { Vertex } from './vertex'
import { Arc } from './arc'

export class Digraph {
    public VertexList:Vertex[]
    public ArcList:Arc[]

    public constructor()
    {
        this.VertexList = [];
        this.ArcList = [];
    }

    public criaLigacoes():void
    {
        this.ArcList=[];
        for(let i = 0; i < this.VertexList.length; i++)
        {
            for(let j = 0; j < this.VertexList.length; j++)
            {
                if (i != j)
                {
                    this.ArcList.push(new Arc(this.VertexList[i], this.VertexList[j]));
                }
            }
        }
    }
}
