from typing import List
from pydantic import BaseModel
from fastapi import FastAPI
from faker import Faker

app = FastAPI()

fake = Faker()

# Define a Pydantic model for the office
class Office(BaseModel):
    name: str
    surname: str
    office_no: str
    coordinates: str

# Simulated database storage
database: List[Office] = []

# Generate fake data and populate the database

def generate_fake_data():
    for _ in range(10):  # Generate 10 fake offices
        # Convert the Decimal coordinate to a string
        coordinates = str(fake.coordinate())
        office = Office(
            name=fake.first_name(),
            surname=fake.last_name(),
            office_no=fake.random_element(elements=("A101", "B202", "C303")),
            coordinates=coordinates
        )
        database.append(office)


# Generate fake data when the application starts
generate_fake_data()

# Endpoint to get all offices
@app.get("/offices/", response_model=List[Office])
def get_offices():
    return database

# Endpoint to get a specific office by its index
@app.get("/offices/{office_id}", response_model=Office)
def get_office(office_id: int):
    if 0 <= office_id < len(database):
        return database[office_id]
   

# Endpoint to add a new office (for demonstration purposes)
@app.post("/offices/", response_model=Office)
def add_office(office: Office):
    database.append(office)
    return office


