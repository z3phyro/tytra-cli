import { Command } from "commander"; // add this line
const set = require("object-set");
const figlet = require("figlet");
import fs from "fs";

console.log(figlet.textSync("tradu"));

const program = new Command();

const list = program.command("list");
list
  .description("Lists the dictionaries entries")
  .action(() => {
    console.log("Lists the entries");
  })

const add = program.command("add <entry.path> [default_value]");
add
  .description("Adds a new entry. Entry path is the index inside the translation object separated by periods.")
  .action((entry_path, default_value) => {
    let data;
    try {
      if (fs.existsSync("./translation.json")) {
        data = fs.readFileSync("./translation.json", "utf-8");
      }
    } catch (e) {
      console.log("File not found");
    }
    let json = {};

    if (data?.toString()) {
      json = JSON.parse(data);
    }

    set(json, entry_path, default_value || "");
    console.log(json);

    fs.writeFileSync("./translation.json", JSON.stringify(json));
  });

const remove = program.command("remove <entry.path>");
remove
  .description("Removes an entry from the translations")
  .action((entry_path) => {
    console.log("removing " + entry_path);
  });

program.parse(process.argv);

