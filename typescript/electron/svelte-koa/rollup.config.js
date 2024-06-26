/* eslint-disable @typescript-eslint/no-var-requires */
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import path from "path";
import { spawn } from "child_process";

const tsconfig = require("./tsconfig.json");

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) {
			server.kill(0);
		}
	}

	return {
		writeBundle() {
			if (server) {
				return;
			}
			server = spawn("npm", ["run", "start", "--", "--dev", "--port", 8080], {
				stdio: ["ignore", "inherit", "inherit"],
				shell: true,
			});

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		},
	};
}

function tsalias() {
	const paths = [];

	for (const value in tsconfig.compilerOptions.paths) {
		paths.push({
			replacement: path.resolve(
				path.resolve(__dirname),
				tsconfig.compilerOptions.paths[value][0].replace("./", "").replace("/*", ""),
			),
			find: value.replace("./", "").replace("/*", ""),
		});
	}

	return paths;
}

export default {
	input: "renderer/src/main.ts",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: 'renderer/public/build/bundle.js',
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		json(),
		copy({
			targets: [
				{ src: "renderer/public/**/*", dest: "dist" },
			],
		}),
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		alias({
			entries: tsalias(),
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: !production,
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: "bundle.css" }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({ watch: "dist", delay: 200 }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production &&
			terser({
				output: {
					comments: false,
				},
			}),
	],

	watch: {
		clearScreen: false,
	},
};
