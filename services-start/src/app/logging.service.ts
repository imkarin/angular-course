// a service is just a normal typescript class: no angular decorator!
export class LoggingService {
    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }
}
