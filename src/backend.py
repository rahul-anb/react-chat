from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def process_message(message):
    # Your processing logic goes here
    # For example, let's just return the reversed message
    return message[::-1]

@app.route('/process', methods=['POST'])
def process():
    try:
        data = request.get_json()
        message = data.get('message', '')
        print("check"+ message)
        processed_message = process_message(message)

        # You can add more data to the response if needed
        response_data = {'processed_message': processed_message}

        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
