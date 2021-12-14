export class AuthService {
    // some sort of logic here that reaches out to a server, allow us to log in/out etc...
    // and track the loggedIn state
    loggedIn = true;

    isAuthenticated() {
        const promise = new Promise((resolveFunc, rejectFunc) => {
            setTimeout(() => { // fake that the login takes 800 ms
                resolveFunc(this.loggedIn); // this will make the promise^ resolve with the value of this.loggedIn
            }, 800);
        });
        return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}
