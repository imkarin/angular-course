export class AuthService {
    // some sort of logic here that reaches out to a server, allow us to log in/out etc...
    // and track the loggedIn state
    loggedIn = false;

    isAuthenticated() {
        const promise = new Promise((resolveFunc, rejectFunc) => {
            setTimeout(() => {
                resolveFunc(this.loggedIn); // fake that the login takes 800 ms
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
