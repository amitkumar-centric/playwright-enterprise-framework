export interface EmployeeData {
  firstName: string;

  middleName?: string;

  lastName: string;

  employeeId?: string;
}

export type EmployeeDataVersion = 'v1' | 'v2';
