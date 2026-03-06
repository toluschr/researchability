import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

import package_json from './package.json'

const manifest_json = {
    manifest_version: 3,
    name: package_json.name,
    version: package_json.version,
    description: package_json.description,
    permissions: ["activeTab", "scripting", "downloads"],
    action: {default_title: package_json.description},
    background: {
        scripts: ["background.js"],
    }
};

export default defineConfig({
    plugins: [
        {
            name: "manifest.json",
            generateBundle(_, bundle) {
                this.emitFile({
                    type: "asset",
                    fileName: "manifest.json",
                    source: JSON.stringify(manifest_json, null, 2)
                })
            }
        },
        {
            name: "background.js",
            closeBundle() {
                const src = resolve(__dirname, 'src/background.js');
                const dest = resolve(__dirname, 'dist/background.js');
                fs.copyFileSync(src, dest);
            }
        }
    ],
    build: {
        rollupOptions: {
            input: {
                content: resolve(__dirname, "src/content.js"),
            },
            output: {
                entryFileNames: "[name].js",
                format: "iife",
                dir: 'dist',
                inlineDynamicImports: true,
            }
        }
    }
});
