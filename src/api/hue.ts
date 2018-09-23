import { Group, Groups, GroupAction } from "@/models/group";
import { get, put } from "./api";
import { Bridge } from '@/models/bridge';

export * from "@/models/group";


class HueApi {
    private discoUrl = process.env.VUE_APP_HUE_DISCOVERY_URL || "";
    private username = process.env.VUE_APP_HUE_USERNAME;
    private rootUrl = process.env.VUE_APP_HUE_URL;
    private apiUrl = `${this.rootUrl}/api/${this.username}`;
    private groupUrl = `${this.apiUrl}/groups`;

    public async getGroups(): Promise<Groups> {
        return await get<Groups>(this.groupUrl);
    }

    public async getGroup(groupId: string): Promise<Group> {
        return await get<Group>(`${this.groupUrl}/${groupId}`);
    }

    public async setGroupAction(groupId: string, action: GroupAction): Promise<boolean> {
        try {
            await put(`${this.groupUrl}/${groupId}/action`, action);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async discover(): Promise<void> {
        const bridges =  await get<Bridge[]>(this.discoUrl);
        if(!bridges || !bridges.length) {
            throw "No Bridges";
        }
        this.rootUrl = `http://${bridges[0].internalipaddress}`;
    }
}

//export const hue = new HueApi();
export const Hue = new HueApi();