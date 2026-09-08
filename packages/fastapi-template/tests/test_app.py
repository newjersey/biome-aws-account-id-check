"""Verify the public FastAPI route contracts."""

from starlette.testclient import TestClient

from fastapi_template.app import app

client = TestClient(app)


def test_homepage() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.headers["content-type"] == "text/html; charset=UTF-8"
    assert '<html lang="en-US">' in response.text
    assert "<h1>Hello, New Jersey.</h1>" in response.text
    assert "place-items: center" in response.text
    assert '"Public Sans Web", -apple-system, BlinkMacSystemFont' in response.text
    assert "color: #112f4e" in response.text
    assert "background: #ffffff" in response.text
    assert "@media (prefers-color-scheme: dark)" in response.text


def test_head_homepage() -> None:
    response = client.head("/")

    assert response.status_code == 200
    assert response.headers["content-type"] == "text/html; charset=UTF-8"
    assert response.text == ""


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.headers["cache-control"] == "no-store"
    assert response.headers["content-type"] == "application/json; charset=utf-8"
    assert response.json() == {
        "status": "ok",
        "service": "@newjersey/fastapi-template",
    }


def test_not_found() -> None:
    response = client.get("/unsupported")

    assert response.status_code == 404
    assert response.headers["content-type"] == "application/json; charset=utf-8"
    assert response.json() == {"status": "not_found"}
