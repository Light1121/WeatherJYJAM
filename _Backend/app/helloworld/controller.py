from flask_restx import Resource
from ..  import api

@api.route('/helloworld')
class HelloWorldApi(Resource):
    def get(self):
        return "Hello World"