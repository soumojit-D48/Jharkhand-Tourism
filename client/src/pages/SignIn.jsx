import LoginForm from '@/components/auth/LoginForm'
import React from 'react'
import AuthLayout from '@/components/layout/AuthLayout'

const SignIn = () => {
  return (
    // <div className='flex justify-center items-center min-h-[80vh]'>
    //   <LoginForm />

    // </div>

      <AuthLayout>
      <LoginForm/>
    </AuthLayout>
  )
}

export default SignIn