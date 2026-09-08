"""Verify the production Uvicorn process entrypoint."""

from unittest.mock import Mock

import pytest

from fastapi_template import server
from fastapi_template.config import ServerConfig


def test_main_runs_uvicorn_with_the_validated_configuration(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        server,
        "get_server_config",
        lambda: ServerConfig(hostname="192.0.2.1", port=8080),
    )
    run = Mock()
    monkeypatch.setattr(server.uvicorn, "run", run)

    server.main()

    run.assert_called_once_with(
        "fastapi_template.app:app",
        host="192.0.2.1",
        port=8080,
    )
