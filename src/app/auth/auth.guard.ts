import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, of, switchMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import { QuizService } from "../quiz.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const dataStorageService = inject(DataStorageService);
  const quizService = inject(QuizService);

  return authService.user.pipe(
      take(1),
      switchMap(isAuth => {
          const params = route.params;

          if (params['id']) {
              return dataStorageService.fetchQuizzes(authService.getIdToken() === null ? params['userid'] : authService.getIdToken()).pipe(
                  map(() => {
                      const quiz = quizService.getQuizById(+params['id']);
                      if (quiz && !quiz.settings.strictMode) {
                          return true;
                      } else if (isAuth) {
                          return true;
                      } else {
                          return router.createUrlTree(['/auth']);
                      }
                  })
              );
          } else {
              if (isAuth) {
                  return of(true);
              } else {
                  return of(router.createUrlTree(['/auth']));
              }
          }
      })
  );
};


// export const authGuard = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const dataStorageService = inject(DataStorageService);
//     const quizService = inject(QuizService);
//     const route = inject(ActivatedRouteSnapshot);

//     return authService.user.pipe(
//         take(1),
//         map(isAuth => {
//         const params = route.params; // Use ActivatedRouteSnapshot params
//         console.log(params);
//         if (params['id']) {
//             dataStorageService.fetchQuizzes();
//             const quiz = quizService.getQuizById(+params['id']);
//             if (quiz && !quiz.settings.strictMode) {
//             return true;
//             }
//         }
//         if (isAuth) {
//             return true;
//         } else {
//             return router.createUrlTree(['/auth']);
//         }
//         })
//     );
//     // const authService = inject(AuthService);
//     // const router = inject(Router);
//     // const route = inject(ActivatedRoute);
//     // const dataStorageService = inject(DataStorageService);
//     // const quizService = inject(QuizService);

//     // return authService.user.pipe(
//     //     take(1),
//     //     map(isAuth => {
//     //         const params = route.snapshot.params; // Get params synchronously using snapshot
//     //         console.log(params);
//     //         if (params['id']) { 
//     //             dataStorageService.fetchQuizzes();
//     //             const quiz = quizService.getQuizById(+params['id']);
//     //             if (!quiz.settings.strictMode) {
//     //                 return true;
//     //             }
//     //         }
//     //         if (isAuth) {
//     //             return true;
//     //         } else {
//     //             return router.createUrlTree(['/auth']);
//     //         }
//     //     })
//     // );
//     // return authService.user.pipe(take(1), map(isAuth => {
//     //     if (isAuth) {
//     //         return true;
//     //     } else {
//     //         router.navigate(['/auth']);
//     //         return false;
//     //     }
//     // }));
// }

// export const canActivate: CanActivateFn = authGuard;
// export const canMatch: CanMatchFn = authGuard;



export const authRedirectGuard = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.user.pipe(
        take(1),
        map(user => {
            if (user) {
                router.navigate(['/home']);
                return false;
            } else {
                return true;
            }
        })
    );
}
