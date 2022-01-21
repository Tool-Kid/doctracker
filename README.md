<p align="center">
  <img src="https://www.pngrepo.com/png/233937/512/tracking-track.png" alt="TypeORM Express Query Builder logo" width="200" height="200">
</p>

<h1 align="center"> DocTracker </h1>

<p align="center">
  DocTracker is a tool that aims you to keep your code source tracked & stay sync with your documentation.
  <br>
  <br>
  <img src="https://img.shields.io/badge/workspace-143157?style=for-the-badge&logo=NX&logoColor=white&link=https://nx.dev">
  <br>
  <br>
  <img src="https://img.shields.io/badge/rjlopezdev-violet?style=flat-square&logo=open-source-initiative&logoColor=black&link=https://github.com/rjlopezdev">
  <a href="https://badge.fury.io/js/@doctracker%2Ftracker"><img src="https://img.shields.io/npm/v/@doctracker/cli/beta?style=flat-square"></a>
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square">
  <br>
  <br>
  <a href="CONTRIBUTING.md"> Contributing </a>
  ·
  <a href="LICENSE"> License </a>
</p>

# How it works?

DocTracker scan your code source & documentation directories & look for changes based on [Git Commit History.](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)

# Features

- Keep updated your system documentation 📚
- Get reports when changes in docs are needed 📝
- Automate this proccess in your team thanks to CI/CD integration 🔄

# Installation

```bash
npm install -g @doctracker/cli
```

# Compatibility

**DocTracker** is language & framework agnostic of codebase & documentation tools.

# Usage

