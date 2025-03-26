import { NextResponse } from 'next/server';
import EcoModel from '@/schema/operationinfo';
import connectDB from '../route'; // Adjust the import path as needed

// Database connection helper


export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse the request body
    const { location, reforestation, garbage_collection } = await request.json();

    // Validate required fields
    if (!location) {
      return NextResponse.json(
        { success: false, error: 'Location is required' },
        { status: 400 }
      );
    }

    // Create new eco-info entry
    const newEcoInfo = await EcoModel.create({
      location,
      reforestation,
      garbage_collection
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Eco-info created successfully',
        data: {
          id: newEcoInfo._id,
          location: newEcoInfo.location,
          reforestation: newEcoInfo.reforestation,
          garbage_collection: newEcoInfo.garbage_collection,
          createdAt: newEcoInfo.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating eco-info:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This location already exists' },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create eco-info',
        details: error.message 
      },
      { status: 500 }
    );
  }
}