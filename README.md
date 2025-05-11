# 🏋️‍♂️ Fitlife Health and Fitness Prediction Web App

This project analyzes health and fitness patterns using a dataset that includes physiological, activity-based, and lifestyle-related metrics. The aim is to develop a predictive **Web Application** that helps users estimate:

- 🔢 **Weight**
- 💪 **Fitness Level**
- 🔥 **Calories Burned**
- 🩺 **Health Condition**

---

## 🚀 Project Goals

- Analyze and clean health-related data.
- Apply machine learning models to make accurate predictions.
- Balance imbalanced datasets using techniques like SMOTE and resampling.
- Deploy a user-friendly web application for real-time health predictions.

---

## 🧠 Features

- Standardization and label encoding for preprocessing.
- Classification and regression models using XGBoost.
- Class balancing using **SMOTE** and **Resampling**.
- Visualization tools like **Seaborn** and **Matplotlib**.
- Performance metrics such as Accuracy, F1 Score, RMSE, and R².

---

## 📂 Dataset

The dataset includes features such as:

- Age, Gender
- BMI, Weight
- Sleep Time, Steps
- Heart Rate, Stress Levels
- Daily Activity Metrics
- Lifestyle Inputs (e.g., diet, hydration)

> Data preprocessing includes handling missing values, encoding categorical variables, and feature scaling.

---

## 🛠️ Technologies Used

- **Python**, **Pandas**, **NumPy**
- **Scikit-learn**, **XGBoost**, **imblearn**
- **Matplotlib**, **Seaborn** for data visualization
- **Jupyter Notebook** for experimentation

---

## 🔍 Model Workflow

1. Load and preprocess the data
2. Balance classes using resampling and SMOTE
3. Split data into training and testing sets
4. Train models (XGBoost Classifier/Regressor)
5. Evaluate using classification/regression metrics
6. Save models and integrate with web interface

---

## 📊 Results

- Classification models used for predicting **health condition** 
- Regression models for **weight**, **calories burned** and **fitness level**

## Source
https://www.kaggle.com/datasets/jijagallery/fitlife-health-and-fitness-tracking-dataset
