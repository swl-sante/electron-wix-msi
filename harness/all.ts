import { renameSync, rmdirSync } from "fs";
import { main } from "./harness";

const todo = {
    msi: true,
    exe: false
};

async function start() {

    console.log("Builing: ", todo);

    if (todo.msi) {
        rmdirSync("msi", { recursive: true });
        await main({ dist: "machine", ext: "msi", platform: "win32" });
        renameSync("msi/MonSisra2Int.msi", "msi/MonSisra2Machine.msi");
        await main({ dist: "user", ext: "msi", platform: "win32" });
        renameSync("msi/MonSisra2Int.msi", "msi/MonSisra2User.msi");
    }

    if (todo.exe) {
        rmdirSync("exe", { recursive: true });
        await main({ dist: "machine", ext: "exe", platform: "win32" });
        renameSync("exe/MonSisra2Int.exe", "exe/MonSisra2Machine.exe");
        await main({ dist: "user", ext: "exe", platform: "win32" });
        renameSync("exe/MonSisra2Int.exe", "exe/MonSisra2User.exe");
    }

    console.log("finished");
}

start();
