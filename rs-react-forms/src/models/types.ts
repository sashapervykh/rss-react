export interface Person {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'man' | 'woman';
  image: string;
  country: string;
}

export interface FormData {
  name: string;
  age: number;
  image: File | FileList;
  email: string;
  country: string;
  password: string;
  confirmation: string;
  gender: 'man' | 'woman';
  agreement: boolean;
}
