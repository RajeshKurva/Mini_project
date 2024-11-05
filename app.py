from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle
import joblib

def load_model(file_path):
    """Load model from file using pickle or joblib"""
    try:
        with open(file_path, 'rb') as f:
            return pickle.load(f)
    except (pickle.UnpicklingError, EOFError):
        try:
            return joblib.load(file_path)
        except Exception as e:
            print(f"Error loading {file_path} with joblib: {e}")
            return None

# Create the Flask app instance
app = Flask(__name__)

# Load model
model_file = '/workspaces/Mini_project/random_forest_model.pkl'
model = load_model(model_file)

if model is None:
    print("Failed to load the model. Exiting.")
    exit(1)

# Define routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/check-potability', methods=['POST'])
def check_potability():
    data = request.json
    required_features = ['ph', 'hardness', 'solids', 'chloramines',
                         'sulfate', 'conductivity', 'organic_carbon',
                         'trihalomethanes', 'turbidity']

    # Validate incoming JSON data
    if not all(feature in data for feature in required_features):
        return jsonify({'error': 'Missing required features'}), 400

    # Extract and reshape features
    features = np.array([float(data[feature]) for feature in required_features]).reshape(1, -1)

    # Get model prediction
    prediction = model.predict(features)[0]

    # Return the prediction in JSON format
    return jsonify({'potable': bool(prediction)})

if __name__ == '__main__':
    app.run(debug=True)
