'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    router.push('/')
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
      </form>
    </main>
  )
}
