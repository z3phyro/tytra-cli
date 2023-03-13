import { Command } from "commander"; // add this line
const set = require("object-set");
const unset = require("object-unset");
const at = require("object-at");
const figlet = require("figlet");
import fs from "fs";
import JsonToTS from "json-to-ts";

// figlet("tradu", (err: any, data: any) => console.log(data));

const locations = {
  write: 'translations/',
  require: '../translations/'
};

const fileNames: { [id: string | "default"]: string } = {
  interface: 'translation.interface.ts',
  default: 'translation.ts',
  json: 'translation.json',
};


const program = new Command();

const navigate = (json: any, trail = "") => {
  const keys = Object.keys(json);

  for (let key of keys) {
    const path = `${trail ? trail + '.' : ''}${key}`;
    if (typeof json[key] == 'object') navigate(json[key], path);
    else console.log(path);
  }
}

const listAction = () => {
  const json = readTranslation();
  navigate(json);
}

const writeInterface = (json: any) => {
  const interfaces = JsonToTS(json);
  let result = "";

  for (let inter of interfaces) {
    result += inter + "\n";
  }

  result = result.replace("interface RootObject", "export interface TranslationInterface");

  fs.writeFileSync(locations.write + fileNames['interface'], result);
}

const readTranslation = (dict = "json"): object => {
  let result = {};
  try {
    if (!fs.existsSync(locations.write)) {
      fs.mkdirSync(locations.write);
    }
  } catch (e) { }
  try {
    const location = locations.write + fileNames[dict];
    if (fs.existsSync(location)) {
      result = require(locations.require + fileNames[dict]);
      console.log("Reading", result, location);
    }
  } catch (e) {
    console.log(e);
  }
  return result;
}

const writeTranslation = (json: object, dict = "default") => {
  fs.writeFileSync(locations.write + fileNames['json'], JSON.stringify(json));
  let result = `import { TranslationInterface } from "./translation.interface";

export const Translation: TranslationInterface = ${JSON.stringify(json)};
  `;

  fs.writeFileSync(locations.write + fileNames[dict], result);
}


const removeAction = (entry_path: string) => {
  let json = readTranslation();

  unset(json, entry_path);

  writeTranslation(json);

  console.log(`Entry removed ${entry_path} \n`);
  try {
    const parts = entry_path.split(".");
    parts.pop();

    const obj = at(json, parts.join("."))
    if (Object.keys(obj).length === 0) {
      removeAction(parts.join("."));
    }
  } catch (e) { }

}

const list = program.command("list");
list
  .description("Lists the dictionaries entries")
  .action(listAction)

const add = program.command("add <entry.path> [default_value]");
add
  .description("Adds a new entry. Entry path is the index inside the translation object separated by periods.")
  .action(async (entry_path, default_value) => {
    let json = readTranslation();

    set(json, entry_path, default_value || "");

    writeInterface(json);

    writeTranslation(json);

    console.log(`Entry added ${entry_path} ${default_value}\n`);
  });

const remove = program.command("remove <entry.path>");
remove
  .description("Removes an entry from the translations")
  .action(removeAction);

program.parse(process.argv);

