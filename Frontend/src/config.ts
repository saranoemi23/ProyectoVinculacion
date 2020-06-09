import { environment } from './environments/environment';

export const config = {
    backendURL: function() {
        // if (environment.production) {
        //     return `${location.protocol}//${location.hostname}/api`;
        // }
        return `${location.protocol}//${location.hostname}:3001/api`;
    },
    frontendURL: function() {
        if (environment.production) {
            return `${location.protocol}//${location.hostname}:3001`;
        }
        return `${location.protocol}//${location.hostname}:4201`;
    }
}