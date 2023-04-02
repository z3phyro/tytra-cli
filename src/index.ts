import { Command } from "commander";
import { initTranslations } from "@z3phyro/tytra-core";
import {
    addTranslation,
    listTranslation,
    removeTranslations,
    translationCoverage,
    translationImport,
} from "@z3phyro/tytra-core/lib/translations";
import {
    addDictionary,
    listDictionaries,
    removeDictionary,
} from "@z3phyro/tytra-core/lib/dictionaries";
const figlet = require("figlet");

console.log(
    "\n ----------------------------- \n" +
        figlet.textSync("TyTra") +
        "\n ----------------------------- \n"
);

const program = new Command();

const init = program
    .command("init")
    .description("Initialize translations")
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
    .action((entryPath: string, values: string[]) => {
        addTranslation(entryPath, values);
    });

const remove = program
    .command("remove <entry.path>")
    .description("Removes an entry from the translations")
    .action(removeTranslations);

const dictList = program
    .command("dict-list")
    .description("Lists the dictionaries")
    .action(listDictionaries);

const dictNew = program
    .command("dict-new <short_name> <long_name>")
    .description("Adds a new dictionary")
    .action(addDictionary);

const dictRemove = program
    .command("dict-remove <short_name>")
    .description("Removes a dictionary")
    .action(removeDictionary);

const sync = program
    .command("import")
    .description(
        "Imports json files named eg: 'english.translation.json' into the typed files. Useful for importing common translation files."
    )
    .action(translationImport);

const coverage = program
    .command("coverage [language]")
    .description("Prints the coverage of the translation through languages")
    .action(translationCoverage);

program.parse(process.argv);
