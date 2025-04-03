from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Load the trained model and scaler
model = joblib.load("./model/mental_health_model.pkl")
scaler = joblib.load("./model/scaler.pkl")

# Define feature names (excluding 'Depression')
feature_names = [
    'Gender', 'Age', 'Academic Pressure', 'CGPA', 'Study Satisfaction',
    'Sleep Duration', 'Dietary Habits', 'Degree',
    'Have you ever had suicidal thoughts ?', 'Work/Study Hours',
    'Financial Stress', 'Family History of Mental Illness'
]

app = Flask(__name__)

def predict_depression(user_inputs):
    """Takes user inputs, scales them, and makes a prediction."""
    
    # Convert input to DataFrame
    user_data = pd.DataFrame([user_inputs], columns=feature_names)

    # Ensure input columns match the trained model's feature set
    user_data = user_data.reindex(columns=scaler.feature_names_in_, fill_value=0)

    # Scale the input data
    user_data_scaled = scaler.transform(user_data)

    # Make a prediction
    prediction = model.predict(user_data_scaled)

    # Return result
    return "🚨 The model predicts that the person may have depression." if prediction[0] == 1 else "✅ The model predicts that the person is not suffering from depression."

@app.route('/predict', methods=['POST'])
def predict():
    """Handles incoming API requests and returns predictions."""
    
    data = request.get_json()  # Get JSON request

    if "mentalData" not in data:
        return jsonify({"error": "Missing 'mentalData' key in request"}), 400

    mentalData = data["mentalData"]  # Extract input data

    try:
        # Prepare input data
        user_inputs = [
            int(mentalData["gender"]),
            int(mentalData["age"]),
            int(mentalData["acadmicPressure"]),
            float(mentalData["cgpa"]),
            int(mentalData["studySatisfaction"]),
            float(mentalData["sleepDuration"]),
            int(mentalData["dietaryHabits"]),
            int(mentalData["degree"]),
            int(mentalData["suicidalThought"]),
            int(mentalData["workHour"]),
            float(mentalData["financialStress"]),
            int(mentalData["familyMenatlIllness"])
        ]

        # Get prediction
        response = predict_depression(user_inputs)
        # print(response)
        return jsonify({"message": "✅ Prediction successful", "mentalResult": response})

    except Exception as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True)
