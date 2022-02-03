import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

// The shape of the application state
export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

// The action reducer map that contains all the app state's slices and their reducers
// We will pass this to StoreModule.forRoot() in the AppModule
// This is cleaner than writing all this out in AppModule itself,
// especially since we're now also defining the interface of the AppState here
export const appReducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.AuthReducer
}
