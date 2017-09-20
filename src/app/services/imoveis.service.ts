import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';

// Observable operators
import 'rxjs/add/operator/map';

@Injectable()
export class ImoveisService {

  constructor(private http: Http) { }

  private url = "api/imoveis/";

  search(term: string, tipo: string): Observable<any[]> {
    return this.http
               .get(this.url+`?name=${term}&tipo=${tipo}`)
               .map(response => response.json().data as any[]);
  }

  getImoveis(): Observable<any[]> {
    return this.http
               .get(this.url)
               .map(response => response.json().data as any[]);
  }

  getArgs(vaga: number, dormitorios: number, tipo: string): Observable<any[]> {
    let arg = this.url+`?vagas=${vaga}&dormitorios=${dormitorios}&tipo=${tipo}`;
    console.log(arg);
    return this.http
               .get(arg)
               .map(response => response.json().data as any[]);
  }



}
