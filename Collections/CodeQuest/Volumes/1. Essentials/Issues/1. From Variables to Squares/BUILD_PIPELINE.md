BUILD PIPELINE
==============

This issue uses a local build driver, `build.py`, inspired by the dissertation pipeline in `paper/`.

Overview
--------

The pipeline is intentionally split into five commands:

1. `list`
2. `doctor`
3. `lint`
4. `build`
5. `clean`

Command Behavior
----------------

### list

Lists the current issue when `src/main.tex` exists.

### doctor

`doctor` performs preflight checks for the current issue:

- confirms the required executables exist on `PATH`
- checks that `src/main.tex` exists
- warns when `latexmk` cannot be used because Perl is missing on Windows
- verifies `\input{...}` and `\includegraphics{...}` references resolve to real files
- finds duplicate labels
- finds unresolved `\ref{...}` targets

### lint

`lint` reports production issues that should be cleaned before release:

- `TODO`, `TBD`, `FIXME`
- obvious placeholder text
- repeated `???`
- Romanian filler markers such as `de adaugat`

Warnings are advisory unless `--strict` is used.

### build

`build` runs the following sequence:

1. run `doctor`
2. run `lint`
3. remove the old `build/` directory and exported PDF for the current issue
4. stage the issue into `build/stage/`
5. compile `src/main.tex` from the staged tree
6. copy the generated PDF to `export/main.pdf`

The driver prefers `latexmk` when available and usable. On this machine it automatically falls back to MiKTeX `texify` because `latexmk` is installed but Perl is not.

### clean

`clean` removes generated `build/` and `export/main.pdf` artifacts for the current issue.

Automation Workflow
-------------------

Use the same authoring rhythm for every future issue:

1. gather research and references in `bibliography/`
2. try rough layouts or experiments in `guide/`
3. move the approved structure into `src/include/` and `src/sections/`
4. keep `src/main.tex` as a small orchestration file
5. build and review the generated PDF from `export/`

This keeps drafts, assets, production sources, and generated files cleanly separated.
