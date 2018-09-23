/// <reference path="./color-space.d.ts" />

import { hsl } from "color-space";

export default function hsvToRgb(hue: number, saturation: number, brightness: number) {
    const ang = (hue / 0xFFFF) * 360;
    const sat = (saturation / 0xFF) * 100;
    const bri = (brightness / 0xFF) * 100;
    const [ red, green, blue ] = hsl.rgb([ang, sat, bri]);
    return `#${hex(red)}${hex(green)}${hex(blue)}`;
}

function hex(val: number): string {
    return (val | 0).toString(16).padStart(2, '0');
}