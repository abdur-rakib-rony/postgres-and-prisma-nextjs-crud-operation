'use client'

import { useState } from 'react'
import { updateUser, deleteUser } from '@/app/actions/users'
import { useFormStatus } from 'react-dom'

function Button({ children, ...props }) {
  const { pending } = useFormStatus()
  
  return (
    <button 
      {...props}
      disabled={pending}
      className={`px-3 py-1 rounded text-white disabled:opacity-50 ${props.className}`}
    >
      {pending ? 'Loading...' : children}
    </button>
  )
}

export default function UserListItem({ user }) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <li className="p-4 bg-gray-100 rounded">
        <form action={updateUser} className="space-y-2">
          <input type="hidden" name="id" value={user.id} />
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            className="border p-2 rounded w-full"
            required
          />
          <div className="space-x-2">
            <Button 
              type="submit"
              className="bg-green-500 hover:bg-green-600"
            >
              Save
            </Button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className="p-4 bg-gray-100 rounded flex justify-between items-center">
      <div>
        {user.name} ({user.email})
      </div>
      <div className="space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <form action={deleteUser} className="inline">
          <input type="hidden" name="id" value={user.id} />
          <Button 
            type="submit"
            className="bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              if (!confirm('Are you sure?')) {
                e.preventDefault()
              }
            }}
          >
            Delete
          </Button>
        </form>
      </div>
    </li>
  )
}