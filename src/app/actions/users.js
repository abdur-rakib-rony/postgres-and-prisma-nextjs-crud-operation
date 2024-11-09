'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error) {
    return { error: 'Failed to fetch users' }
  }
}

export async function createUser(formData) {
  try {
    const name = formData.get('name')
    const email = formData.get('email')

    const user = await prisma.user.create({
      data: { name, email }
    })
    
    revalidatePath('/')
    return { user }
  } catch (error) {
    return { error: 'Failed to create user' }
  }
}

export async function updateUser(formData) {
  try {
    const id = parseInt(formData.get('id'))
    const name = formData.get('name')
    const email = formData.get('email')

    const user = await prisma.user.update({
      where: { id },
      data: { name, email }
    })

    revalidatePath('/')
    return { user }
  } catch (error) {
    return { error: 'Failed to update user' }
  }
}

export async function deleteUser(formData) {
  try {
    const id = parseInt(formData.get('id'))
    
    await prisma.user.delete({
      where: { id }
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete user' }
  }
}