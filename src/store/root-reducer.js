import { combineReducers } from "redux";
import { categoriesReducer } from "./catagories/category.reducer";
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
});