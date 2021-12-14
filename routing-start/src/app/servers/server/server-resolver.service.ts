import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

// we're using {id: number, name: string, status: string} a lot, so we make a TS interface:
interface Server {
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
    constructor(private serversService: ServersService) {}

    // the Resolve interface^ requires us to use the resolve method:
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> |
    Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    }
}
