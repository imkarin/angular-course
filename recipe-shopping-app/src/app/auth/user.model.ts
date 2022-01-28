export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    // a getter is a special kind of property
    // it looks like a function, but you'll be able to access it like a property 
    // it usually returns a modified version of a private property with the same _name (_token)
    // you can't overwrite a getter (unless there's a setter)
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            // if theres no exp date, or the exp date has already passed: our token isn't valid
            return null;
        }
        return this._token;
    }
}
