export interface LoginTestData {

  name: string;

  username: string;

  password: string;

  expectedResult:
    | 'success'
    | 'failure';
}