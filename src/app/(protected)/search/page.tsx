'use client'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'
function SearchPage() {
  const {users} = useAppSelector(state=> state.user)
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage