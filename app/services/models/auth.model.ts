import { db } from "../db"
import { AuthState } from "../actions";

export async function setUserAuth(data:AuthState) {
    try {
      // Add the new friend!
      const id = await db.table("auth").put({
        user:data.user,
        token:data.token
      }, 'token')
    } catch (error) {
      console.log(error)
    }
}

export async function removeAuthToken() {
  const d = await db.table("auth").clear()
}

export async function isTokenExists(): Promise<boolean> {
  const hasToken = (await getUserToken())?.token
  return hasToken ? true : false
}

export async function getUserToken(): Promise<AuthState> {
  const user = await db.table("auth").limit(1).first()
  return user
}
