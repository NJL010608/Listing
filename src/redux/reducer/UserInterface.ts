export interface User {
    uuid: string;
    first: string;
    last: string;
    age: number;
    country: string;
  }
  
  export interface UserState {
    loading: boolean;
    users: User[];
    error: string;
  }