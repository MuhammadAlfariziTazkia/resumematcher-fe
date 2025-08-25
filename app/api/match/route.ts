import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json()

    if (!resume || !jobDescription) {
      return NextResponse.json({ error: "Resume and job description are required" }, { status: 400 })
    }

    // TODO: Replace this with your actual ML API call
    // Example API call structure:
    
    const response = await fetch('https://kdj5yyu5n6.execute-api.ap-northeast-1.amazonaws.com/prod/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "resume": resume,
        "jobdesc": jobDescription,
      }),
    })

    const result = await response.json()
    return NextResponse.json({ score: result.score })
    

  } catch (error) {
    console.error("Error in match API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
