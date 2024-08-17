import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";


export const quizEditorGuard: CanActivateFn = (route: ActivatedRouteSnapshot):| boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  => {
  
  const dataStorageService = inject(DataStorageService);
  const router = inject(Router);
  const id = +route.paramMap.get('id');
  

  return dataStorageService.fetchQuizzes().pipe(
    map(quizzes => {
      if (id < quizzes.length) {
        return true;
      } else {
        return router.createUrlTree(['home']);
      }
    })
  );

  // dataStorageService.fetchQuizzes().subscribe(res => {
  //   lengthOfQuizzez = res.length;
  // });

  // if (id < lengthOfQuizzez) {
  //   return true;
  // } else {
  //     inject(Router).navigate(['home']);
  //     return false;
  // }

}
