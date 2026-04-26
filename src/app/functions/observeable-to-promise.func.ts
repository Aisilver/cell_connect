import { Observable, tap } from "rxjs";

export function ObservableToPromise<T = any>(obvs: Observable<T>){
    return new Promise<T>((res, rej)=> {
        const subs = obvs
        .pipe(tap({
            next: data => {res(data); subs.unsubscribe()},

            error: err => {rej(err); subs.unsubscribe()}
        }))
        .subscribe()
    })
}