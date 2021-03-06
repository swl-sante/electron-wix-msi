import * as packager from "electron-packager";
import { promises } from "fs";
import * as path from "path";
import { MSICreator, MSICreatorOptions } from "./creator";
import { ConsoleColor } from "./utils/console";
export * from "./creator";

/**
 * Create .msi installer from source or from pre-packaged electron app
 * @param packagerOptions options for the electron packager
 * @param msiOptions options for the electron-wix-msi installer
 * @param clean if process has to clean temp directories
 */
export async function createMSI(packagerOptions: packager.Options, msiOptions: MSICreatorOptions, clean: boolean = true) {
	const start = Date.now();
	let packageTime = 0;
	console.log(ConsoleColor.FgCyan + "Starting the creation of MSI setup at " + new Date().toString() + ConsoleColor.Reset);

	packagerOptions.dir = path.resolve(packagerOptions.dir);
	await packager({ ...packagerOptions, quiet: true });

	packageTime = Date.now();
	console.log(ConsoleColor.FgCyan + "Packaging done in " + (packageTime - start) / 1000 + "s" + ConsoleColor.Reset);

	const packagedOutputFiles = await promises.readdir(msiOptions.appDirectory);
	if (packagedOutputFiles.length === 1) {
		msiOptions.appDirectory = path.join(msiOptions.appDirectory, packagedOutputFiles[0]);
	}

	msiOptions.outputDirectory = path.resolve(msiOptions.outputDirectory);
	msiOptions.appDirectory = path.resolve(msiOptions.appDirectory);

	const msiCreator = new MSICreator({ ...msiOptions, noConsole: true });
	await msiCreator.create();
	await msiCreator.buildSharp();
	await msiCreator.compile();

	console.log(ConsoleColor.FgCyan + "The .msi creation has been done in " + (Date.now() - packageTime) / 1000 + "ms" + ConsoleColor.Reset);

	if (clean) {
		await promises.rmdir(packagerOptions.out as string, { recursive: true });
	}

	console.log(ConsoleColor.FgCyan + "Total " + (Date.now() - start) / 1000 + "ms" + ConsoleColor.Reset);
}

/**
 * Create .exe installer from source
 * @param config options for the electron builder
 */
export async function createEXE() {
	return new Promise((resolve) => {
		throw new Error("Not implemented yet");
	});
}
