export class Geoposition {
    private latitude:number;
    private longitude:number;

    public constructor(lat:number,long:number){
        this.latitude = lat;
        this.longitude = long;
    }

    public getLat():number{
        return this.latitude;
    }

    public getLong():number{
        return this.longitude;
    }

    public move(lat:number,long:number){
        this.latitude=lat;
        this.longitude=long;
    }

    public distanceTo(obj:Geoposition){
        let p = 0.017453292519943295;
        let c = Math.cos;
        let a = 0.5 - c((this.latitude-obj.getLat()) * p) / 2 + c(obj.getLat() * p) *c((this.latitude) * p) * (1 - c(((this.longitude- obj.getLong()) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a)));
        return dis;
    }
}
