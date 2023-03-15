import fs from "fs";

export const removeFile = (filename: string) => {
  if (fs.existsSync(`translations/${filename}`)) {
    fs.rmSync(`translations/${filename}`);
  }
}

export const readTypedFile = (filename: string): object => {
  let result = {};

  try {
    if (fs.existsSync(`translations/${filename}`)) {
      const raw = fs.readFileSync(`translations/${filename}`).toString();
      const regex = /= ({.*})/s;
      const regResult = regex.exec(raw);
      const rawJSON = regResult![1].replace(/(\w+)\s*:/g, '"$1":');
      return JSON.parse(rawJSON);
    }
  } catch (e) {
    console.log(e);
  }

  return result;
}

export const readFile = (filename: string): object => {
  let result = {};
  try {
    if (fs.existsSync(`translations/${filename}`)) {
      result = require(`../translations/${filename}`);
    }
  } catch (e) {
    console.log(e);
  }
  return result;
};

export const writeFile = (filename: string, data: string) => {
  console.log("writing file " + filename);

  fs.writeFileSync(`translations/${filename}`, data);
};
