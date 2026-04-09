import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Shared } from './../shared/shared';
import { inject } from '@angular/core';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import {Cookie} from './cookie'

export const authGuard: CanActivateFn = (route, state) => {
 const shareService = inject(Shared)


 if(shareService.isQuizFiltered()){
  return true
 }else{
  return false
 }

};


export const IsLogin:CanActivateFn = (route:ActivatedRouteSnapshot , state:RouterStateSnapshot)=>{
     const cookie  = inject(Cookie)
     const router = inject(Router)
    if(cookie.getCookie()){
        return true;
    }else {
       return   router.createUrlTree(['/login'] , {queryParams:{returnUrl:state.url}})
      
    }
}
