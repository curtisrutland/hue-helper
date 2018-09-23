declare module 'color-space' {
    type converter = (numbers:number[]) => number[];
    export const hsl: {
        rgb: converter
    };
}