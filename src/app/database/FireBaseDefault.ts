import { AngularFirestore, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export class DB{
  private DBFolder:string;

  constructor(folder:string,protected db:AngularFirestore){
    this.DBFolder=folder;
  }
  protected retorna(query?:QueryFn):Observable<any[]>{
    return this.db.collection(this.DBFolder, query).valueChanges();
  }
  protected retornaAdv(query:QueryFn):Observable<any[]>{
    return this.db.collection(this.DBFolder, query).snapshotChanges();
  }
  public getId(object:any){
    return object['payload']['doc']['id'];
  }
  protected adiciona(object:any):void{
    this.db.collection(this.DBFolder).add(object);
  }
  protected atualiza(id:string,object:any):void{
    this.db.doc(this.DBFolder+"/"+id).update(object);
  }
}