# Date Feature Engineering Tool
## Project Overview
This project is a web-based Date Feature Engineering tool that allows users to upload a CSV file, select a date column, choose required date-based features, and generate an enhanced CSV file with new features added.

The tool is designed to simplify feature engineering for machine learning and data analysis, especially when working with time-based datasets.

## What This Tool Does
- Upload any CSV file

- Automatically detect date columns

- Allow users to:

  - Select the date column

  - Choose which date features to generate

- Add selected date-based features to the dataset

- Download the updated CSV file instantly

# Date Features Supported

- Year

- Month

- Day

- Year

- Day Name

- Quarter

- Is Weekend

- Days since start

- Week Number

- Day of week

# Tech Stack

## Backend

- FastAPI

- Python

- Pandas

## Frontend

- React.js

- Axios

- Tailwind CSS

# System Architecture

```
Date Feature Engineering/
│
├── backend/
│   ├── main.py
│   ├── fileStorage
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```
# How It Works

1) User uploads a CSV file via the React UI

2) Backend reads the file using Pandas

3) User selects:

  - Date column

  - Required date-based features

4) FastAPI processes the data

5) Updated CSV is returned to the user for download

# Running the Project Locally

## Backend (Fastapi)
```
cd FastApi_Code
pip install -r requirements.txt
uvicorn main:app --reload
```

## Frontend (React)
```
cd Rect_UI/react_ui
npm install
npm start
```

# Example Use Cases

- Preparing datasets for machine learning models

- Sales & demand forecasting

- Time-series analysis

- Energy consumption prediction

- Academic & college ML projects

# Why This Project?

- Eliminates repetitive manual date feature extraction

- Beginner-friendly UI for non-technical users

- Demonstrates real-world ML preprocessing skills

- Clean separation of frontend & backend

# Author

## Rohit Dhade
📧 Email: rohitdhade99@gmail.com

WEB DEV and ML enthusiast
