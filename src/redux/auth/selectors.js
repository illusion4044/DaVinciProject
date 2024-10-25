export const selectUser = state => state.auth.token;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsRefreshing = state => state.auth.IsRefreshing;
