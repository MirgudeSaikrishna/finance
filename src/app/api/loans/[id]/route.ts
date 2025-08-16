import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Loan from '@/models/Loan'

// Define a type for the dynamic parameters that are a Promise
type PromisedParams = { params: Promise<{ id: string }> }

// GET /api/loans/[id]
export async function GET(req: NextRequest, { params }: PromisedParams) {
  try {
    // Await the params object to resolve the value
    const { id } = await params
    await connectToDatabase()
    const loan = await Loan.findById(id)
    if (!loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 })
    }

    return NextResponse.json({ loan }, { status: 200 })
  } catch (error) {
    console.error('Error fetching loan:', error)
    return NextResponse.json({ error: 'Failed to fetch loan' }, { status: 500 })
  }
}

// PUT /api/loans/[id]
export async function PUT(req: NextRequest, { params }: PromisedParams) {
  try {
    // Await the params object
    const { id } = await params
    await connectToDatabase()
    const body = await req.json()
    const loan = await Loan.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 })
    }

    return NextResponse.json({ loan }, { status: 200 })
  } catch (error) {
    console.error('Error updating loan:', error)
    return NextResponse.json({ error: 'Failed to update loan' }, { status: 500 })
  }
}

// DELETE /api/loans/[id]
export async function DELETE(req: NextRequest, { params }: PromisedParams) {
  try {
    // Await the params object
    const { id } = await params
    await connectToDatabase()
    const loan = await Loan.findByIdAndDelete(id)
    if (!loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Loan deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting loan:', error)
    return NextResponse.json({ error: 'Failed to delete loan' }, { status: 500 })
  }
}