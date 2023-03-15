import JsonToTS from "json-to-ts";
const unset = require("object-unset");
const set = require("object-set");
const at = require("object-at");
import fs from "fs";
import { readFile, readTypedFile, writeFile } from "./io";
import { getDictionaries, initDictionaries, writeDictionaries } from "./dictionaries";

export const surfTranslations = (json: any, trail = "") => {
  const keys = Object.keys(json);

  for (let key of keys) {
    const path = `${trail ? trail + "." : ""}${key}`;
    if (typeof json[key] == "object") surfTranslations(json[key], path);
    else console.log(path, json[key]);
  }
};


export const listTranslation = () => {
  const json = readTranslation();
  surfTranslations(json);
};

export const addTranslation = (entry_path: string, default_values: string[]) => {
  const dicts = getDictionaries();
  const languages = Object.values(dicts);

  let count = 0;
  for (let dict of languages) {
    let json = readTranslation(dict);
    set(json, entry_path, default_values[count] || "-");;
    writeTranslation(json, dict);

    if (count == 0) {
      writeInterface(json);
    }

    count++;
  }

  console.log(`Entry added ${entry_path} ${default_values} in ${count} Dictionaries \n`);
};

export const writeInterface = (json: any) => {
  const interfaces = JsonToTS(json);
  let result = "";

  for (let inter of interfaces) {
    result += inter + "\n";
  }

  result = result.replace(
    "interface RootObject",
    "export interface TranslationInterface"
  );

  writeFile("translation.interface.ts", result);
};

export const readTranslation = (dictName = "english"): object => {
  return readTypedFile(
    `${dictName.toLowerCase()}.translation.ts`
  );
};

export const writeTranslation = (json: object, dictName = "English") => {
  let result = `import { TranslationInterface } from "./translation.interface"; 

export const ${dictName}Translation: TranslationInterface = ${JSON.stringify(json, null, 2).replace(/"(\w+)"\s*:/g, '$1:')};
`;

  writeFile(`${dictName.toLowerCase()}.translation.ts`, result);
};

export const removeTranslations = (entry_path: string) => {
  const dicts = getDictionaries();

  for (let language of Object.values(dicts)) {
    removeTranslation(entry_path, language);
  }
}
export const removeTranslation = (entry_path: string, language: string) => {
  let json = readTranslation(language);

  unset(json, entry_path);

  writeTranslation(json);

  console.log(`Entry removed ${entry_path} for ${language}\n`);
  try {
    const parts = entry_path.split(".");
    parts.pop();

    const obj = at(json, parts.join("."));
    if (Object.keys(obj).length === 0) {
      removeTranslation(parts.join("."), language);
    }
  } catch (e) {
    console.log(e);
  }
};

export const initTranslations = () => {
  try {
    if (!fs.existsSync("translations/")) {
      fs.mkdirSync("translations/");
    }
  } catch (e) { }

  initDictionaries();

  const json = {
    general: {
      hello: "Hello World!",
    },
    about: {
      company: "Company",
    },
  };

  const dicts = getDictionaries();

  writeInterface(json);
  for (let dict of Object.values(dicts)) {
    writeTranslation(json, dict);
  }
};

export const translationSync = () => {
  const dicts = getDictionaries();
  writeDictionaries(dicts);

  let count = 0;
  for (let dict of Object.values(dicts)) {
    const json = readFile(`${dict.toLowerCase()}.translation.json`);
    if (count == 0) writeInterface(json);

    writeTranslation(json, dict);
  }
}

export const getCoverage = (dict: any, verbose = false) => {
  let totalKeys = 0;
  let translatedKeys = 0;

  const arraySurfer = (json: any, trail: string) => {
    const keys = Object.keys(json);

    for (let key of keys) {
      const path = `${trail ? trail + "." : ""}${key}`;
      if (typeof json[key] == "object") arraySurfer(json[key], path);
      else {
        totalKeys++;
        if (json[key] && json[key] != "-") {
          translatedKeys++;
        } else if (verbose) {
          console.log(path)
        }
      }
    }
  }

  arraySurfer(dict, "");

  return ((translatedKeys * 100) / totalKeys).toFixed(0);
}

export const translationCoverage = (language: string | undefined) => {
  const dicts = getDictionaries();
  if (!language) {
    for (let dict of Object.keys(dicts)) {
      console.log(`${dict} ${dicts[dict]} ${getCoverage(readTypedFile(`${dicts[dict].toLowerCase()}.translation.ts`))}%`);
    }
  } else {
    let index = language.toLowerCase();

    if (dicts[index]) {
      index = dicts[index];
    }
    console.log(`${index} ${getCoverage(readTypedFile(`${index.toLowerCase()}.translation.ts`), true)}%`);
  }
}
