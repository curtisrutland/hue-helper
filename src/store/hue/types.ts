import { Groups } from '@/models/group';

export interface HueState {
    groups: Groups;
    discoveryComplete: boolean;
    discoveryError: boolean;
    userCreated: boolean;
}