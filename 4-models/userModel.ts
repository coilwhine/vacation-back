export enum UserRole {
    user = 'USER',
    admin = 'ADMIN'
}

export interface UserModel {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    userRole?: UserRole
}