import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateOperationsPDF = () => {
  const doc = new jsPDF();
  let yPos = 20;

  // Cover Page
  doc.setFontSize(28);
  doc.text("AI Photo Editor", 105, yPos, { align: "center" });
  yPos += 15;
  
  doc.setFontSize(20);
  doc.text("Operations Manual", 105, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("The Landry Method", 105, yPos, { align: "center" });
  yPos += 50;
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });

  // User Journey
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("1. User Journey Flow", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  const userJourney = [
    "Step 1: Authentication",
    "  - User signs up or logs in",
    "  - Free trial credits (3) automatically allocated",
    "  - Redirected to dashboard",
    "",
    "Step 2: Image Upload",
    "  - User uploads 1-10 images (drag & drop or browse)",
    "  - Images compressed to <2MB using web worker",
    "  - Client-side validation (format, size)",
    "  - Files staged in browser memory",
    "",
    "Step 3: Template Selection",
    "  - User selects from predefined templates:",
    "    * Modern Staging",
    "    * Traditional Staging",
    "    * Minimalist Staging",
    "    * Luxury Staging",
    "    * Outdoor Staging",
    "  - OR enters custom prompt (10-2000 chars)",
    "  - User chooses public/private for gallery",
    "",
    "Step 4: Job Submission",
    "  - System checks credit balance",
    "  - Creates editing jobs (1 job per image)",
    "  - Jobs processed in batches of 5",
    "  - Each job shows in processing queue",
    "",
    "Step 5: Processing",
    "  - Job status: pending → processing → completed/failed",
    "  - Real-time progress updates",
    "  - Average processing time: 10-30 seconds per image",
    "",
    "Step 6: Download Results",
    "  - Download individual images as PNG",
    "  - Batch download as ZIP file",
    "  - Option to redo failed jobs",
    "  - View in personal gallery"
  ];
  
  userJourney.forEach(line => {
    if (line.startsWith("  ")) {
      doc.setTextColor(100, 100, 100);
      doc.text(line, 25, yPos);
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(line, 20, yPos);
    }
    yPos += 5;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });

  // Credit Operations
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("2. Credit System Operations", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("2.1 Credit Types and Priority", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Credit Type', 'Amount', 'Priority', 'Expiration']],
    body: [
      ['Free Trial', '3 uploads', '1 (highest)', 'Never'],
      ['Paid Monthly', 'Plan-based', '2', 'End of billing period'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("2.2 Credit Consumption Flow", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const creditFlow = [
    "1. User initiates image edit",
    "2. System checks user_id via JWT",
    "3. System queries profiles table:",
    "   - free_trial_uploads_remaining",
    "   - quota (monthly allocation)",
    "   - used (monthly consumption)",
    "4. Priority consumption logic:",
    "   IF free_trial_uploads_remaining >= 1:",
    "     - Consume 1 free trial credit",
    "     - Decrement free_trial_uploads_remaining",
    "   ELSE IF (quota - used) >= 1:",
    "     - Consume 1 paid credit",
    "     - Increment used counter",
    "   ELSE:",
    "     - Return 'Insufficient credits' error",
    "     - Prompt user to upgrade plan",
    "5. Insert transaction record in credit_transactions",
    "6. Return updated balance to client"
  ];
  
  creditFlow.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 5;
  });

  // Error Handling
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("3. Error Handling & Recovery", 20, yPos);
  yPos += 10;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Error Type', 'Credit Refund', 'User Action']],
    body: [
      ['Network timeout', 'Yes (automatic)', 'Retry available'],
      ['AI generation failure', 'Yes (automatic)', 'Retry available'],
      ['Rate limit exceeded', 'No', 'Wait 60 seconds'],
      ['Insufficient credits', 'No', 'Purchase credits'],
      ['Invalid image format', 'No', 'Upload valid format'],
      ['Architectural violation', 'No', 'Modify prompt'],
      ['Storage upload failure', 'Yes (automatic)', 'Retry available'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    columnStyles: { 2: { cellWidth: 60 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("3.1 Automatic Refund Scenarios", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const refundScenarios = [
    "Credits are automatically refunded when:",
    "",
    "• AI API returns error (500, 503, timeout)",
    "• Image processing fails server-side",
    "• Storage upload fails after AI generation",
    "• Database write failure after processing",
    "",
    "Refund Process:",
    "1. Edge Function catches error",
    "2. Calls credits_refund() RPC with original transaction ref",
    "3. Decrements profiles.used counter",
    "4. Inserts refund transaction record",
    "5. Returns error to client with refund confirmation",
    "",
    "Note: Refunds do NOT occur for:",
    "  - User-caused errors (bad prompt, invalid image)",
    "  - Rate limit violations",
    "  - Architectural integrity violations"
  ];
  
  refundScenarios.forEach(line => {
    if (line.startsWith("  ")) {
      doc.setTextColor(100, 100, 100);
      doc.text(line, 25, yPos);
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(line, 20, yPos);
    }
    yPos += 5;
  });

  // Admin Operations
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("4. Admin Operations", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("4.1 Admin Privileges", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const adminOps = [
    "Users with 'admin' role in user_roles table have special privileges:",
    "",
    "Credit Bypass:",
    "  - Admin operations do NOT consume credits",
    "  - Checked via has_role(_user_id, 'admin') function",
    "  - Applies to all image processing operations",
    "",
    "Access Rights:",
    "  - View all user uploads (via RLS policy override)",
    "  - Access contact form submissions",
    "  - View architectural violation reports",
    "  - Modify subscription plans",
    "",
    "Monitoring Capabilities:",
    "  - Real-time credit transaction logs",
    "  - User activity tracking",
    "  - System error logs",
    "  - AI processing metrics"
  ];
  
  adminOps.forEach(line => {
    if (line.startsWith("  ")) {
      doc.setTextColor(100, 100, 100);
      doc.text(line, 25, yPos);
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(line, 20, yPos);
    }
    yPos += 5;
  });

  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("4.2 Adding Admin Users", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Execute SQL via Supabase dashboard:", 20, yPos);
  yPos += 7;
  
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  doc.text("INSERT INTO user_roles (user_id, role)", 20, yPos);
  yPos += 5;
  doc.text("VALUES ('USER_UUID_HERE', 'admin');", 20, yPos);
  doc.setFont(undefined, 'normal');

  // Monitoring
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("5. Monitoring & Logging", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("5.1 Log Types", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Log Type', 'Location', 'Retention']],
    body: [
      ['Edge Function logs', 'Supabase Functions Dashboard', '7 days'],
      ['Credit transactions', 'credit_transactions table', 'Permanent'],
      ['Architectural violations', 'architectural_violations table', 'Permanent'],
      ['User reports', 'image_reports table', 'Permanent'],
      ['Rate limit events', 'rate_limit_buckets table', '1 hour auto-cleanup'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("5.2 Key Metrics to Monitor", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const metrics = [
    "• AI processing success rate (target: >95%)",
    "• Average processing time per image (target: <30s)",
    "• Credit refund rate (target: <5%)",
    "• User signup conversion rate",
    "• Subscription retention rate",
    "• Storage usage growth",
    "• API error rate (target: <1%)",
    "• Rate limit hit rate"
  ];
  
  metrics.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });

  // Troubleshooting
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("6. Troubleshooting Guide", 20, yPos);
  yPos += 10;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Issue', 'Diagnosis', 'Resolution']],
    body: [
      [
        'Images not processing',
        'Check Edge Function logs',
        'Verify AI API key, check rate limits'
      ],
      [
        'Credits not deducting',
        'Check credit_transactions table',
        'Verify RPC function permissions'
      ],
      [
        'Upload failing',
        'Check Storage bucket policies',
        'Verify RLS policies on room-images bucket'
      ],
      [
        'Slow processing',
        'Check AI Gateway response times',
        'Consider upgrading AI model tier'
      ],
      [
        'Refunds not working',
        'Check credits_refund() logs',
        'Verify original transaction exists'
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    columnStyles: { 
      0: { cellWidth: 45 },
      1: { cellWidth: 50 },
      2: { cellWidth: 80 }
    }
  });

  doc.save("AI_Photo_Editor_Operations_Manual.pdf");
};
