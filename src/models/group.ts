export interface GroupState {
    all_on: boolean;
    any_on: boolean;
}

export interface GroupAction {
    on?: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    effect?: string;
    xy?: number[];
    ct?: number;
    alert?: string;
    colormode?: string;
}

export interface Group {
    name: string;
    lights: string[];
    sensors: any[];
    type: string;
    state: GroupState;
    recycle: boolean;
    class: string;
    action: GroupAction;
}
