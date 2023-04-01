#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const tytra_core_1 = require("@z3phyro/tytra-core");
const translations_1 = require("@z3phyro/tytra-core/lib/translations");
const dictionaries_1 = require("@z3phyro/tytra-core/lib/dictionaries");
const figlet = require("figlet");
console.log("\n ----------------------------- \n" +
    figlet.textSync("TyTra") +
    "\n ----------------------------- \n");
const program = new commander_1.Command();
const init = program
    .command("init")
    .description("Initialise translations")
    .action(tytra_core_1.initTranslations);
const list = program
    .command("list")
    .description("Lists the dictionaries entries")
    .action(translations_1.listTranslation);
const add = program
    .command("add <entry.path> [values...]")
    .description("Adds a new entry. Entry path is the index inside the translation object separated by periods. Values better be typed within 'simple quotes' because there are issues with double quotes: E.g. add general.bye 'Bye' 'Adios' ")
    .action((entryPath, values) => {
    (0, translations_1.addTranslation)(entryPath, values);
});
const remove = program
    .command("remove <entry.path>")
    .description("Removes an entry from the translations")
    .action(translations_1.removeTranslations);
const dictList = program
    .command("dict-list")
    .description("Lists the dictionaries")
    .action(dictionaries_1.listDictionaries);
const dictNew = program
    .command("dict-new <short_name> <long_name>")
    .description("Adds a new dictionary")
    .action(dictionaries_1.addDictionary);
const dictRemove = program
    .command("dict-remove <short_name>")
    .description("Removes a dictionary")
    .action(dictionaries_1.removeDictionary);
const sync = program
    .command("import")
    .description("Imports json files named eg: 'english.translation.json' into the typed files. Useful for importing common translation files.")
    .action(translations_1.translationImport);
const coverage = program
    .command("coverage [language]")
    .description("Prints the coverage of the translation through languages")
    .action(translations_1.translationCoverage);
program.parse(process.argv);
//# sourceMappingURL=index.js.map