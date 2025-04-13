import manifest from './manifest.json';

export function log(...args: any[]) {
    console.log(manifest.name, ...args);
}