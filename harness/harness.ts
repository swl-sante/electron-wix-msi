import { ArgumentParser } from "argparse";
import { readFileSync } from "fs";
import * as path from "path";
import { createEXE, createMSI } from "../src/index";

const parser = new ArgumentParser();

parser.addArgument("--platform", { required: true, choices: ["win32", "darwin"] });
parser.addArgument("--ext", { required: false, choices: ["msi", "exe", "all"], defaultValue: "all" });
parser.addArgument("--dist", { required: false, choices: ["machine", "user"], help: "if not filled, use 'package.json'.build.nsis.perMachine value" });
parser.addArgument("--arch", { required: false });

const args = parser.parseArgs();
const packageJSON = JSON.parse(readFileSync(path.join(__dirname, "./package.json")).toString());

async function main() {
	const equivalent = new Map([["exe", 2], ["msi", 3], ["all", 6]]);
	const create: Promise<any>[] = [];
	let installScope: "perMachine" | "perUser";

	switch (args.dist) {
		case "machine":
			installScope = "perMachine";
			break;
		case "user":
			installScope = "perUser";
			break;
		default:
			installScope = packageJSON.build.nsis.perMachine ? "perMachine" : "perUser";
			break;
	}


	if (equivalent.get(args.ext) as number % 2 === 0) { // exe ou all
		create.push(createEXE({
			config: {
				...packageJSON.build,
				directories: {
					...packageJSON.build.directories,
					output: path.join("exe")
				}

			},
			arch: args.arch,
			platform: args.platform,

		}));
	}

	if (equivalent.get(args.ext) as number % 3 === 0) { // msi ou all
		const tempFolder = path.join("temp");
		console.log(packageJSON.build.directories.app);
		create.push(createMSI(
			{
				asar: packageJSON.build.asar,
				arch: args.arch,
				platform: args.platform,
				dir: packageJSON.build.directories.app,
				out: tempFolder,
				appVersion: packageJSON.version,
				overwrite: true,
				icon: path.resolve(path.join("build", "icon.ico"))
			},
			{
				appDirectory: tempFolder,
				name: packageJSON.build.productName,
				description: packageJSON.build.productName,
				manufacturer: packageJSON.author,
				outputDirectory: path.join("msi"),
				version: packageJSON.version,
				installScope,
				ui: {
					chooseDirectory: true
				}
			},
			true
		));
	}

	await Promise.all(create);
}

main();
