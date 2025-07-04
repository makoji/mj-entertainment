from flask import Flask, request, jsonify
from flask_cors import CORS
from bot import get_bot_response

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    response = get_bot_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5000, debug=True)