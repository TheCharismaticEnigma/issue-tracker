// REQUEST HANDLERS for users.

import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase(); // Establish a connection w/ MongoDB

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session)
    return NextResponse.json(
      {
        error: 'User must be logged in',
      },
      { status: 401 }
    );

  try {
    const users = await User.find();

    if (!users)
      return NextResponse.json({ error: 'No users found' }, { status: 400 });

    return NextResponse.json(
      {
        message: 'Users sent successfully',
        success: true,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
