import { ArgumentParser } from "argparse";
import { readFileSync } from "fs";
import * as path from "path";
import { createEXE, createMSI } from "../src/index";


interface Arguments {
	platform: "win32" | "darwin";
	ext: "msi" | "exe" | "all";
	dist: "machine" | "user";
	arch?: "x64";
}

/**
 * Package an electron app from command line / package.json informations
 * @param args Console line arguments
 */
export async function main(args: Arguments) {
	const packageJSON = JSON.parse(readFileSync(path.join(__dirname, "./package.json")).toString());

	const equivalentDist = new Map([["exe", 2], ["msi", 3], ["all", 6]]);
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

	if (equivalentDist.get(args.ext) as number % 2 === 0) { // exe ou all
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

	if (equivalentDist.get(args.ext) as number % 3 === 0) { // msi ou all
		const tempFolder = path.join("temp");
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
				},
				upgradeCode: "dcad351e-ff1b-44da-bad7-4f0c54edcced" // GUID de MesPatientsBureau ne doit pas changer pour une même application
			},
			true
		));
	}

	await Promise.all(create);
}

if (require.main === module) {
	const parser = new ArgumentParser();

	parser.addArgument("--platform", { required: true, choices: ["win32", "darwin"] });
	parser.addArgument("--ext", { required: false, choices: ["msi", "exe", "all"], defaultValue: "all" });
	parser.addArgument("--dist", { required: false, choices: ["machine", "user"], help: "if not filled, use 'package.json'.build.nsis.perMachine value" });
	parser.addArgument("--arch", { required: false });

	main(parser.parseArgs());

}
