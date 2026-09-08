"""Validated Uvicorn listener configuration."""

import os
from collections.abc import Mapping
from dataclasses import dataclass

DEFAULT_HOSTNAME = "0.0.0.0"
DEFAULT_PORT = 3000
MINIMUM_PORT = 1
MAXIMUM_PORT = 65_535


@dataclass(frozen=True, slots=True)
class ServerConfig:
    """Validated server listener configuration."""

    hostname: str
    port: int


def _parse_port(value: str | None) -> int:
    if value is None:
        return DEFAULT_PORT

    try:
        port = int(value)
    except ValueError as error:
        raise ValueError(
            f"PORT must be an integer from {MINIMUM_PORT} through {MAXIMUM_PORT}."
        ) from error

    if str(port) != value or not MINIMUM_PORT <= port <= MAXIMUM_PORT:
        raise ValueError(f"PORT must be an integer from {MINIMUM_PORT} through {MAXIMUM_PORT}.")

    return port


def get_server_config(environment: Mapping[str, str] | None = None) -> ServerConfig:
    """Read and validate server listener settings."""
    values = os.environ if environment is None else environment
    hostname = values.get("HOST", "").strip() or DEFAULT_HOSTNAME

    return ServerConfig(
        hostname=hostname,
        port=_parse_port(values.get("PORT")),
    )
