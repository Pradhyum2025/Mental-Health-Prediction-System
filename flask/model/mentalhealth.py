#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
from flask import Flask, request, jsonify
from scipy.stats import zscore


# In[18]:


#loading dataset
mentalhealth_dataset = pd.read_csv("../../flask/model/Student Depression Dataset.csv")


# In[19]:


#print first 5 rows
mentalhealth_dataset.head()


# In[20]:


#print first 5 rows
mentalhealth_dataset.tail()


# In[21]:


mentalhealth_dataset.shape


# In[22]:


mentalhealth_dataset["Depression"].isna().any()


# In[23]:


# Drop irrelevant columns
mentalhealth_dataset = mentalhealth_dataset.drop(columns=['id', 'City', 'Profession','Work Pressure','Job Satisfaction'])


# In[24]:


mentalhealth_dataset["Have you ever had suicidal thoughts ?"] = mentalhealth_dataset["Have you ever had suicidal thoughts ?"].replace({"Yes": 1, "No": 0})
mentalhealth_dataset["Family History of Mental Illness"] = mentalhealth_dataset["Family History of Mental Illness"].replace({"Yes": 1, "No": 0})


# In[25]:


mentalhealth_dataset.head()


# In[26]:


# Handle missing values
mentalhealth_dataset['Financial Stress'].fillna(mentalhealth_dataset['Financial Stress'].median(), inplace=True)


# In[27]:


# getting the statistical measures of the data
mentalhealth_dataset.describe()


# In[28]:


mentalhealth_dataset['Depression'].value_counts()


# In[29]:


# Identify numerical columns
num_cols = mentalhealth_dataset.select_dtypes(include=['number']).columns

# Compute Z-scores
z_scores = mentalhealth_dataset[num_cols].apply(zscore)

# Define threshold (3 is a standard value)
threshold = 3

# Filter data (keep only non-outliers)
mentalhealth_dataset_clean = mentalhealth_dataset[(z_scores < threshold).all(axis=1)]

# Save the cleaned dataset
mentalhealth_dataset_clean.to_csv("properly_cleaned_dataset.csv", index=False)

print(f"Original dataset: {mentalhealth_dataset.shape[0]} rows")
print(f"Cleaned dataset: {mentalhealth_dataset_clean.shape[0]} rows")


# In[31]:


# Load the cleaned dataset ../../flask/model/
cleaned_dataset = pd.read_csv("Student Depression Dataset.csv")

# Check the new shape
print(f"✅ Cleaned dataset loaded: {cleaned_dataset.shape[0]} rows, {cleaned_dataset.shape[1]} columns")


# In[35]:


import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the cleaned dataset
cleaned_data = pd.read_csv("properly_cleaned_dataset.csv")

# Plot boxplots for numerical columns to check for remaining outliers
plt.figure(figsize=(12, 6))
sns.boxplot(data=cleaned_data)
plt.xticks(rotation=45)
plt.title("Boxplot of Features (Checking for Remaining Outliers)")
plt.show()


# In[36]:


from sklearn.preprocessing import LabelEncoder, RobustScaler

# Identify categorical columns
categorical_columns = cleaned_dataset.select_dtypes(include=['object']).columns.tolist()

# Apply Label Encoding to all categorical columns
label_encoders = {}
for col in categorical_columns:
    le = LabelEncoder()
    cleaned_dataset[col] = le.fit_transform(cleaned_dataset[col].astype(str))
    label_encoders[col] = le  # Store encoders for future use

# Define features and target variable
X = cleaned_dataset.drop(columns=['Depression'])  # Features
y = cleaned_dataset['Depression']  # Target

# Scale numerical features using RobustScaler
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X)

print("✅ Data encoding and robust scaling completed successfully!")


# In[37]:


from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, stratify=y, random_state=42)

print(f"✅ Data split done: Train - {X_train.shape[0]} rows, Test - {X_test.shape[0]} rows")


# In[39]:


from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

# Define the model
model = RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42)

model.fit(X_train, y_train)  # 🔴 Ensure the model is fitted

# Save the trained model
joblib.dump(model, "mental_health_model.pkl")

# Perform 5-fold cross-validation
cv_scores = cross_val_score(model, X_scaled, y, cv=5, scoring='accuracy')

# Print results
print(f"📊 Cross-Validation Accuracy Scores: {cv_scores}")
print(f"🏆 Mean Accuracy: {cv_scores.mean():.4f}")



# In[41]:


import joblib

# Load the model
model = joblib.load("mental_health_model.pkl")

# Check if the model is fitted
if hasattr(model, "feature_importances_"):  
    print("✅ Model is properly loaded and fitted!")
else:
    print("❌ Model is not fitted. Retrain before saving.")


# In[42]:


import numpy as np

# Compute Z-scores for test set
z_scores_test = np.abs((X_test - X_test.mean()) / X_test.std())

# Count potential outliers (Z-score > 3)
outliers_test = (z_scores_test > 3).sum()

print(f"🚨 Potential outliers in test set (per feature):\n{outliers_test}")


# In[43]:


# Save the trained model
joblib.dump(model, "mental_health_model.pkl")

# Save the scaler (for future use)
joblib.dump(scaler, "scaler.pkl")

print("✅ Model and scaler saved successfully!")


# In[44]:


print(cleaned_dataset.columns)


# In[ ]:


import joblib
import numpy as np
import pandas as pd

# Load the trained model and scaler
model = joblib.load("mental_health_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define feature names (excluding 'Depression')
feature_names = [
    'Gender', 'Age', 'Academic Pressure', 'CGPA', 'Study Satisfaction',
    'Sleep Duration', 'Dietary Habits', 'Degree',
    'Have you ever had suicidal thoughts ?', 'Work/Study Hours',
    'Financial Stress', 'Family History of Mental Illness'
]

def predict_depression(user_inputs):
    print("\nEnter the following details:")

    # Take user input for all required features
    # user_inputs = [
    #     int(input("Gender (1 for Male, 0 for Female): ")),  # Encode Gender as 1/0
    #     int(input("Age: ")),
    #     int(input("Academic Pressure level (1 to 10): ")),
    #     float(input("CGPA (e.g., 7.5): ")),
    #     int(input("Study Satisfaction level (1 to 10): ")),
    #     float(input("Sleep Duration (hours per day): ")),
    #     int(input("Dietary Habits (1: Poor, 2: Average, 3: Good): ")),
    #     int(input("Degree Type (1: Undergraduate, 2: Postgraduate, etc.): ")),  # Assuming categorical encoding
    #     int(input("Have you ever had suicidal thoughts? (1 for Yes, 0 for No): ")),
    #     int(input("Work/Study Hours per day: ")),
    #     float(input("Financial Stress Level (e.g., 3.5): ")),
    #     int(input("Family History of Mental Illness? (1 for Yes, 0 for No): "))
    # ]

    # Convert input to a DataFrame with proper column names
    user_data = pd.DataFrame([user_inputs], columns=feature_names)

    # Ensure input columns match the trained model's feature set
    user_data = user_data.reindex(columns=scaler.feature_names_in_, fill_value=0)

    # Transform and predict
    user_data_scaled = scaler.transform(user_data)
    prediction = model.predict(user_data_scaled)

    # Scale the input data
    user_data_scaled = scaler.transform(user_data)

    # Make a prediction
    prediction = model.predict(user_data_scaled)

    # Print result
    if prediction[0] == 1:
        return "🚨 The model predicts that the person may have depression."
    else:
        return "✅ The model predicts that the person is not suffering from depression."


# This will show the prediction result based on user input.


# %%
