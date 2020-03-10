import pgPromise from "pg-promise";

export interface IUserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IUserResponse extends IUserInfo {
  userId: number;
}

export interface IUserController {
  getUser: (userId: string) => Promise<IUserResponse>;
  createUser: (info: IUserInfo, password: string) => Promise<IUserResponse>;
}

const createUserQuery = `
INSERT INTO users (name, email, phone, password)
VALUES ($[name], $[email], $[phone], $[password])
RETURNING userId, name, email, phone;
`

const getUserQuery = `
SELECT userId, name, email, phone
FROM users
WHERE userId = $[userId]
`

const userController: ((db: pgPromise.IDatabase<{}>) => IUserController) = (db) => ({
  getUser: async (userId: string) => {
    return db.one(getUserQuery, { userId });
  },
  createUser: async (info: IUserInfo, password: string) => {
    return db.one(createUserQuery, { ...info, password });
  },
})

export default userController;