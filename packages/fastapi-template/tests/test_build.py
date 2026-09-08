"""Verify the Lambda artifact build script."""

import importlib.util
import subprocess
import sys
from pathlib import Path
from types import ModuleType
from unittest.mock import Mock

import pytest

BUILD_SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "build.py"


def _load_build_module() -> ModuleType:
    """Load `scripts/build.py` as an isolated module for each test."""
    spec = importlib.util.spec_from_file_location("fastapi_template_build_script", BUILD_SCRIPT)
    assert spec is not None
    assert spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


@pytest.fixture
def build_module(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> tuple[ModuleType, Mock]:
    """Load the build script against an isolated package root and mocked subprocess."""
    module = _load_build_module()

    package_root = tmp_path / "package"
    source_package = package_root / "src" / "fastapi_template"
    dist_directory = package_root / "dist"
    source_package.mkdir(parents=True)
    (source_package / "app.py").write_text("app = None\n", encoding="utf-8")
    (source_package / "__pycache__").mkdir()
    (source_package / "__pycache__" / "app.cpython-314.pyc").write_bytes(b"")

    monkeypatch.setattr(module, "PACKAGE_ROOT", package_root)
    monkeypatch.setattr(module, "SOURCE_PACKAGE", source_package)
    monkeypatch.setattr(module, "DIST_DIRECTORY", dist_directory)

    run = Mock()
    monkeypatch.setattr(module.subprocess, "run", run)

    return module, run


def test_build_replaces_the_dist_directory(build_module: tuple[ModuleType, Mock]) -> None:
    module, _run = build_module
    stale_file = module.DIST_DIRECTORY / "stale.txt"
    module.DIST_DIRECTORY.mkdir(parents=True)
    stale_file.write_text("stale", encoding="utf-8")

    module.build()

    assert not stale_file.exists()
    assert module.DIST_DIRECTORY.is_dir()


def test_build_copies_the_source_package_without_bytecode(
    build_module: tuple[ModuleType, Mock],
) -> None:
    module, _run = build_module

    module.build()

    copied_package = module.DIST_DIRECTORY / "fastapi_template"
    assert (copied_package / "app.py").read_text(encoding="utf-8") == "app = None\n"
    assert not (copied_package / "__pycache__").exists()


def test_build_exports_locked_dependencies_and_installs_manylinux_wheels(
    build_module: tuple[ModuleType, Mock],
) -> None:
    module, run = build_module

    module.build()

    assert run.call_count == 2

    export_call, install_call = run.call_args_list
    export_command = export_call.args[0]
    install_command = install_call.args[0]

    assert export_command[:4] == ["uv", "export", "--locked", "--no-dev"]
    assert "--output-file" in export_command
    requirements_path = Path(export_command[export_command.index("--output-file") + 1])

    assert install_command[:3] == ["uv", "pip", "install"]
    assert "--requirements" in install_command
    assert Path(install_command[install_command.index("--requirements") + 1]) == requirements_path
    assert "--target" in install_command
    assert Path(install_command[install_command.index("--target") + 1]) == module.DIST_DIRECTORY
    assert "--python-version" in install_command
    assert install_command[install_command.index("--python-version") + 1] == "3.14"
    assert "--python-platform" in install_command
    assert install_command[install_command.index("--python-platform") + 1] == "x86_64-manylinux2014"
    assert "--only-binary" in install_command
    assert install_command[install_command.index("--only-binary") + 1] == ":all:"

    for call in run.call_args_list:
        assert call.kwargs["cwd"] == module.PACKAGE_ROOT
        assert call.kwargs["check"] is True

    assert export_call.kwargs["stdout"] == subprocess.DEVNULL
    assert install_call.kwargs["stdout"] is None


def test_build_installs_arm64_manylinux_wheels_for_the_arm64_architecture(
    build_module: tuple[ModuleType, Mock],
) -> None:
    module, run = build_module

    module.build("arm64")

    _export_call, install_call = run.call_args_list
    install_command = install_call.args[0]

    assert "--python-platform" in install_command
    assert (
        install_command[install_command.index("--python-platform") + 1] == "aarch64-manylinux2014"
    )


def test_build_rejects_an_unsupported_architecture(
    build_module: tuple[ModuleType, Mock],
) -> None:
    module, _run = build_module

    with pytest.raises(ValueError, match="Unsupported Lambda architecture"):
        module.build("mips")


def test_parse_args_defaults_to_x86_64() -> None:
    module = _load_build_module()

    args = module._parse_args([])

    assert args.architecture == "x86_64"


def test_parse_args_accepts_arm64() -> None:
    module = _load_build_module()

    args = module._parse_args(["--architecture", "arm64"])

    assert args.architecture == "arm64"


def test_run_suppresses_stdout_when_requested(monkeypatch: pytest.MonkeyPatch) -> None:
    module = _load_build_module()
    run = Mock()
    monkeypatch.setattr(module.subprocess, "run", run)

    module._run(["uv", "--version"], suppress_stdout=True)

    run.assert_called_once_with(
        ["uv", "--version"],
        cwd=module.PACKAGE_ROOT,
        check=True,
        stdout=subprocess.DEVNULL,
    )


def test_run_defaults_to_inherited_stdout(monkeypatch: pytest.MonkeyPatch) -> None:
    module = _load_build_module()
    run = Mock()
    monkeypatch.setattr(module.subprocess, "run", run)

    module._run(["uv", "--version"])

    run.assert_called_once_with(
        ["uv", "--version"],
        cwd=module.PACKAGE_ROOT,
        check=True,
        stdout=None,
    )
