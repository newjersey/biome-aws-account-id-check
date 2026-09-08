"""Production Uvicorn process entrypoint."""

import uvicorn

from fastapi_template.config import get_server_config


def main() -> None:
    """Run the shared application through Uvicorn."""
    config = get_server_config()
    uvicorn.run(
        "fastapi_template.app:app",
        host=config.hostname,
        port=config.port,
    )


if __name__ == "__main__":
    main()
