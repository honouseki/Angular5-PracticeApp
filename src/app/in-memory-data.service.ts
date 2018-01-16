import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const friends = [
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
    ];
    return { friends };
  }
}
