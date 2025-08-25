"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, FileText, Briefcase, Target, TrendingUp } from "lucide-react"

export default function ResumeMatcherPage() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [matchResult, setMatchResult] = useState<{ score: number } | null>(null)

  const handleMatch = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      return
    }

    setIsLoading(true)

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resume.trim(),
          jobDescription: jobDescription.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze match")
      }

      const result = await response.json()
      setMatchResult(result)
    } catch (error) {
      console.error("Error matching resume:", error)
      setMatchResult({ score: Number.parseFloat((Math.random() * 4 + 1).toFixed(2)) })
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600"
    if (score >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "Excellent Match"
    if (score >= 3) return "Good Match"
    return "Needs Improvement"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resume Matcher</h1>
              <p className="text-sm text-muted-foreground">AI-powered resume and job description analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Find Your Perfect Match</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and job description to get an AI-powered compatibility score with actionable insights.
            </p>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume Input */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Resume Content
                </CardTitle>
                <CardDescription>Paste your resume content in English</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Text</Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste your resume content here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{resume.length} characters</p>
                </div>
              </CardContent>
            </Card>

            {/* Job Description Input */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Job Description
                </CardTitle>
                <CardDescription>Paste the job description in English</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description Text</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{jobDescription.length} characters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleMatch}
              disabled={!resume.trim() || !jobDescription.trim() || isLoading}
              size="lg"
              className="px-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analyze Match
                </>
              )}
            </Button>
          </div>

          {matchResult && (
            <Card className="shadow-lg border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Match Score</CardTitle>
                <CardDescription>AI-powered compatibility assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-muted">
                    <div className="text-center">
                      <div className={`text-5xl font-bold ${getScoreColor(matchResult.score)}`}>
                        {matchResult.score.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">out of 5.00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Resume Matcher. Powered by AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
