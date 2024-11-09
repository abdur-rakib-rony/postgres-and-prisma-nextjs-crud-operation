import { getUsers } from './actions/users'
import UserForm from './components/UserForm'
import UserListItem from './components/UserListItem'

export default async function Home() {
  const { users, error } = await getUsers()

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-2">Current Users:</h2>
        {users?.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl mb-2">Add New User:</h2>
        <UserForm />
      </div>
    </main>
  )
}