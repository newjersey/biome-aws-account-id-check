"""AWS Lambda and API Gateway adapter."""

from mangum import Mangum

from fastapi_template.app import app

handler = Mangum(app, lifespan="off")
