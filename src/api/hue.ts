import { Group, GroupAction } from "@/models/group";
export * from "@/models/group";

const api = {
    get(url: string) { return fetch(url) },
    put(url: string, data: any) {
        return fetch(url, {
            body: JSON.stringify(data),
            method: "PUT",
            mode: "cors"
        });
    }
}

class HueApi {
    private username = process.env.VUE_APP_HUE_USERNAME;
    private rootUrl = process.env.VUE_APP_HUE_URL;
    private apiUrl = `${this.rootUrl}/api/${this.username}`;
    private groupUrl = `${this.apiUrl}/groups`

    public async getGroup(groupId: number): Promise<Group> {
        const response = await api.get(`${this.groupUrl}/${groupId}`);
        const data = await response.json() as Group;
        return data;
    }

    public async setGroupAction(groupId: number, action: GroupAction): Promise<boolean> {
        try {
            await api.put(`${this.groupUrl}/${groupId}/action`, action);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

//export const hue = new HueApi();
export const Hue = new HueApi();