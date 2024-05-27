import { HookTestMemo } from '@/features/hooktest/HookTestMemo'
import { HookTestContext } from '@/features/hooktest/HookTestContext'
import { HookTestEffect } from '@/features/hooktest/HookTestEffect'
import { HookTestReducer } from '@/features/hooktest/HookTestReducer'
import React from 'react'
import { HookTestRef } from '@/features/hooktest/HookTestRef'

const page = () => {
  return (
    <div>
      <div className='border-4'>
        <HookTestEffect/>
      </div>
      <div className='border-4'>
        <HookTestContext />
      </div>
      <div className='border-4'>
        <HookTestReducer/>
      </div>
      <div className='border-4'>
        <HookTestMemo />
      </div>
      <div>
        <HookTestRef/>
      </div>
    </div>
  )
}

export default page