from flask import Flask, request, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load the model and imputer
model = joblib.load('rf_model.joblib')
imputer = joblib.load('imputer.joblib')

@app.route('/', methods=['GET', 'POST'])
def home():
    prediction = None
    if request.method == 'POST':
        # Get values from the form
        features = ['ph', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 
                   'Conductivity', 'Organic_carbon', 'Trihalomethanes', 'Turbidity']
        input_data = []
        for feature in features:
            value = request.form.get(feature, '')
            input_data.append(float(value) if value else np.nan)
        
        # Reshape and impute missing values
        input_array = np.array(input_data).reshape(1, -1)
        input_imputed = imputer.transform(input_array)
        
        # Make prediction
        prediction = model.predict(input_imputed)[0]
        prediction = "Potable" if prediction == 1 else "Not Potable"
    
    return render_template('index.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)