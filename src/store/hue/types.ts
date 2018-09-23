import { Groups } from '@/api/hue';

export interface HueState {
    groups: Groups;
    discoveryComplete: boolean;
    discoveryError: boolean;
}