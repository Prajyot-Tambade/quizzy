import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <section className='columns-2'>
      <div>
        <img src='/auth.jpg' alt='auth' className='h-[80vh] mx-auto object-cover' />
      </div>
      <div className='px-[20%]'>
        {children}
      </div>
    </section>
  )
}

export default AuthLayout;