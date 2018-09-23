import { Group, Groups, GroupAction } from "@/models/group";
import { get, put, post, getStoredUsername, storeUsername } from "./api";
import { Bridge } from '@/models/bridge';
import { AddUserRequest, AddUserResponse } from "@/models/user";

const HUE_APP_IDENTIFIER = "hue_helper#app";

class HueApi {
    private hueDiscoveryUrl = process.env.VUE_APP_HUE_DISCOVERY_URL || "";
    private username: string | null = null;
    private rootUrl = "";
    private bridgeId = "";
    private get apiRootUrl() { return `${this.rootUrl}/api`; }
    private get apiUrl() { return `${this.apiRootUrl}/${this.username}`; }
    private get groupUrl() { return `${this.apiUrl}/groups`; }

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

    public async createUser(): Promise<boolean> {
        const req: AddUserRequest = { devicetype: HUE_APP_IDENTIFIER };
        const res = await post<AddUserResponse[]>(this.apiRootUrl, req);
        if(!res || !res.length) {
            console.error("bad problem");
            return false;
        }
        const response = res[0];
        if (response.error) {
            return false;
        } else if (response.success) {
            const { username } = response.success;
            storeUsername(this.bridgeId, username);
            this.username = username;
            return true;
        } else {
            console.error("something very wrong");
            debugger;
            return false;
        }
    }

    public async discover(): Promise<void> {
        const bridges = await get<Bridge[]>(this.hueDiscoveryUrl);
        if (!bridges || !bridges.length) {
            throw "No Bridges";
        }
        this.rootUrl = `http://${bridges[0].internalipaddress}`;
        this.bridgeId = bridges[0].id;
    }

    public getStoredUsername(): boolean {
        if (this.bridgeId == null) return false;
        this.username = getStoredUsername(this.bridgeId);
        return this.username != null;
    }
}

export default new HueApi();