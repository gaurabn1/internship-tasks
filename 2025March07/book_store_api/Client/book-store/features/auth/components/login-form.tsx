import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import login from "../actions/login.action"
import { useRouter } from "next/navigation"
import User from "../types/user"

export default function LoginFormField() {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (user.email === "" || user.password === "") {
      setError("All fields are required")
      return
    }
    const res = await login({ email: user.email, password: user.password })
    if (res.success) {
      setUser({ email: "", password: "" })
      router.replace('/dashboard')

    } else {
      console.log(res.status)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {
            error && <p className="text-sm">{error}</p>
          }
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" name="password" value={user.password} onChange={handleChange} type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </>
  )
};
