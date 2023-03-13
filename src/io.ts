import fs from "fs";

export const readFile = (path: string, requirePath: string): object => {
  let result = {};
  try {
    if (fs.existsSync(path)) {
      result = require(requirePath);
    }
  } catch (e) {
    console.log(e);
  }
  return result;
};

export const writeFile = (path: string, data: string) => {
  fs.writeFileSync(path, data);
};
