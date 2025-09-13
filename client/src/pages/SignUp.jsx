import React from 'react'
import RegisterFrom from '@/components/auth/RegisterFrom'
import AuthLayout from '@/components/layout/AuthLayout'


const SignUp = () => {
  return (
    // <div className='flex justify-center items-center min-h-[80vh]'>
    //   <RegisterFrom />

    // </div>

    <AuthLayout>
      <RegisterFrom/>
    </AuthLayout>
  )
}

export default SignUp