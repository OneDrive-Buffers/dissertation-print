from __future__ import annotations

import argparse
import os
import re
import shutil
import stat
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent

REF_PATTERN = re.compile(r"\\(?:auto|page)?ref\{([^}]+)\}")
LABEL_PATTERN = re.compile(r"\\label\{([^}]+)\}")
INPUT_PATTERN = re.compile(r"\\(?:input|include)\{([^}]+)\}")
GRAPHICS_PATTERN = re.compile(r"\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}")

PLACEHOLDER_PATTERNS = [
    (re.compile(r"(?i)\bTODO\b|\bTBD\b|\bFIXME\b"), "TODO/TBD/FIXME marker remains in the source."),
    (re.compile(r"\?{3,}"), "Repeated question-mark placeholder remains in the source."),
    (re.compile(r"(?i)\bplaceholder\b"), "Placeholder wording remains in the source."),
    (re.compile(r"(?i)\bde adaugat\b"), "Romanian filler marker 'de adaugat' remains in the source."),
]


@dataclass(frozen=True)
class IssueTarget:
    root: Path
    main_tex: Path
    src_dir: Path
    build_dir: Path
    export_dir: Path
    export_pdf: Path
    display_name: str


@dataclass
class Finding:
    severity: str
    message: str
    path: Path | None = None
    line: int | None = None

    def format(self) -> str:
        prefix = f"[{self.severity}]"
        if self.path is None:
            return f"{prefix} {self.message}"
        rel_path = self.path.relative_to(ROOT_DIR)
        if self.line is None:
            return f"{prefix} {rel_path}: {self.message}"
        return f"{prefix} {rel_path}:{self.line}: {self.message}"


def discover_issues() -> list[IssueTarget]:
    main_tex = ROOT_DIR / "src" / "main.tex"
    if not main_tex.exists():
        return []
    return [
        IssueTarget(
            root=ROOT_DIR,
            main_tex=main_tex,
            src_dir=ROOT_DIR / "src",
            build_dir=ROOT_DIR / "build",
            export_dir=ROOT_DIR / "export",
            export_pdf=ROOT_DIR / "export" / "main.pdf",
            display_name=ROOT_DIR.name,
        )
    ]


