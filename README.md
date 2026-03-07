Diabetes Risk Predictor 🩺
Project Focus: Machine Learning & Python
The Diabetes Risk Predictor predicts the likelihood of developing diabetes using health parameters from the Pima Indians Diabetes Dataset (CSV). The main focus of this project is the ML model and Python backend, while the frontend is a simple interface to input data and display predictions.

⚠️ Note: While GitHub shows more lines of HTML/CSS/JS, the core logic and intellectual work is in Python/ML.

🔹 Features
Predicts Low / Medium / High diabetes risk.
Inputs: Age, BMI, Glucose, Blood Pressure, Insulin, etc.
Displays probability of diabetes.
ML-focused: Python code for data preprocessing, training, and prediction.
Frontend: Simple Flask web app to make the model interactive.

🗂 Dataset
Pima Indians Diabetes Dataset (CSV)
Source: Kaggle
Columns: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age, Outcome

### Diabetes Pedigree Function
The Diabetes Pedigree Function (DPF) is a special feature included in the
Pima Indians dataset. It summarizes the genetic risk of diabetes by
combining information about relatives who have the condition and their
closeness to the patient. The score is a floating‑point number
(typically between 0.08 and 2.5) where higher values indicate stronger
hereditary predisposition. In this application the value is taken as an
input directly, matching the precomputed column in the original data.

🧪 Technology Stack
Backend & ML: Python, scikit-learn, pandas, numpy
Frontend: HTML, CSS, JavaScript (for user interface only)
Model Storage: pickle
Visualization : Matplotlib, Seaborn

🔧 Model
Algorithms: Logistic Regression, Random Forest
Evaluation: Accuracy, Precision, Recall, F1-Score
Model saved using pickle for deployment

