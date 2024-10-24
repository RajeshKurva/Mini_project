import pickle
from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

def load_model(file_path):
    try:
        # Attempt to load using pickle
        with open(file_path, 'rb') as f:
            return pickle.load(f)
    except pickle.UnpicklingError as e:
        print(f"Pickle error: {e}")
        try:
            # Attempt to load using joblib
            with open(file_path, 'rb') as f:
                return joblib.load(f)
        except Exception as e:
            print(f"Joblib error: {e}")
            return None

def save_model(model, file_path):
    try:
        # Save using pickle with a specified protocol version
        with open(file_path, 'wb') as f:
            pickle.dump(model, f, protocol=4)
    except Exception as e:
        print(f"Error saving model: {e}")

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

# Define your routes here (e.g., the ones you provided earlier)
@app.route('/')
def Home():
    return render_template('index.html')

@app.route('/check-potability', methods=['POST'])
def check_potability():
    data = request.json
    # Extract features from the request JSON body
    features = [
        data['ph'], data['hardness'], data['solids'], data['chloramines'],
        data['sulfate'], data['conductivity'], data['organic_carbon'],
        data['trihalomethanes'], data['turbidity']]
    
    # Reshape features 
    features = np.array(features).reshape(1, -1)
    
    # Check if the scaler has been fitted before
    if not hasattr(scaler, 'cale_') or not hasattr(scaler, 'ean_'):
        # Fit the scaler to the data and transform it
        features_scaled = scaler.fit_transform(features)
    else:
        # If the scaler has been fitted before, only transform the data
        features_scaled = scaler.transform(features)
    
    # Get model prediction
    prediction = model.predict(features_scaled)[0]
        
    # Return the prediction in JSON format
    return jsonify({'potable': bool(prediction)})

if __name__ == '__main__':
    app.run(debug=True)