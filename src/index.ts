import { Command } from "commander";
import { addDictionary, listDictionaries, removeDictionary } from "./dictionaries";
const figlet = require("figlet");
import {
  addTranslation,
  initTranslations,
  listTranslation,
  removeTranslation,
} from "./translation";

// figlet("tradu", (err: any, data: any) => console.log(data));

const program = new Command();

const list = program
  .command("list")
  .description("Lists the dictionaries entries")
  .action(listTranslation);

const add = program
  .command("add <entry.path> [default_value]")
  .description(
    "Adds a new entry. Entry path is the index inside the translation object separated by periods."
  )
  .action(addTranslation);

const remove = program
  .command("remove <entry.path>")
  .description("Removes an entry from the translations")
  .action(removeTranslation);

const init = program
  .command("init")
  .description("Initialise translations")
  .action(initTranslations);

const dictNew = program
  .command("dict new <short_name> <long_name>")
  .description("Adds a new dictionary")
  .action(addDictionary);

const dictList = program
  .command("dict list")
  .description("Lists the dictionaries")
  .action(listDictionaries);

const dictRemove = program
  .command("dict remove <short_name>")
  .description("Removes a dictionary")
  .action(removeDictionary);

program.parse(process.argv);
