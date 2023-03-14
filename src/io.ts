import fs from "fs";

export const removeFile = (filename: string) => {
  if (fs.existsSync(`translations/${filename}`)) {
    fs.rmSync(`translations/${filename}`);
  }
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
  fs.writeFileSync(`translations/${filename}`, data);
};
