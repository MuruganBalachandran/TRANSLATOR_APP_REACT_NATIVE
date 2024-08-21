from flask import Flask, request, jsonify
import pickle
import re

app = Flask(__name__)

# Load the Pickle model
with open('C:/React native/Android-Studio/Translator/Backend/translator.pkl', 'rb') as f:
    translator = pickle.load(f)

# Preprocess function to clean and format text
def preprocess_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'[^\w\s.,!?]', '', text)
    text = text.strip()
    return text

# API endpoint for translation
@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    document = preprocess_text(data['document'])
    translated_text = translator.translate(document)
    return jsonify({"translated_text": translated_text})

if __name__ == '__main__':
    app.run(debug=True, port=8081)
