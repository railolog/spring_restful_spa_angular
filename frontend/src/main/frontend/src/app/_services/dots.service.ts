import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dot} from "../models/dot.model";

const DOTS_API = 'http://localhost:4200/api/dot/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic base64(client_id:client_secret)'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DotsService {
  constructor(private http: HttpClient) {
  }

  addDot(x: number, y: number, r: number): Observable<any> {
    return this.http.post(
      DOTS_API + 'add-dot',
      {
        x,
        y,
        r
      },
      httpOptions
    );
  }

  removeDots() : Observable<any> {
    return this.http.post(
      DOTS_API + 'remove-dots',
      {},
      httpOptions
    );
  }

  loadAllDots(): Observable<any> {
    return this.http.get(DOTS_API + 'get-all-dots')
  }

  fromArray(arr: Array<any>): Dot[] {
    let dots: Dot[] = [];

    for (let dot in arr) {
      this.pushDot(dots, arr[dot]);
      //dots.push(new Dot(arr[dot].x, arr[dot].y, arr[dot].r, arr[dot].hit, arr[dot].creationDateSecondsUTC, arr[dot].execTime));
    }
    return dots;
  }

  pushDot(dots: Dot[], dot: any) {
    dots.push(new Dot(dot.x, dot.y, dot.r, dot.hit, dot.creationDateSecondsUTC, dot.execTime));
  }
}
