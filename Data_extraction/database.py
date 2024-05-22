from typing import List, Dict, Optional
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Define a Pydantic model for the faculty member
class FacultyMember(BaseModel):
    building: str
    room: str

# Simulated faculty members storage
faculty_members: Dict[str, FacultyMember] = {}

def create_faculty_members():
    members = {
        "İnanç Arın": FacultyMember(building="UC", room="1083/1089"),
        "Marloes Cornelissen Aydemir": FacultyMember(building="UC", room="1083/1089"),
        "Matteo Paganin": FacultyMember(building="UC", room="1083/1089"),
        "Emre Erol": FacultyMember(building="FASS", room="2022"),
        "Ahmet Demirelli": FacultyMember(building="FASS", room="1013B"),
        "Selmiye Alkan Gürsel": FacultyMember(building="FENS", room="2045"),
        "Adnan Kefal": FacultyMember(building="FENS", room="G010"),
        "Albert Erkip": FacultyMember(building="FENS", room="2060"),
        "Albert Levi": FacultyMember(building="FENS", room="1091"),
        "Alev Topuzoğlu": FacultyMember(building="FENS", room="2001"),
        "Alex Lyakhovich": FacultyMember(building="FENS", room="1043"),
        "Alhun Aydın": FacultyMember(building="FENS", room="G013"),
        "Ali Koşar": FacultyMember(building="FENS", room="1014"),
        "Ali Rana Atılgan": FacultyMember(building="FENS", room="2093"),
        "Alp Yürüm": FacultyMember(building="FENS", room="1031"),
        "Ali Nihat Eken": FacultyMember(building="FMAN", room="G001"),
        "Amy Kathleen Stopper": FacultyMember(building="FMAN", room="G104/G105"),
        "Eylem Bütüner": FacultyMember(building="SL", room="G029"),
        "Hatice Sarıgül Aydoğan": FacultyMember(building="SL", room="G013")

    }
    faculty_members.update(members)

create_faculty_members()

# Endpoint to get all faculty members
@app.get("/faculty_members/", response_model=Dict[str, FacultyMember])
def get_faculty_members():
    return faculty_members

# Endpoint to get a specific faculty member by their name
@app.get("/faculty_members/{name}", response_model=FacultyMember)
def get_faculty_member(name: str):
    member = faculty_members.get(name)
    if member is None:
        raise HTTPException(status_code=404, detail=f"Faculty member {name} not found")
    return member

# Endpoint to add a new faculty member
@app.post("/faculty_members/", response_model=FacultyMember)
def add_faculty_member(name: str, member: FacultyMember):
    faculty_members[name] = member
    return member

# Endpoint to get faculty members by building
@app.get("/faculty_members/by_building/{building}", response_model=Dict[str, FacultyMember])
def get_faculty_members_by_building(building: str):
    result = {name: member for name, member in faculty_members.items() if member.building.lower() == building.lower()}
    if not result:
        raise HTTPException(status_code=404, detail=f"No faculty members found in building {building}")
    return result
