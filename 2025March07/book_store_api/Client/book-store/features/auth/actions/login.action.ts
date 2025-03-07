"use server"
import { BASE_URL } from "@/constants"
import { cookies } from "next/headers"
//import { decodeJwt } from 'jose'

export default async function login({ email, password }: { email: string, password: string }) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
  const data = await res.json()
  const access_token = data?.access
  if (access_token) {
    const cookieStore = await cookies()
    cookieStore.set('access_token', access_token)
    return { "data": res.status, "status": res.status, success: true }
  }
  return { success: false }

};
