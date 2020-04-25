export const config = {
    backendURL: function() {
        return `${location.protocol}//${location.hostname}:3001`;
    },
    frontendURL: function() {
        return `${location.protocol}//${location.hostname}:4201`;
    }
}