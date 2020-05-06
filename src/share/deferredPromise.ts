interface DeferredPromise<T> extends Promise<T> {
    resolve: (value: T) => void
    reject: (error: any) => void
}

export default function <T>(): DeferredPromise<T> {

    let _resolve, _reject;

    let promise = new Promise<T>((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });

    //@ts-ignore
    promise.resolve = _resolve;
    //@ts-ignore
    promise.reject = _reject;

    //@ts-ignore
    return promise;
}