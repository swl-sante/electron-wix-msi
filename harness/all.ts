import { renameSync, rmdirSync } from "fs";
import { main } from "./harness";
import { ConsoleColor } from "../src/utils/console";

const todo = {
    msi: true,
    exe: false
};

async function start() {

    console.log(ConsoleColor.Reset + "Building: ", todo);

    if (todo.msi) {
        rmdirSync("msi", { recursive: true });
        await main({ dist: "machine", ext: "msi", platform: "win32", arch: "x64" });
    }

    if (todo.exe) {
        rmdirSync("exe", { recursive: true });
        await main({ dist: "machine", ext: "exe", platform: "win32" });
    }

    console.log(ConsoleColor.Reset + "finished");
}

start();
