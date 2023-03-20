import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";

@Injectable()
export class LoggedInGuard implements CanActivate{
  constructor(private router: Router, private storageService: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let path = route.url[0]['path'];

    if (path == 'home') {
      if (this.storageService.isLoggedIn()) {
        return true;
      }
      return this.router.parseUrl('/login');
    }

    if ((path == 'login' || path == 'register') && this.storageService.isLoggedIn()) {
      return this.router.parseUrl('/home');
    }

    return true;
  }
}
