from enum import Enum
from flask import jsonify


class StatusCode(Enum):
    ok = 200
    not_found = 404


class ApiResponse:
    def __init__(self, data, status_code: StatusCode):
        self.data = data
        self.status_code = status_code

    def response(self):
        return jsonify(self.data), self.status_code.value
