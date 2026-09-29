#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_chalk_template = __toESM(require("chalk-template"));
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");

// src/commands/tofu.ts
var tofu_exports = {};
__export(tofu_exports, {
  builder: () => builder2,
  command: () => command2,
  describe: () => describe2,
  handler: () => handler2
});

// src/commands/tofu/view-state.ts
var view_state_exports = {};
__export(view_state_exports, {
  builder: () => builder,
  command: () => command,
  describe: () => describe,
  handler: () => handler
});
var import_node_child_process = require("child_process");

// src/lib/r2.ts
var import_client_s3 = require("@aws-sdk/client-s3");
var BUCKET = "kad-products-opentofu-remote-state";
function createR2Client() {
  const accessKeyId = process.env.TOFU_BACKEND_ACCESS_KEY;
  const secretAccessKey = process.env.TOFU_BACKEND_SECRET_KEY;
  const accountId = process.env.CF_ACCOUNT_ID;
  const missing = [
    !accessKeyId && "TOFU_BACKEND_ACCESS_KEY",
    !secretAccessKey && "TOFU_BACKEND_SECRET_KEY",
    !accountId && "CF_ACCOUNT_ID"
  ].filter(Boolean);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
  return new import_client_s3.S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}
async function listStateFiles(client, appName) {
  const prefix = `${appName}/`;
  const response = await client.send(
    new import_client_s3.ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix })
  );
  return (response.Contents ?? []).filter((obj) => obj.Key?.endsWith("/terraform.tfstate")).map((obj) => {
    const key = obj.Key;
    const label = key.slice(prefix.length).replace("/terraform.tfstate", "");
    return { key, label };
  });
}
async function fetchStateFile(client, key) {
  const response = await client.send(new import_client_s3.GetObjectCommand({ Bucket: BUCKET, Key: key }));
  const body = await response.Body?.transformToString();
  if (!body) throw new Error(`Empty response for state file: ${key}`);
  return JSON.parse(body);
}

// src/lib/tofu-state.ts
function formatAddress(resource) {
  const modulePrefix = resource.module ? `${resource.module}.` : "";
  const dataPrefix = resource.mode === "data" ? "data." : "";
  return `${modulePrefix}${dataPrefix}${resource.type}.${resource.name}`;
}
function parseResources(state) {
  const raw = state;
  return (raw.resources ?? []).map((resource) => ({
    address: formatAddress(resource),
    instances: resource.instances ?? []
  }));
}
function getResource(resources, address) {
  return resources.find((r) => r.address === address);
}

// src/logger.ts
var import_consola = require("consola");
function initLogger(verbose) {
  import_consola.consola.level = verbose ? import_consola.LogLevels.verbose : import_consola.LogLevels.info;
}

// src/commands/tofu/view-state.ts
var BACK = "\u2190 Back";
var EXIT = "Exit";
var command = "view-state";
var describe = "Browse OpenTofu remote state";
function builder(yargs2) {
  return yargs2.option("app", {
    type: "string",
    describe: "App name (defaults to current repo name)"
  });
}
function getAppName(override) {
  if (override) return override;
  const remote = (0, import_node_child_process.execSync)("git remote get-url origin", { encoding: "utf8" }).trim();
  const match = remote.match(/[/:]([^/]+?)(?:\.git)?$/);
  if (!match) throw new Error(`Could not parse repo name from git remote: ${remote}`);
  return match[1];
}
async function handler(argv) {
  let client;
  try {
    client = createR2Client();
  } catch (err) {
    import_consola.consola.error(err.message);
    process.exit(1);
  }
  let appName;
  try {
    appName = getAppName(argv.app);
    import_consola.consola.verbose(`Using app name: ${appName}`);
  } catch (err) {
    import_consola.consola.error(err.message);
    process.exit(1);
  }
  const stateFiles = await listStateFiles(client, appName);
  if (stateFiles.length === 0) {
    import_consola.consola.warn(`No state files found for app "${appName}" in the remote backend.`);
    process.exit(0);
  }
  while (true) {
    const stateChoice = await import_consola.consola.prompt("Select a state file:", {
      type: "select",
      options: [...stateFiles.map((f) => ({ label: f.label, value: f.key })), { label: EXIT, value: EXIT }],
      cancel: "symbol"
    });
    if (typeof stateChoice === "symbol" || stateChoice === EXIT) process.exit(0);
    let state;
    try {
      import_consola.consola.verbose(`Fetching ${stateChoice}`);
      state = await fetchStateFile(client, stateChoice);
    } catch (err) {
      import_consola.consola.error(`Failed to fetch state file: ${err.message}`);
      continue;
    }
    const resources = parseResources(state);
    if (resources.length === 0) {
      import_consola.consola.warn("No resources found in this state file.");
      continue;
    }
    while (true) {
      const resourceChoice = await import_consola.consola.prompt("Select a resource:", {
        type: "select",
        options: [...resources.map((r) => ({ label: r.address, value: r.address })), { label: BACK, value: BACK }],
        cancel: "symbol"
      });
      if (typeof resourceChoice === "symbol") process.exit(0);
      if (resourceChoice === BACK) break;
      const resource = getResource(resources, resourceChoice);
      if (!resource || resource.instances.length === 0) {
        import_consola.consola.warn("No instance data found for this resource.");
        continue;
      }
      if (resource.instances.length === 1) {
        import_consola.consola.log(JSON.stringify(resource.instances[0].attributes, null, 2));
      } else {
        for (const [i, instance] of resource.instances.entries()) {
          import_consola.consola.log(`
--- Instance ${i} ---`);
          import_consola.consola.log(JSON.stringify(instance.attributes, null, 2));
        }
      }
    }
  }
}

// src/commands/tofu.ts
var command2 = "tofu";
var describe2 = "OpenTofu state management";
function builder2(yargs2) {
  return yargs2.command(view_state_exports).demandCommand(1, "You must provide a tofu subcommand");
}
function handler2() {
}

// src/cli.ts
var args = (0, import_helpers.hideBin)(process.argv).filter((arg) => arg !== "--");
(0, import_yargs.default)(args).scriptName("kad").usage("$0 <command> [options]").strict().command(tofu_exports).option("verbose", {
  type: "boolean",
  describe: "Enable verbose output",
  default: false,
  global: true
}).middleware([
  (argv) => {
    initLogger(argv.verbose ?? false);
  }
]).recommendCommands().demandCommand(1, import_chalk_template.default`{yellow You must provide a command}`).fail((msg, err, yargs2) => {
  if (err) {
    import_consola.consola.error(import_chalk_template.default`\n⚠️  ${err.message}`);
    process.exit(1);
  }
  if (msg) {
    import_consola.consola.error(import_chalk_template.default`\n⚠️  ${msg}\n`);
    yargs2.showHelp();
    process.exit(1);
  }
}).help().alias("h", "help").version().alias("v", "version").parse();
