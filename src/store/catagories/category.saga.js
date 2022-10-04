import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { all, call, takeLatest, put } from 'redux-saga/effects';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        /**
         * Creates an effect description that instructs the middleware to dispatch an action to the Store. This effect is non-blocking and any errors that are thrown downstream(e.g.in a reducer) will not bubble back into the saga
         */
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}
export function* onFetchCategories() {
    /**
     * Spawns a saga on each action dispatched to the Store that matches pattern. And automatically cancels any previous saga task started previously if it's still running.
     * Each time an action is dispatched to the store. And if this action matches pattern, takeLatest starts a new saga task in the background. If a saga task was started previously (on the last action dispatched before the actual action), and if this task is still running, the task will be cancelled.
     */
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    // run everything inside and only complete when everything is done
    // its like Promise.all([])
    yield all([call(onFetchCategories)]);
}