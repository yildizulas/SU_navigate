import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';  // Ensure this is the correct base URL for your FastAPI server

// Fetch all faculty members
export const fetchFacultyMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/faculty_members/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching faculty members:', error);
    throw error; 
  }
}

// Fetch a specific faculty member by their name
export const fetchFacultyMemberByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/faculty_members/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching faculty member ${name}:`, error);
    throw error;
  }
}

// Add a new faculty member
export const addFacultyMember = async (name, memberData) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/faculty_members/`, {
      name: name,
      ...memberData
    });
    return response.data;
  } catch (error) {
    console.error('Error adding new faculty member:', error);
    throw error;
  }

  
}

// Fetch faculty members by building
export const fetchFacultyMembersByBuilding = async (building) => {
  try {
    const response = await axios.get(`${BASE_URL}/faculty_members/by_building/${building}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching faculty members in building ${building}:`, error);
    throw error;
  }
}
