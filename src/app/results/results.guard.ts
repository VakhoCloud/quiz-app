import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChildFn } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../quiz.service';

export const resultsGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot,): Observable<boolean> | Promise<boolean> | boolean => {
    const id = +route.paramMap.get('id');
    const result = inject(QuizService).getResultById(id);

    if (result) {
        return true;
    }else {
        inject(Router).navigate(['/results']);
        return false;
    }
}