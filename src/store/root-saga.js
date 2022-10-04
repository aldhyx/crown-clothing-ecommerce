import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './catagories/category.saga';

export function* rootSaga() {
    yield all([call(categoriesSaga)]);
}