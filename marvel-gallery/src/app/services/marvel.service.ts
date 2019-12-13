import {Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'access-control-allow-origin' : '*' })
};

@Injectable()
export class MarvelService {
 
    constructor(private http:HttpClient) {}
 
    getCharacteres(page = 1, name?:string) {
        let params = new HttpParams();

        page = (page>0) ? page : 1;
        params.append('page', page.toString());

        if (name) {
            params.append('name', name);
        }

        return this.http.get('http://localhost:3000/?page=' + page);
    }
}