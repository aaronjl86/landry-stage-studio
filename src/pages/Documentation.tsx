import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Code, Wrench, Download, ArrowLeft } from "lucide-react";
import { generateArchitecturePDF } from "@/lib/documentation/generateArchitecturePDF";
import { generateOperationsPDF } from "@/lib/documentation/generateOperationsPDF";
import { generateAPIPDF } from "@/lib/documentation/generateAPIPDF";
import { generateDeveloperPDF } from "@/lib/documentation/generateDeveloperPDF";
import { toast } from "sonner";

export default function Documentation() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState<string | null>(null);

  const handleDownload = async (type: string, generator: () => void, filename: string) => {
    setGenerating(type);
    try {
      await generator();
      toast.success(`${filename} downloaded successfully`);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(null);
    }
  };

  const documents = [
    {
      id: "architecture",
      title: "System Architecture",
      description: "Complete technical architecture, component hierarchy, data flow diagrams, and technology stack overview.",
      icon: FileText,
      filename: "AI_Photo_Editor_Architecture.pdf",
      generator: generateArchitecturePDF,
      color: "text-blue-500",
    },
    {
      id: "operations",
      title: "Operations Manual",
      description: "End-to-end operational procedures, user journey flows, credit system operations, and monitoring guidelines.",
      icon: BookOpen,
      filename: "AI_Photo_Editor_Operations_Manual.pdf",
      generator: generateOperationsPDF,
      color: "text-green-500",
    },
    {
      id: "api",
      title: "API Reference",
      description: "Complete API documentation including Edge Functions, database schema, RPC functions, and integration points.",
      icon: Code,
      filename: "AI_Photo_Editor_API_Reference.pdf",
      generator: generateAPIPDF,
      color: "text-purple-500",
    },
    {
      id: "developer",
      title: "Developer Guide",
      description: "Setup instructions, code conventions, testing procedures, deployment process, and troubleshooting guide.",
      icon: Wrench,
      filename: "AI_Photo_Editor_Developer_Guide.pdf",
      generator: generateDeveloperPDF,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Technical Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive documentation for The Landry Method AI Photo Editor system. 
              Download detailed guides covering architecture, operations, API reference, and development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {documents.map((doc) => {
              const Icon = doc.icon;
              const isGenerating = generating === doc.id;
              
              return (
                <Card key={doc.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-secondary ${doc.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{doc.title}</CardTitle>
                          <CardDescription className="mt-1 text-sm">
                            {doc.filename}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 min-h-[60px]">
                      {doc.description}
                    </p>
                    <Button
                      onClick={() => handleDownload(doc.id, doc.generator, doc.filename)}
                      disabled={isGenerating}
                      className="w-full"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Documentation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What's Included</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Complete system architecture and design patterns</li>
                  <li>Database schema with all tables and relationships</li>
                  <li>Edge Functions documentation with code examples</li>
                  <li>Credit system operations and workflows</li>
                  <li>Security and authentication implementation</li>
                  <li>Deployment and troubleshooting guides</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Document Format</h3>
                <p className="text-muted-foreground">
                  All documents are generated as professional PDF files with table of contents, 
                  code syntax highlighting, diagrams, and The Landry Method branding.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Version</h3>
                <p className="text-muted-foreground">
                  Documentation Version 1.0 - Generated {new Date().toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
