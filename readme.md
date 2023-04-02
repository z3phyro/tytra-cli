
![TyTra](./tytra.png)
# Typed Translations CLI - TyTra-CLI

CLI inspired by prisma, to create and mantain statically typed translations on any typescript project.

# Installation

## Install the dependency
```bash
npm i -D @z3phyro/tytra-cli
```

```bash
yarn add -D @z3phyro/tytra-cli
```

## Setup project package.json script

```json
{
  "scripts": {
    "tytra": "node ./node_modules/.bin/tytra"
  }
}
```

## Or use an alias
```bash
alias tytra="node ./node_modules/.bin/tytra"
```

## Run it!

```bash
npm run tytra
```

## Or if you have an alias
```
tytra
```

# Use

## To see the help
```bash
tytra
```

## To initialize the translations (First step)
```bash
tytra init
```

## To add a translation
```bash
tytra add <entry.path> [values...]
```

Values need to be in the same order as the dicts in the dictionaries.json file

## To see the translation coverage per language 

```bash
tytra coverage
```

## To see the translation coverage of a particular language 

```bash
tytra coverage [language-shortname]
```