def normalize_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def resolve_targets(issue_query: str | None, build_all: bool) -> list[IssueTarget]:
    issues = discover_issues()
    if not issues:
        raise SystemExit("No local issue with src/main.tex was found.")
    if build_all:
        return issues
    if issue_query is None:
        return issues

    query = normalize_name(issue_query)
    target = issues[0]
    searchable = [normalize_name(target.root.name), normalize_name(target.display_name)]
    if any(query in value for value in searchable):
        return issues
    raise SystemExit(f"No local issue matches '{issue_query}'.")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def line_number_from_index(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def iter_tex_files(target: IssueTarget) -> list[Path]:
    tex_files = sorted(path for path in target.src_dir.rglob("*.tex") if path != target.main_tex)
    return [target.main_tex, *tex_files]


def resolve_input_reference(target: IssueTarget, path: Path, reference: str) -> Path | None:
    raw_candidates = [
        path.parent / reference,
        target.src_dir / reference,
        target.root / reference,
    ]
    for raw_candidate in raw_candidates:
        candidate = raw_candidate if raw_candidate.suffix else raw_candidate.with_suffix(".tex")
        resolved = candidate.resolve()
        if resolved.exists():
            return resolved
    return None


def resolve_graphics_reference(target: IssueTarget, path: Path, reference: str) -> Path | None:
    raw_candidates = [
        path.parent / reference,
        target.src_dir / reference,
        target.root / reference,
    ]
    candidates: list[Path] = []
    for raw_candidate in raw_candidates:
        if raw_candidate.suffix:
            candidates.append(raw_candidate)
        else:
            for suffix in (".pdf", ".png", ".jpg", ".jpeg"):
                candidates.append(raw_candidate.with_suffix(suffix))
    for candidate in candidates:
        resolved = candidate.resolve()
        if resolved.exists():
            return resolved
    return None


def collect_labels(target: IssueTarget) -> dict[str, list[tuple[Path, int]]]:
    labels: dict[str, list[tuple[Path, int]]] = {}
    for path in iter_tex_files(target):
        text = read_text(path)
        for match in LABEL_PATTERN.finditer(text):
            label = match.group(1).strip()
            labels.setdefault(label, []).append((path, line_number_from_index(text, match.start())))
    return labels


def collect_refs(target: IssueTarget) -> list[tuple[str, Path, int]]:
    refs: list[tuple[str, Path, int]] = []
    for path in iter_tex_files(target):
        text = read_text(path)
        for match in REF_PATTERN.finditer(text):
            labels = [item.strip() for item in match.group(1).split(",") if item.strip()]
            line = line_number_from_index(text, match.start())
            for label in labels:
                refs.append((label, path, line))
    return refs


def collect_reference_findings(target: IssueTarget) -> list[Finding]:
    findings: list[Finding] = []
    labels = collect_labels(target)

    for label, locations in sorted(labels.items()):
        if len(locations) <= 1:
            continue
        first_path, first_line = locations[0]
        duplicates = ", ".join(
            f"{path.relative_to(ROOT_DIR)}:{line}" for path, line in locations[1:]
        )
        findings.append(
            Finding(
                "ERROR",
                f"Duplicate label '{label}' also appears at {duplicates}.",
                first_path,
                first_line,
            )
        )

    for label, path, line in collect_refs(target):
        if label not in labels:
            findings.append(Finding("ERROR", f"Reference targets missing label '{label}'.", path, line))

    return findings


def collect_file_reference_findings(target: IssueTarget) -> list[Finding]:
    findings: list[Finding] = []
    for path in iter_tex_files(target):
        text = read_text(path)
        for match in INPUT_PATTERN.finditer(text):
            reference = match.group(1).strip()
            resolved = resolve_input_reference(target, path, reference)
            if resolved is None:
                findings.append(
                    Finding(
                        "ERROR",
                        f"Missing TeX include '{reference}'.",
                        path,
                        line_number_from_index(text, match.start()),
                    )
                )

        for match in GRAPHICS_PATTERN.finditer(text):
            reference = match.group(1).strip()
            resolved = resolve_graphics_reference(target, path, reference)
            if resolved is None:
                findings.append(
                    Finding(
                        "ERROR",
                        f"Missing graphic '{reference}'.",
                        path,
                        line_number_from_index(text, match.start()),
                    )
                )

    return findings


def collect_doctor_findings(target: IssueTarget) -> list[Finding]:
    findings: list[Finding] = []

    if not target.main_tex.exists():
        findings.append(Finding("ERROR", "Missing src/main.tex.", target.main_tex))
        return findings

    for command in ("pdflatex",):
        if shutil.which(command) is None:
            findings.append(Finding("ERROR", f"Required command '{command}' is not available on PATH."))

    latexmk_available = shutil.which("latexmk") is not None
    texify_available = shutil.which("texify") is not None
    perl_available = shutil.which("perl") is not None

    if not latexmk_available and not texify_available:
        findings.append(
            Finding(
                "ERROR",
                "Neither latexmk nor texify is available, so no TeX build driver can be used.",
            )
        )
    elif latexmk_available and os.name == "nt" and not perl_available and texify_available:
        findings.append(
            Finding(
                "WARN",
                "Perl is not available, so builds will fall back from latexmk to texify on this machine.",
            )
        )
    elif latexmk_available and os.name == "nt" and not perl_available and not texify_available:
        findings.append(
            Finding(
                "ERROR",
                "latexmk is installed but Perl is unavailable, and texify is not present as a fallback.",
            )
        )

    findings.extend(collect_file_reference_findings(target))
    findings.extend(collect_reference_findings(target))
    return findings


def collect_lint_findings(target: IssueTarget) -> list[Finding]:
    findings: list[Finding] = []
    for path in iter_tex_files(target):
        text = read_text(path)
        for pattern, message in PLACEHOLDER_PATTERNS:
            for match in pattern.finditer(text):
                findings.append(
                    Finding(
                        "WARN",
                        message,
                        path,
                        line_number_from_index(text, match.start()),
                    )
                )
    return findings


def print_findings(title: str, findings: list[Finding]) -> None:
    print(title)
    if not findings:
        print("  No issues found.")
        return
    for finding in findings:
        print(f"  {finding.format()}")


def has_errors(findings: list[Finding]) -> bool:
    return any(finding.severity == "ERROR" for finding in findings)


def remove_readonly(func, path, _excinfo) -> None:
    os.chmod(path, stat.S_IWRITE)
    func(path)


def remove_tree(path: Path) -> None:
    try:
        shutil.rmtree(path, onexc=remove_readonly)
    except TypeError:
        shutil.rmtree(path, onerror=remove_readonly)


def ignore_stage_copy(_directory: str, names: list[str]) -> set[str]:
    ignored: set[str] = set()
    for name in names:
        if name in {"build", "export"}:
            ignored.add(name)
    return ignored


def clean_target(target: IssueTarget) -> None:
    if target.build_dir.exists():
        remove_tree(target.build_dir)
    if target.export_pdf.exists():
        target.export_pdf.unlink()
    if target.export_dir.exists() and not any(target.export_dir.iterdir()):
        try:
            target.export_dir.rmdir()
        except PermissionError:
            pass


def select_build_command() -> tuple[str, list[str]]:
    latexmk_available = shutil.which("latexmk") is not None
    texify_available = shutil.which("texify") is not None
    perl_available = shutil.which("perl") is not None

    if latexmk_available and (os.name != "nt" or perl_available):
        return (
            "latexmk",
            [
                "latexmk",
                "-pdf",
                "-interaction=nonstopmode",
                "-halt-on-error",
                "-file-line-error",
                "main.tex",
            ],
        )

    if texify_available:
        return (
            "texify",
            [
                "texify",
                "--pdf",
                "--batch",
                "--quiet",
                "--max-iterations=5",
                "--tex-option=--halt-on-error",
                "--tex-option=--file-line-error",
                "main.tex",
            ],
        )

    return (
        "latexmk",
        [
            "latexmk",
            "-pdf",
            "-interaction=nonstopmode",
            "-halt-on-error",
            "-file-line-error",
            "main.tex",
        ],
    )


def stage_issue(target: IssueTarget) -> Path:
    target.build_dir.mkdir(parents=True, exist_ok=True)
    target.export_dir.mkdir(parents=True, exist_ok=True)
    stage_dir = target.build_dir / "stage"
    shutil.copytree(target.root, stage_dir, ignore=ignore_stage_copy, dirs_exist_ok=True)
    return stage_dir


def run_doctor(target: IssueTarget) -> int:
    findings = collect_doctor_findings(target)
    print(f"Issue: {target.display_name}")
    print_findings("Doctor report:", findings)
    return 1 if has_errors(findings) else 0


def run_lint(target: IssueTarget, strict: bool = False) -> int:
    findings = collect_lint_findings(target)
    print(f"Issue: {target.display_name}")
    print_findings("Lint report:", findings)
    if strict and findings:
        return 1
    return 0


def build_target(target: IssueTarget) -> int:
    doctor_findings = collect_doctor_findings(target)
    print(f"Issue: {target.display_name}")
    print_findings("Doctor report:", doctor_findings)
    if has_errors(doctor_findings):
        print("Build stopped because doctor found blocking issues.")
        return 1

    lint_findings = collect_lint_findings(target)
    print_findings("Lint report:", lint_findings)

    clean_target(target)
    stage_dir = stage_issue(target)
    staged_src_dir = stage_dir / "src"
    staged_pdf = staged_src_dir / "main.pdf"

    driver, command = select_build_command()

    print("Build command:")
    print(f"  {' '.join(command)}")
    print(f"  Driver: {driver}")

    result = subprocess.run(
        command,
        cwd=staged_src_dir,
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print("LaTeX build failed.")
        if result.stdout.strip():
            print(result.stdout.strip())
        if result.stderr.strip():
            print(result.stderr.strip())
        log_path = staged_src_dir / "main.log"
        if log_path.exists():
            print(f"See build log: {log_path}")
        return result.returncode

    if not staged_pdf.exists():
        print("LaTeX build finished without producing main.pdf in the staged source directory.")
        return 1

    shutil.copy2(staged_pdf, target.export_pdf)
    print(f"Build succeeded. PDF copied to {target.export_pdf}")
    return 0


def run_clean(target: IssueTarget) -> int:
    clean_target(target)
    print(f"Removed build artifacts for {target.display_name}.")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build, validate, and lint Code Quest print issues.")
    parser.add_argument(
        "command",
        nargs="?",
        choices=["list", "doctor", "lint", "build", "clean"],
        default="build",
        help="Command to run.",
    )
    parser.add_argument(
        "--issue",
        help="Optional name filter for this local issue build setup.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Compatibility flag; local setup always targets the current issue only.",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Make lint exit non-zero when warnings are found.",
    )
    return parser.parse_args()


def list_issues() -> int:
    issues = discover_issues()
    if not issues:
        print("No issues found.")
        return 1
    print("Discovered issues:")
    for issue in issues:
        print(f"  - {issue.display_name}")
    return 0


def run_for_targets(targets: list[IssueTarget], action) -> int:
    exit_code = 0
    for index, target in enumerate(targets):
        if index:
            print()
        exit_code = max(exit_code, action(target))
    return exit_code


def main() -> int:
    args = parse_args()

    if args.command == "list":
        return list_issues()

    targets = resolve_targets(args.issue, args.all)

    if args.command == "doctor":
        return run_for_targets(targets, run_doctor)
    if args.command == "lint":
        return run_for_targets(targets, lambda target: run_lint(target, strict=args.strict))
    if args.command == "clean":
        return run_for_targets(targets, run_clean)
    return run_for_targets(targets, build_target)


if __name__ == "__main__":
    sys.exit(main())
