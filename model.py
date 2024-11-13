import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
import joblib

# Load data
data = pd.read_csv('water_potability.csv')

# Separate features and target
X = data.drop('Potability', axis=1)
y = data['Potability']

# Handle missing values
imputer = SimpleImputer(strategy='mean')
X_imputed = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.2, random_state=42)

# Create and train the model
rf_model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
rf_model.fit(X_train, y_train)

# Save the model and imputer
joblib.dump(rf_model, 'rf_model.joblib')
joblib.dump(imputer, 'imputer.joblib')

# Print accuracy
print(f"Training Accuracy: {rf_model.score(X_train, y_train):.2f}")
print(f"Testing Accuracy: {rf_model.score(X_test, y_test):.2f}")