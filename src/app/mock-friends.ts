import { Friend } from './classes/friend';

export const FRIENDS: Friend[] = [
  { id: 11, name: "Victor Campos" },
  { id: 12, name: "Brent Ida" },
  { id: 13, name: "Charlie Lopez" },
  { id: 14, name: "Dianne Sabas" },
  { id: 15, name: "Evan Leach" },
  { id: 16, name: "Ian Rocha" },
  { id: 17, name: "Jonathan Brock" },
  { id: 18, name: "Nick Friend" },
  { id: 19, name: "Nina Tran" },
  { id: 20, name: "Sujata Shrestha" }
]

// Currently, this file is not being used;
// Instead, a mock-database is created to hold this data;
//     In this way, we can simulate HTTP requests which is what we would be doing to retrieve real data from real servers
// Refer to the 'in-memory-data.service.ts' file