> Ensure you [configure](#configuration) `DocTracker` before using it

## Scan for uncommited changes

```bash
doctracker scan
```

### Report Example

```console
doctracker$> doctracker scan
info: [DocTracker] ⌛ Reading configuration file from /Users/doctracker/dev/project/doctracker.config.json
info: [DocTracker] ✅ Configuration loaded successfully!
info: [DocTracker] ⌛ Scanning files...
warn: [DocTracker] 📜 <Report: 80ba2142-6d60-48e3-a7b2-d07f0d68bd4a>
warn: [DocTracker] ==================================================
warn: [DocTracker] 🔎 Report for <Tracker: Codebase 1>
warn: [DocTracker] ==================================================
warn: [DocTracker] 📈 <Segment: Model A>
warn: [DocTracker] ==================================================
warn: [DocTracker] 📄 <Modified Sources>
warn: [DocTracker] ==================================================
warn: [DocTracker] src/model-a.ts
warn: [DocTracker] ==================================================
warn: [DocTracker] 📚 <Affected Docs>
warn: [DocTracker] ==================================================
warn: [DocTracker] 📄 docs/doc-a.md
warn: [DocTracker] 🔗 https://www.github.com/
```

## Scan committed changes comparing to target branch

```bash
doctracker scan --target branch
```

### Report Example

```console
doctracker$> doctracker scan --target branch
info: [DocTracker] ⌛ Reading configuration file from /Users/doctracker/dev/project/doctracker.config.json
info: [DocTracker] ✅ Configuration loaded successfully!
info: [DocTracker] ⌛ Scanning files...
info: [DocTracker] ✨ Start scanning operation using target branch <master>...
info: [DocTracker] 💾 Stashing changes from current branch <feat/1>...
info: [DocTracker] ✅ Stash successfully created with name DocTracker-1642279023749
info: [DocTracker] 🏃 Checking out to target branch <master>...
info: [DocTracker] ✅ Check out completed!
info: [DocTracker] ⌛ Computing changes...
info: [DocTracker] ✅ Changes computed!
info: [DocTracker] 🏃 Checking out to working branch <feat/1> & applying stash...
info: [DocTracker] ✅ Stash applied successfully!
warn: [DocTracker] 📜 <Report: 865e2fbe-1f5f-4d89-8459-21d21d794fa0>
warn: [DocTracker] ==================================================
warn: [DocTracker] 🔎 Report for <Tracker: Codebase 1>
warn: [DocTracker] ==================================================
warn: [DocTracker] 📈 <Segment: Model A>
warn: [DocTracker] ==================================================
warn: [DocTracker] 📄 <Modified Sources>
warn: [DocTracker] ==================================================
warn: [DocTracker] src/model-a.ts
warn: [DocTracker] ==================================================
warn: [DocTracker] 📚 <Affected Docs>
warn: [DocTracker] ==================================================
warn: [DocTracker] 📄 docs/doc-a.md
warn: [DocTracker] 🔗 https://www.github.com/
```

## Help

CLI has a built in helper

```bash
doctracker --help
```

# Key Concepts

- [Tracker](#tracker)
- [Segment](#segment)
- [Reporter](#reporter)
- [Channel](#channel)

# Configuration

Configuration file is an entry point for `DocTracker`.

`📄 docktracker.config.json`

```json
{
  "git": {
    "branch": "main"
  },
  "trackers": [
    {
      "id": "Codebase 1",
      "sourcePath": "./src",
      "docsPath": "./docs",
      "channel": "Channel 1",
      // use this for setting from external config file
      "trackerPath": "tools/docktracker.json",
      // use this for setting from inline config
      "segments": [
        {
          "id": "Model A", // segment identifier
          "source": ["model-a.ts", "model-a.props.ts", "config/"], // files & dirs to track
          "docs": ["doc-model-a.md"],
          "report": {
            "msg": "Model A changed!"
          }
        }
      ]
    }
  ],
  "reporter": {
    "channels": [
      {
        "id": "Console Channel",
        "type": "console",
        "options": {
          "log": true,
          "verbose": true,
          "format": "default"
        }
      },
      {
        "id": "HTTP Channel",
        "type": "http",
        "options": {
          "log": true,
          "verbose": true,
          "format": "json",
          "url": "http://docs.my-domain.com/reports",
          "method": "post"
        }
      },
      {
        "id": "GitHub Channel",
        "type": "github_pr",
        "options": {}
      }
    ]
  }
}
```

## Git

You can configure how `DocTracker` detect changes from [Git](https://git-scm.com/)

| Property   | Required | Type     | Default  | Description                        | Example    |
| ---------- | -------- | -------- | :------: | ---------------------------------- | ---------- |
| **branch** | `Yes`    | `string` | `'main'` | A target branch to compare changes | `'master'` |

## Tracker

**DocTracker** supports multiple `Trackers`.

A `Tracker` is a piece that locate `source` & `docs` files for changes tracking.

| Property        | Required | Type                  | Default | Description                                                  | Example                             |
| --------------- | -------- | --------------------- | :-----: | ------------------------------------------------------------ | ----------------------------------- |
| **id**          | `Yes`    | `string`              |    -    | Id for the Tracker                                           | `'Tracker for Foo Microservice'`    |
| **sourcePath**  | `Yes`    | `string`              |    -    | A list of source paths that `Tracker` will scan for changes  | `'./src'`                           |
| **docsPath**    | `Yes`    | `string`              |    -    | A list of doc paths that `Tracker` will scan for changes     | `'./docs'`                          |
| **segments**    | `No`     | [Segment[]](#segment) |    -    | Segments for Tracker                                         | [View Segment definition](#segment) |
| **trackerPath** | `No`     | `string`              |    -    | A path for `tracker.config.json` (relative for `sourcePath`) | `'tools/doctracker.json'`           |

## Segment

A `Tracker` can handle multiple `Segments`.

A `Segment` is a piece that slice `Tracker` into little pieces for reporting.

| Property   | Required | Type                       | Default | Description                                                 | Example                                        |
| ---------- | -------- | -------------------------- | :-----: | ----------------------------------------------------------- | ---------------------------------------------- |
| **id**     | `Yes`    | `string`                   |    -    | Id for the Segment                                          | `'Segment for Tracker 1'`                      |
| **source** | `Yes`    | `string[]`                 |    -    | A list of source paths that `Segment` will scan for changes | `['model-a.ts']`                               |
| **docs**   | `Yes`    | [`string[]*`](#doc-format) |    -    | A list of doc paths that `Segment` will scan for changes    | [View Doc Format](#doc-format)                 |
| **report** | `No`     | `ReportFormat[]`           |    -    | Format for reporting                                        | [View ReportFormat definition](#report-format) |

### Doc Format

A Doc could be a valid:

- File path: `models/model-a.ts`
- Directory path: `models/props`
- URL: `http://www.docs.doctracker.com`

## Reporter

**DocTracker** can report changes detected at multiple by `Reporter`.

A `Reporter` can report changes at multiple `Channels`.

| Property     | Required | Type                  | Description                 |
| ------------ | -------- | --------------------- | --------------------------- |
| **channels** | `No`     | [Channel[]](#channel) | A list of report `Channels` |

## Channel

A `Reporter` can report advices in multiple `Channels`.

A `Channel` is a communication channel for reporting.

| Property    | Required | Type          | Description                       |
| ----------- | -------- | ------------- | --------------------------------- |
| **type**    | `Yes`    | `ChannelType` | Channel name to use for reporting |
| **options** | `No`     | `any`         | Options to configure `Channel`    |

## ChannelType

Identifies an already supported `Channel`.

| Channel     | Description                             |
| ----------- | --------------------------------------- |
| `console`   | Report on `console`                     |
| `github_pr` | Report on `GitHub` Pull Request comment |

## Report Format

A format for `Report`.

| Property | Required | Type     | Description                   | Example               |
| -------- | -------- | -------- | ----------------------------- | --------------------- |
| **msg**  | `No`     | `string` | Message to show by `Reporter` | 'Message for report!' |

## Tracker Configuration

A `doctracker.json` file **must be placed inside** a _Tracker path_.

This file contains a mapping `<id, file|dir>` for file or directoriess inside a `Tracker` path.

A `Tracker` can follow many changes. This little pieces are called `Segments`.

A `Segment` define its `id` **(must be unique)** & `<source, docs>`, files & directories to track.

`📄 doctracker.json`

```json
{
  "segments": [
    {
      "id": "Model A", // segment identifier
      "source": ["model-a.ts", "model-a.props.ts", "config/"], // files & dirs to track
      "docs": ["doc-model-a.md"]
    }
  ]
}
```

> Now, when changes on `source` ocurred, will be reported an advice to request changes on `docs`. This report will include `id` to easily identify which `Segment` trigger this report.

# CI/CD

> **TODO**: Explain different ways to configure it

## GitHub

Configure `DocTracker` for tracking docs on `GitHub Action` events ocurred.

```yaml
// TODO
```

## GitLab

Configure `DocTracker` with your `GitLab` pipeline.

```yaml
// TODO
```
