// Put - Replacing the entire object.
// Patch - Changing one/more properties.

import { authOptions } from '@/app/auth/authOptions';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import Issue from '@/models/issueModel';
import User from '@/models/userModel';
import {
  PatchIssueInterface,
  patchIssueSchema,
} from '@/schemas/createIssueSchema';
import { Model } from 'mongoose';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase();

// For the first time, POST. Then Patch.
// Thus will only be called upon the selection of the dropdown option

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  // Status 401 - unauthorized request
  if (!session)
    return NextResponse.json(
      {
        error: 'User must be logged in.',
      },
      { status: 401 }
    );

  try {
    const requestBody: PatchIssueInterface = await request.json();
    const validation = patchIssueSchema.safeParse(requestBody);

    if (!validation.success)
      return NextResponse.json(
        {
          error: validation.error.errors,
        },
        { status: 400 }
      );

    const { title, description, assignedToUserId, status } = requestBody;

    if (assignedToUserId && assignedToUserId !== 'unassigned') {
      const assignedUser = await User.findOne({
        _id: assignedToUserId,
      });

      if (!assignedUser)
        return NextResponse.json(
          { error: 'Invalid User. Please assign to the existing user.' },
          { status: 400 }
        );
    }

    const issue = await Issue.findOneAndUpdate(
      { _id: params.id },
      {
        title,
        description,
        assignedToUserId,
        status,
      }
    );

    if (!issue)
      return NextResponse.json(
        {
          error: 'No such issue found',
        },
        { status: 400 }
      );

    // If user & userId on issue exists, remove it

    return NextResponse.json(
      {
        message: 'Issue Updated Successfully',
        success: true,
        issue,
      },
      { status: 201 }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  // Status 401 - unauthorized request
  if (!session)
    return NextResponse.json(
      {
        error: 'User must be logged in.',
      },
      { status: 401 }
    );

  try {
    const issueExists = await Issue.findOne({ _id: params.id });

    if (!issueExists)
      return NextResponse.json(
        {
          error: 'No such issue found.',
        },
        { status: 400 }
      );

    const deletedIssue = await Issue.findOneAndDelete({ _id: params.id });

    return NextResponse.json(
      {
        message: 'Issue Deleted Successfully',
        success: true,
        deletedIssue,
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

// API ENDPOINTS for backend logic.
// comps => api end points with fetch/axios => data => rendering
// route handler functions are cached w/o request parameter.
