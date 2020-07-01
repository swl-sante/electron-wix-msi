import * as path from "path";
import { spawnPromise } from "./utils/spawn"

/** Class for sign apps */
export class Signator {
    private pathToSignTool = path.resolve(__dirname, "../vendor/signtool.exe");

    public sign = async (certificate: string, app: string, password?: string) => {
        return spawnPromise(`${this.pathToSignTool} /n ${certificate} ${password ? `/p ${password}` : ""} ${app}`);
    };

    /** Returns if the certificate is installed on current machine */
    public certificateExist = async (certificate: string): Promise<boolean> => {
        const { stdout } = await spawnPromise(`powershell dir cert: -Recurse | Select-String "${certificate}"`);
        return stdout.trim().length > 0;
    }

}