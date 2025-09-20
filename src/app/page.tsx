"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from 'react'

export default function Home() {

  const [name, setName] = useState("")
  const [email, setemail] = useState("")
  const [pswd, setpswd] = useState("")

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password: pswd
    }, {
      onError: () => {
        window.alert("unable to do it")
      },
      onSuccess: () => {
        window.alert("success")
      }
    })
  }


  return (
    <div className="text-4xl font-bold text-green-500 m-3">
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
      <Input placeholder="pswd" value={pswd} onChange={(e) => setpswd(e.target.value)} />
      <Button onClick={onSubmit} >
        Hello world
      </Button>
    </div>
  );
}
