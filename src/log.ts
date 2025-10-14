import manifest from './manifest.json';

export function log(...args: any[]) {
    console.log(manifest.name, ...args);
}

export function warn(...args: any[]) {
    console.warn(manifest.name, ...args);
}