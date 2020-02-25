import { renameSync, rmdirSync } from "fs";
import { main } from "./harness";

const todo = {
    msi: true,
    exe: false
};

async function start() {

    console.log("Building: ", todo);

    if (todo.msi) {
        rmdirSync("msi", { recursive: true });
        await main({ dist: "machine", ext: "msi", platform: "win32" });
    }

    if (todo.exe) {
        rmdirSync("exe", { recursive: true });
        await main({ dist: "machine", ext: "exe", platform: "win32" });
    }

    console.log("finished");
}

start();
