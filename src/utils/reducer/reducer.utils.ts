import { AnyAction } from 'redux';

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'],
    match(action: AnyAction): action is ReturnType<AC>;
}

// function Overloading 1
export function withMatcher<AC extends () => AnyAction & { type: string }>(
    actionCreator: AC
): Matchable<AC>;
// function Overloading 2
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
    actionCreator: AC
): Matchable<AC>;
// actual implementation
export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

// create ActionWithPayload type, the T will pass down to type & P will pass down to payload
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

// create Action type, the T will pass down to type
export type Action<T> = {
    type: T;
}

// function Overloading 1
// this will receive type as string and action 
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// function Overloading 2
// this will receive type as string only, payload is void
export function createAction<T extends string>(type: T, payload: void): Action<  T>;

// actual implementation
// this will be used with action only or with payload by function overloading above
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
} 