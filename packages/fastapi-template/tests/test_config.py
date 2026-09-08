"""Verify Uvicorn listener environment validation."""

import pytest

from fastapi_template.config import ServerConfig, get_server_config


def test_defaults() -> None:
    assert get_server_config({}) == ServerConfig(hostname="0.0.0.0", port=3000)


def test_configured_values() -> None:
    assert get_server_config({"HOST": "127.0.0.1", "PORT": "4100"}) == ServerConfig(
        hostname="127.0.0.1", port=4100
    )


def test_blank_hostname_uses_default() -> None:
    assert get_server_config({"HOST": "  "}) == ServerConfig(hostname="0.0.0.0", port=3000)


@pytest.mark.parametrize("port", ["0", "65536", "3000.5", "not-a-port", "03000"])
def test_invalid_ports(port: str) -> None:
    with pytest.raises(
        ValueError,
        match=r"PORT must be an integer from 1 through 65535\.",
    ):
        get_server_config({"PORT": port})


def test_reads_process_environment(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("HOST", "192.0.2.1")
    monkeypatch.setenv("PORT", "8080")

    assert get_server_config() == ServerConfig(hostname="192.0.2.1", port=8080)
