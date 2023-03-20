import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


const API_URL = 'http://localhost:4200/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  // TODO
}
