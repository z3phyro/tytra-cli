import { Command } from "commander";
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

const add_dict = program
    .command("add_dict <short_name> <long_name>")
    .description("Adds a new dictionary");

const list_dict = program
    .command("list_dict")
    .description("Lists the dictionaries");

const remove_dict = program
    .command("remove_dict <short_name>")
    .description("Removes a dictionary");

program.parse(process.argv);
