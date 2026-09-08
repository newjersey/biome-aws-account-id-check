"""Verify the Mangum Lambda adapter against a representative proxy integration event."""

import json
from typing import Any
from unittest.mock import Mock

from fastapi_template.lambda_handler import handler


def create_lambda_proxy_event(method: str, path: str) -> dict[str, Any]:
    """Create a representative Lambda proxy integration event.

    Mangum auto-detects the event shape at runtime, so this fixture is one example event rather
    than a guaranteed contract. It mirrors a private REST API Gateway (payload format version 1)
    integration; adjust the shape locally to match another integration (HTTP API or ALB) if a
    project uses one instead.
    """
    return {
        "resource": "/{proxy+}",
        "path": path,
        "httpMethod": method,
        "headers": {"Host": "api.example.gov"},
        "multiValueHeaders": {"Host": ["api.example.gov"]},
        "queryStringParameters": None,
        "multiValueQueryStringParameters": None,
        "pathParameters": None,
        "stageVariables": None,
        "body": None,
        "isBase64Encoded": False,
        "requestContext": {
            "accountId": "123456789012",
            "apiId": "test-api",
            "domainName": "api.example.gov",
            "httpMethod": method,
            "path": path,
            "requestId": "test-request",
            "resourceId": "test-resource",
            "resourcePath": "/{proxy+}",
            "stage": "test",
            "identity": {"sourceIp": "127.0.0.1"},
        },
    }


def invoke(method: str, path: str) -> dict[str, Any]:
    return handler(create_lambda_proxy_event(method, path), Mock())


def test_homepage() -> None:
    result = invoke("GET", "/")

    assert result["statusCode"] == 200
    assert result["headers"]["content-type"] == "text/html; charset=UTF-8"
    assert "<h1>Hello, New Jersey.</h1>" in result["body"]


def test_health() -> None:
    result = invoke("GET", "/health")

    assert result["statusCode"] == 200
    assert result["headers"]["cache-control"] == "no-store"
    assert result["headers"]["content-type"] == "application/json; charset=utf-8"
    assert json.loads(result["body"]) == {
        "status": "ok",
        "service": "@newjersey/fastapi-template",
    }
