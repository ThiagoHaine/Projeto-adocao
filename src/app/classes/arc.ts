import { Vertex } from './vertex'
import { Geoposition } from './geoposition'

export class Arc {
    public from:Vertex
    public to:Vertex
    public distancia:number

    public constructor(A:Vertex,B:Vertex,incremental?:number)
    {
        this.from = A;
        this.to = B;
        let locA = new Geoposition(parseFloat(this.from.ponto.latitude), parseFloat(this.from.ponto.longitude));
        let locB = new Geoposition(parseFloat(this.to.ponto.latitude), parseFloat(this.to.ponto.longitude));
        if (incremental==undefined){
            incremental=0;
        }
        this.distancia = locA.distanceTo(locB)+incremental;
    }
}