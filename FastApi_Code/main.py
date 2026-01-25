from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import pandas as pd
import os, shutil
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import json

class InvalidDatasetError(Exception):
    pass


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    expose_headers=["Columns", "X-generated_by", "Content-Disposition"],
)


@app.get("/")
def root():
    return {"message": "hello"}

@app.get('/health')
def health_check():
    return {"status" : "healthy"}


@app.post("/upload/")
async def upload_csv(file: UploadFile = File(...), features_selected: str = Form(...)):

    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only .csv files are allowed.")

    folder_path = "filesStorage"
    file_name = file.filename
    features = json.loads(features_selected)
    features_set = list(set(features))

    try:
        file_path = os.path.join(folder_path, file_name)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        await file.close()

    except InvalidDatasetError as e:
        raise HTTPException(status_code=400, detail=str(e))

    df = pd.read_csv(f"filesStorage/{file.filename}")
    Columns_names = list(df.columns)

    flag = True
    date_column_name = ""
    for i in df.columns:
        if i == "Date" or i == "data" or i == "DATE":
            flag = True
            date_column_name = str(i)

    if flag:
        df[date_column_name] = pd.to_datetime(df[date_column_name], errors="coerce")
        for i in features_set:
            if i == "Week":
                df[f"{date_column_name}_week"] = df[date_column_name].dt.isocalendar().week
            if i == "Day":
                df[f"{date_column_name}_day"] = df[date_column_name].dt.day
            if i == "Day of week":
                df[f"{date_column_name}_day_of_week"] = df[date_column_name].dt.dayofweek
            if i == "is Weekend":
                df[f"{date_column_name}_is_weekend"] = df[date_column_name].isin([5, 6]).astype(int)
            if i == "Week Number":
                df[f"{date_column_name}_weekNumber"] = df[date_column_name].dt.isocalendar().week
            if i == "Year":
                df[f"{date_column_name}_year"] = df[date_column_name].dt.year
            if i == "Month":
                df[f"{date_column_name}_month"] = df[date_column_name].dt.month
            if i == "Day name":
                df[f"{date_column_name}_day_name"] = df[date_column_name].dt.day_name()
            if i == "Quarter":
                df[f"{date_column_name}_quarter"] = df[date_column_name].dt.quarter
            if i == "Days since start":
                df[f"{date_column_name}_days_since_start"] = (df[date_column_name] - df[date_column_name].min()).dt.days


        df.to_csv(file_path, index=False)

        return FileResponse(
            file_path,
            media_type="text/csv",
            headers={
                "Content-Disposition": f"attachment; filename={file_name[:-4]}_Date_Featured_file.csv",
                "X-generated_by": "Date-Based Feature Engine",
                "Columns": json.dumps(Columns_names),
            },
        )

    elif flag == False:
        raise HTTPException(
            status_code=400, detail="This csv file does not have date column"
        )

    return {"message": "All good here.", "Columns": Columns_names}
1