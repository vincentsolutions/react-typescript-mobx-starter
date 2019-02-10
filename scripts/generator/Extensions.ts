///<reference path="../../index.d.ts" />

String.prototype.replaceAll = function(search: string, replacement: string) {
    return this.replace(new RegExp(search, 'g'), replacement);
};