import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/landing/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, CheckCircle, Circle, Search } from "lucide-react";
import { format } from "date-fns";

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  sms_consent: boolean;
  marketing_consent: boolean;
  ip_address: unknown;
  user_agent: string | null;
  submitted_at: string;
  read: boolean;
  notes: string | null;
}

export default function ContactSubmissions() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRead, setFilterRead] = useState<"all" | "read" | "unread">("all");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Contact Submissions - Admin | The Landry Method";
  }, []);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSubmissions();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchQuery, filterRead]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (filterRead !== "all") {
      filtered = filtered.filter(s => 
        filterRead === "read" ? s.read : !s.read
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.first_name.toLowerCase().includes(query) ||
        s.last_name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.phone.includes(query) ||
        s.message.toLowerCase().includes(query)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const markAsRead = async (id: string, read: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ read })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev =>
        prev.map(s => s.id === id ? { ...s, read } : s)
      );

      toast({
        title: "Success",
        description: `Marked as ${read ? 'read' : 'unread'}`,
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      });
    }
  };

  const saveNotes = async () => {
    if (!selectedSubmission) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ notes })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      setSubmissions(prev =>
        prev.map(s => s.id === selectedSubmission.id ? { ...s, notes } : s)
      );

      toast({
        title: "Success",
        description: "Notes saved successfully",
      });

      setSelectedSubmission(null);
      setNotes("");
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      });
    }
  };

  const openSubmissionDetails = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setNotes(submission.notes || "");
    if (!submission.read) {
      markAsRead(submission.id, true);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const unreadCount = submissions.filter(s => !s.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Contact Submissions</CardTitle>
                <CardDescription>
                  Manage and respond to customer inquiries
                </CardDescription>
              </div>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  {unreadCount} Unread
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, phone, or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterRead === "all" ? "default" : "outline"}
                    onClick={() => setFilterRead("all")}
                  >
                    All ({submissions.length})
                  </Button>
                  <Button
                    variant={filterRead === "unread" ? "default" : "outline"}
                    onClick={() => setFilterRead("unread")}
                  >
                    Unread ({unreadCount})
                  </Button>
                  <Button
                    variant={filterRead === "read" ? "default" : "outline"}
                    onClick={() => setFilterRead("read")}
                  >
                    Read ({submissions.length - unreadCount})
                  </Button>
                </div>
              </div>

              {/* Submissions Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No submissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSubmissions.map((submission) => (
                        <TableRow 
                          key={submission.id}
                          className={!submission.read ? "bg-muted/50" : ""}
                        >
                          <TableCell>
                            {submission.read ? (
                              <CheckCircle className="h-5 w-5 text-success" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {submission.first_name} {submission.last_name}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-sm">
                              <a 
                                href={`mailto:${submission.email}`}
                                className="flex items-center gap-1 text-primary hover:underline"
                              >
                                <Mail className="h-3 w-3" />
                                {submission.email}
                              </a>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {submission.phone}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate text-sm text-muted-foreground">
                              {submission.message}
                            </p>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {format(new Date(submission.submitted_at), "MMM d, yyyy 'at' h:mm a")}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openSubmissionDetails(submission)}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(submission.id, !submission.read)}
                              >
                                {submission.read ? "Unread" : "Read"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Contact from {selectedSubmission?.first_name} {selectedSubmission?.last_name}
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission && format(new Date(selectedSubmission.submitted_at), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <a 
                    href={`mailto:${selectedSubmission.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedSubmission.email}
                  </a>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {selectedSubmission.phone}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <div className="mt-2 p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">SMS Consent:</span>
                  <Badge variant={selectedSubmission.sms_consent ? "default" : "secondary"}>
                    {selectedSubmission.sms_consent ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Marketing Consent:</span>
                  <Badge variant={selectedSubmission.marketing_consent ? "default" : "secondary"}>
                    {selectedSubmission.marketing_consent ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Admin Notes</label>
                <Textarea
                  placeholder="Add internal notes about this submission..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                  Close
                </Button>
                <Button onClick={saveNotes}>
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
