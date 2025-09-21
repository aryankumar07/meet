"use client"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AlertTitle, Alert } from '@/components/ui/alert'
import { OctagonAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "password is required"
  })
})

export const SignInView = () => {

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true)
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password
      },
      {
        onSuccess: () => {
          setPending(false)
          router.push("/")
        },
        onError: ({ error }) => {
          setPending(false)
          setError(error.message)
        }
      }
    )
  }


  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>
                    Welcome back
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='n@example.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='**********'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {
                  !!error && (
                    <Alert className='bg-destructive/10 border-none'>
                      <OctagonAlert className='h-4 w-4 text-destructive' />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )
                }

                <Button disabled={pending} type='submit' className='w-full' >Sign-In</Button>
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 p-2'>Or Continue with</span>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <Button variant={"outline"} type='button'>
                    Google
                  </Button>
                  <Button variant={"outline"} type='button'>
                    GitHub
                  </Button>
                </div>
                <div className='text-center text-sm'>
                  Dont have an account ? <Link className={'underline underline-offset-4'} href={"/sign-up"} >SignUp</Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-green-500 to-green-800 relative hidden md:flex flex-col gap-y-4 items-center justify-center ">
            <img src="./logo.svg" alt="logo-image" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">
              Meet . AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline-offset-4'>
        By clicking continue, yo agree to our <a href='#'>Terms of service</a>
      </div>
    </div>
  )
}
