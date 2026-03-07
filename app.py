# ===============================
# Diabetes Prediction Flask App
# ===============================

from flask import Flask, render_template, request
import numpy as np
import pickle

# -------------------------------
# Load Saved Files
# -------------------------------
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))
results = pickle.load(open("results.pkl", "rb"))

# -------------------------------
# Initialize Flask
# -------------------------------
app = Flask(__name__)


# ===============================
# Home Page
# ===============================
@app.route("/")
def home():
    return render_template("index.html")


# ===============================
# Prediction Route
# ===============================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # -------- Get Form Data --------
        input_features = [
            float(request.form["Pregnancies"]),
            float(request.form["Glucose"]),
            float(request.form["BloodPressure"]),
            float(request.form["SkinThickness"]),
            float(request.form["Insulin"]),
            float(request.form["BMI"]),
            float(request.form["DiabetesPedigreeFunction"]),
            float(request.form["Age"])
        ]

        # Convert to numpy array
        features_array = np.array([input_features])

        # -------- Apply Scaling --------
        scaled_features = scaler.transform(features_array)

        # -------- Prediction --------
        prediction = model.predict(scaled_features)[0]

        # -------- Probability --------
        probabilities = model.predict_proba(scaled_features)[0]

        non_diabetic_prob = round(probabilities[0] * 100, 2)
        diabetic_prob = round(probabilities[1] * 100, 2)

        # -------- Result Message --------
        if prediction == 1:
            result_text = "⚠️ High Risk of Diabetes"
        else:
            result_text = "✅ Low Risk of Diabetes"

        return render_template(
            "index.html",
            prediction_text=result_text,
            diabetic_probability=diabetic_prob,
            non_diabetic_probability=non_diabetic_prob,
            diabetic_bar=int(diabetic_prob),
            non_diabetic_bar=int(non_diabetic_prob)
        )
    except Exception as e:
        return render_template("index.html", prediction_text=f"Error: {str(e)}")


# ===============================
# Model Performance Page
# ===============================
@app.route("/performance")
def performance():
    return render_template("performance.html", results=results)


# ===============================
# Run App
# ===============================
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True) 