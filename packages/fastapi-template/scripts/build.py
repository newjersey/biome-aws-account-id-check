"""Build a self-contained AWS Lambda artifact for a target architecture."""

import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

PACKAGE_ROOT = Path(__file__).resolve().parent.parent
SOURCE_PACKAGE = PACKAGE_ROOT / "src" / "fastapi_template"
DIST_DIRECTORY = PACKAGE_ROOT / "dist"

LAMBDA_ARCHITECTURES = ("x86_64", "arm64")
DEFAULT_LAMBDA_ARCHITECTURE = "x86_64"

_MANYLINUX_PLATFORM_TAGS = {
    "x86_64": "x86_64-manylinux2014",
    "arm64": "aarch64-manylinux2014",
}


def _run(command: list[str], *, suppress_stdout: bool = False) -> None:
    subprocess.run(
        command,
        cwd=PACKAGE_ROOT,
        check=True,
        stdout=subprocess.DEVNULL if suppress_stdout else None,
    )


def build(architecture: str = DEFAULT_LAMBDA_ARCHITECTURE) -> None:
    """Install locked manylinux dependencies for `architecture` and copy the application into dist."""
    if architecture not in _MANYLINUX_PLATFORM_TAGS:
        message = f"Unsupported Lambda architecture: {architecture!r}. Expected one of {LAMBDA_ARCHITECTURES}."
        raise ValueError(message)

    shutil.rmtree(DIST_DIRECTORY, ignore_errors=True)
    DIST_DIRECTORY.mkdir(parents=True)

    with tempfile.TemporaryDirectory() as temporary_directory:
        requirements = Path(temporary_directory) / "requirements.txt"
        _run(
            [
                "uv",
                "export",
                "--locked",
                "--no-dev",
                "--no-emit-project",
                "--format",
                "requirements.txt",
                "--output-file",
                str(requirements),
            ],
            suppress_stdout=True,
        )
        _run(
            [
                "uv",
                "pip",
                "install",
                "--requirements",
                str(requirements),
                "--target",
                str(DIST_DIRECTORY),
                "--python-version",
                "3.14",
                "--python-platform",
                _MANYLINUX_PLATFORM_TAGS[architecture],
                "--only-binary",
                ":all:",
            ]
        )

    shutil.copytree(
        SOURCE_PACKAGE,
        DIST_DIRECTORY / SOURCE_PACKAGE.name,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc", "*.pyo"),
    )


def _parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--architecture",
        choices=LAMBDA_ARCHITECTURES,
        default=DEFAULT_LAMBDA_ARCHITECTURE,
        help="Target AWS Lambda architecture (default: %(default)s).",
    )
    return parser.parse_args(argv)


if __name__ == "__main__":
    build(_parse_args().architecture)
