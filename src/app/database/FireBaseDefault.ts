import { AngularFirestore, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export class DB{
  private DBFolder:string;

  constructor(folder:string,protected db:AngularFirestore){
    this.DBFolder=folder;
  }
  public retorna(query:QueryFn):Observable<any[]>{
    return this.db.collection(this.DBFolder, query).valueChanges();
  }
}