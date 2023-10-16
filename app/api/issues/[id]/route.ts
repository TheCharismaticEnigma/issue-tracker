// Put - Replacing the entire object.
// Patch - Changing one/more properties.

import { connectToDatabase } from '@/dbConfig/dbConfig';
import Issue from '@/models/issueModel';
import { default as issueSchema } from '@/schemas/createIssueSchema';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase();

// Validate Request Body. check if id is valid. if it is, update.
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestBody = await request.json();

    // Validate the Request Body Data
    const validation = issueSchema.safeParse(requestBody);

    if (!validation.success)
      return NextResponse.json(
        {
          error: validation.error.errors,
        },
        { status: 400 }
      );

    const { title, description } = requestBody;

    //   Update Issue if it exists.
    const issue = await Issue.findOneAndUpdate(
      { _id: params.id },
      {
        title,
        description,
      }
    );

    if (!issue)
      return NextResponse.json(
        {
          error: 'No such issue found',
        },
        { status: 400 }
      );

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
  try {
    const issue = await Issue.findOneAndDelete({ _id: params.id });

    if (!issue)
      return NextResponse.json(
        {
          error: 'No such issue found.',
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        message: 'Issue Deleted Successfully',
        success: true,
        issue,
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
