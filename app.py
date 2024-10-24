import pickle
from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

# Helper functions
def load_model(file_path):
    """Load model/scaler from file using pickle or joblib"""
    try:
        with open(file_path, 'rb') as f:
            return pickle.load(f)
    except pickle.UnpicklingError:
        try:
            with open(file_path, 'rb') as f:
                return joblib.load(f)
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
            return None

def save_model(model, file_path):
    """Save model/scaler to file using pickle with protocol version 4"""
    try:
        with open(file_path, 'wb') as f:
            pickle.dump(model, f, protocol=4)
    except Exception as e:
        print(f"Error saving model to {file_path}: {e}")

# Create the Flask app instance
app = Flask(__name__)

# Load model and scaler
model_file = 'model.pkl'
scaler_file = 'scaler.pkl'

model = load_model(model_file)
scaler = load_model(scaler_file)

if model is None or scaler is None:
    print("Failed to load one or both of the model and scaler. Exiting.")
    exit(1)

# **Check if scaler is an instance of a scikit-learn scaler**
if not hasattr(scaler, 'cale_') or not hasattr(scaler, 'ean_'):
    print("Warning: Scaler might not be a fitted scikit-learn scaler. "
          "Ensure it's the correct type (e.g., StandardScaler).")

# Define routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/check-potability', methods=['POST'])
def check_potability():
    data = request.json
    required_features = ['ph', 'hardness', 'olids', 'chloramines',
                         'ulfate', 'conductivity', 'organic_carbon',
                         'trihalomethanes', 'turbidity']

    # **Validate incoming JSON data**
    if not all(feature in data for feature in required_features):
        return jsonify({'error': 'Missing required features'}), 400

    # Extract and reshape features
    features = np.array([data[feature] for feature in required_features]).reshape(1, -1)

    # **Scale features using the loaded scaler**
    if isinstance(scaler, (joblib.load, pickle.load)):  # Check if scaler is loaded correctly
        try:
            # If scaler is loaded, check if it's a fitted scaler
            if hasattr(scaler, 'cale_') and hasattr(scaler, 'ean_'):
                # If the scaler has been fitted before, only transform the data
                features_scaled = scaler.transform(features)
            else:
                # If the scaler hasn't been fitted before, fit and transform the data
                features_scaled = scaler.fit_transform(features)
        except AttributeError:
            # If scaler doesn't have the expected attributes, raise an error
            return jsonify({'error': 'Scaler is not a fitted scaler'}), 500
    else:
        # If scaler is not loaded correctly, raise an error
        return jsonify({'error': 'Failed to load scaler'}), 500

    # Get model prediction
    prediction = model.predict(features_scaled)[0]

    # Return the prediction in JSON format
    return jsonify({'potable': bool(prediction)})

if __name__ == '__main__':
    app.run(debug=True)