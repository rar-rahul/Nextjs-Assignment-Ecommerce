// app/api/products/route.ts (if using TypeScript)
import {  NextResponse } from 'next/server';
import axios from "axios";

export async function GET() {
    try {
        const data = await axios.get('https://dummyjson.com/products');
        // Sending a success response back to the client
        return NextResponse.json({ message: "All Product Fetch Successfully", data: data.data.products });
      } catch (error) {
        return NextResponse.json({ message: "Something went wrong",error:error}, { status: 500 });
      }
}
