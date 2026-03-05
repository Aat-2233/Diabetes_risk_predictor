# ===============================
# Diabetes Prediction Model Training
# ===============================

# 1️⃣ Import Libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pickle


# ===============================
# 2️⃣ Load Dataset
# ===============================
df = pd.read_csv("data/diabetes.csv")

print("Dataset Loaded Successfully\n")
print(df.head())


# ===============================
# 3️⃣ Data Preprocessing
# ===============================
# Replace invalid zeros with median values
columns_to_fix = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']

for col in columns_to_fix:
    df[col] = df[col].replace(0, df[col].median())


# ===============================
# 4️⃣ Split Features and Target
# ===============================
X = df.drop("Outcome", axis=1)
y = df["Outcome"]


# ===============================
# 5️⃣ Train-Test Split
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\nTrain-Test Split Done")


# ===============================
# 6️⃣ Feature Scaling
# (Needed for Logistic Regression)
# ===============================
scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


# ===============================
# 7️⃣ Train Models
# ===============================

models = {
    "Logistic Regression": LogisticRegression(),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(random_state=42)
}

trained_models = {}
results = {}


# ===============================
# 8️⃣ Model Evaluation
# ===============================
for name, model in models.items():

    print(f"\nTraining {name}...")
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    acc = accuracy_score(y_test, predictions)

    print(f"\n{name} Results")
    print("-----------------------")
    print("Accuracy:", acc)
    print("Confusion Matrix:\n", confusion_matrix(y_test, predictions))
    print("Classification Report:\n", classification_report(y_test, predictions))

    # Save trained model
    trained_models[name] = model

    # Store results for Flask dashboard
    results[name] = {
        "accuracy": float(acc)
    }


# ===============================
# 9️⃣ Select Best Model Automatically
# ===============================
best_model_name = max(results, key=lambda x: results[x]["accuracy"])
best_model = trained_models[best_model_name]

print(f"\n✅ Best Model: {best_model_name}")


# ===============================
# 🔟 Save Files
# ===============================

# Save best model
pickle.dump(best_model, open("model.pkl", "wb"))

# Save scaler
pickle.dump(scaler, open("scaler.pkl", "wb"))

# Save comparison results (for performance page)
pickle.dump(results, open("results.pkl", "wb"))

print("\nModel, Scaler, and Results Saved Successfully!")