// for data validation - Zod

import { connectToDatabase } from '@/dbConfig/dbConfig';
import Issue from '@/models/issueModel';
import createIssueSchema from '@/schemas/createIssueSchema';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase(); // Establish a connection with database.

export async function GET() {
  try {
    const issues = await Issue.find();

    if (issues)
      return NextResponse.json(
        {
          message: 'Issues sent successfully.',
          success: true,
          issues,
        },
        { status: 200 }
      );

    return NextResponse.json({
      issues: {},
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validation = createIssueSchema.safeParse(requestBody);

    if (!validation.success)
      return NextResponse.json(
        {
          error: validation.error.errors,
        },
        { status: 400 }
      );

    const { title, description } = requestBody;

    const issue = await Issue.findOne({
      title: title,
    });

    if (issue) {
      return NextResponse.json(
        {
          error: 'Same issue title already exists.',
        },
        { status: 400 }
      );
    }

    //   Add issue to the DB.
    const newIssue = new Issue({
      title,
      description,
    });

    const savedIssue = await newIssue.save();

    return NextResponse.json(
      {
        message: 'New Issue Added',
        success: true,
        savedIssue,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
