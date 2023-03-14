import { Command } from "commander";
import { addDictionary, listDictionaries, removeDictionary } from "./dictionaries";
const figlet = require("figlet");
import {
  addTranslation,
  initTranslations,
  listTranslation,
  removeTranslation,
  translationCoverage,
  translationSync,
} from "./translation";

console.log("\n ----------------------------- \n" + figlet.textSync("TyTra") + "\n ----------------------------- \n");

const program = new Command();

const init = program
  .command("init")
  .description("Initialise translations")
  .action(initTranslations);

const list = program
  .command("list")
  .description("Lists the dictionaries entries")
  .action(listTranslation);

const add = program
  .command("add <entry.path> [values...]")
  .description(
    "Adds a new entry. Entry path is the index inside the translation object separated by periods. Values better be typed within 'simple quotes' because there are issues with double quotes: E.g. add general.bye 'Bye' 'Adios' "
  )
  .action(addTranslation);

const remove = program
  .command("remove <entry.path>")
  .description("Removes an entry from the translations")
  .action(removeTranslation);

const dictList = program
  .command("dict list")
  .description("Lists the dictionaries")
  .action(listDictionaries);

const dictNew = program
  .command("dict new <short_name> <long_name>")
  .description("Adds a new dictionary")
  .action(addDictionary);

const dictRemove = program
  .command("dict remove <short_name>")
  .description("Removes a dictionary")
  .action(removeDictionary);

const sync = program
  .command("sync")
  .description("Syncs the json files into the typed files. Useful for importing common translation files.")
  .action(translationSync);

const coverage = program
  .command("coverage [language]")
  .description("Prints the coverage of the translation through languages")
  .action(translationCoverage);

program.parse(process.argv);
