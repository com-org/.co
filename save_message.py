import json
import sys
import os

def save_to_json():
    # Get data from GitHub environment
    new_data = {
        "name": os.getenv("USER_NAME"),
        "email": os.getenv("USER_EMAIL"),
        "message": os.getenv("USER_MESSAGE"),
        "date": os.getenv("DATE")
    }

    file_path = "userconcerns.json"

    # Load existing data or start new list
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)
    else:
        data = []

    data.append(new_data)

    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

if __name__ == "__main__":
    save_to_json()
