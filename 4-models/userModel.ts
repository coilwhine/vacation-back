export enum UserRole {
    user = 0,
    admin = 1
}

export interface UserModel {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    userRole?: UserRole
}