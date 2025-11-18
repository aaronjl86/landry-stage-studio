import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateArchitecturePDF = () => {
  const doc = new jsPDF();
  let yPos = 20;

  // Cover Page
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  doc.text("AI Photo Editor", 105, yPos, { align: "center" });
  yPos += 15;
  
  doc.setFontSize(20);
  doc.text("System Architecture", 105, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("The Landry Method - Spatial Intelligence in Motion", 105, yPos, { align: "center" });
  yPos += 50;
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });
  doc.text("Version 1.0", 105, yPos + 7, { align: "center" });

  // New Page - Table of Contents
  doc.addPage();
  yPos = 20;
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Table of Contents", 20, yPos);
  yPos += 15;
  
  const tocItems = [
    "1. Executive Summary",
    "2. System Overview",
    "3. Architecture Components",
    "4. Frontend Architecture",
    "5. Backend Architecture",
    "6. Database Schema",
    "7. Credit System",
    "8. Security Architecture",
    "9. Performance Optimization",
    "10. Technology Stack"
  ];
  
  doc.setFontSize(11);
  tocItems.forEach(item => {
    doc.text(item, 30, yPos);
    yPos += 8;
  });

  // Executive Summary
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("1. Executive Summary", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  const summary = [
    "The AI Photo Editor is an enterprise-grade virtual staging platform powered by Google's",
    "Gemini AI models. The system enables real estate professionals to transform empty room",
    "photos into professionally staged images in seconds.",
    "",
    "Key Capabilities:",
    "• AI-powered image transformation using Gemini 2.0 Flash Experimental",
    "• Credit-based usage system with free trial and paid subscriptions",
    "• Batch processing with queue management",
    "• Real-time processing status updates",
    "• Architectural integrity validation to prevent structural modifications",
    "• Comprehensive error handling and credit refund system"
  ];
  
  summary.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });

  // System Overview
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("2. System Overview", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.text("The system architecture follows a modern serverless approach:", 20, yPos);
  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [['Layer', 'Technology', 'Purpose']],
    body: [
      ['Frontend', 'React + TypeScript', 'User interface and state management'],
      ['Backend', 'Supabase Edge Functions', 'Serverless API and business logic'],
      ['Database', 'PostgreSQL (Supabase)', 'Data persistence and RLS'],
      ['Storage', 'Supabase Storage', 'Image file storage'],
      ['AI Processing', 'Google Gemini AI', 'Image generation and editing'],
      ['Authentication', 'Supabase Auth', 'User authentication and JWT'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Architecture Components
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("3. Architecture Components", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("3.1 Frontend Components", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const frontendComponents = [
    "AIPhotoEditor.tsx",
    "  - Main orchestrator component",
    "  - Manages upload, template selection, and processing",
    "  - Integrates all sub-components",
    "",
    "useAIProcessor Hook",
    "  - Core processing logic",
    "  - Job queue management",
    "  - API communication",
    "  - Error handling and retries",
    "",
    "EnhancedPhotoUpload",
    "  - Multi-file upload with drag & drop",
    "  - Image compression using web workers",
    "  - File validation and preview",
    "",
    "EnhancedTemplateSelector",
    "  - Template selection interface",
    "  - Custom prompt input",
    "  - Style preview",
    "",
    "ProcessingQueue",
    "  - Real-time job status display",
    "  - Progress tracking",
    "  - Download and redo functionality"
  ];
  
  frontendComponents.forEach(line => {
    if (line.startsWith("  ")) {
      doc.setTextColor(100, 100, 100);
      doc.text(line, 25, yPos);
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(line, 20, yPos);
    }
    yPos += 5;
  });

  // Backend Architecture
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("5. Backend Architecture", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("5.1 Edge Functions", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Function', 'Purpose', 'Authentication']],
    body: [
      ['edit-photo', 'Process image editing requests', 'Required (JWT)'],
      ['generate-image', 'Generate images from text prompts', 'Required (JWT)'],
      ['get-credit-balance', 'Retrieve user credit balance', 'Required (JWT)'],
      ['stripe-webhook', 'Handle Stripe payment events', 'Webhook signature'],
      ['check-subscription', 'Verify subscription status', 'Required (JWT)'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("5.2 Image Processing Flow", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const processingSteps = [
    "1. Client compresses image (browser-image-compression)",
    "2. Client uploads to Supabase Storage (room-images bucket)",
    "3. Client calls edit-photo Edge Function with:",
    "   - Image storage URL",
    "   - Template/prompt",
    "   - User JWT token",
    "4. Edge Function validates request:",
    "   - JWT authentication",
    "   - Rate limiting check",
    "   - Credit balance verification",
    "5. Edge Function consumes credits (credits_consume RPC)",
    "6. Edge Function calls Lovable AI Gateway:",
    "   - Model: google/gemini-2.0-flash-exp",
    "   - Includes architectural integrity rule",
    "7. AI generates edited image (base64)",
    "8. Edge Function validates architectural integrity:",
    "   - Computes SHA-256 hash of rule",
    "   - Verifies no structural modifications",
    "9. Edge Function returns base64 image data",
    "10. Client uploads result to Storage",
    "11. Client saves record to uploads table"
  ];
  
  processingSteps.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });

  // Database Schema
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("6. Database Schema", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("6.1 Core Tables", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Table', 'Purpose', 'Key Columns']],
    body: [
      ['profiles', 'User profile data', 'id, email, quota, used, free_trial_uploads_remaining'],
      ['user_credits', 'Credit balance tracking', 'user_id, credits'],
      ['credit_transactions', 'Credit history', 'user_id, amount, balance_after, operation, ref'],
      ['uploads', 'Processed images', 'user_id, original_image_url, staged_image_url, status'],
      ['user_payment_info', 'Subscription data', 'user_id, plan_code, stripe_subscription_id'],
      ['image_reports', 'Violation reports', 'user_id, job_id, original_image_url, edited_image_url'],
      ['architectural_violations', 'AI integrity violations', 'user_id, ssim_score, violation_reason'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    columnStyles: { 2: { cellWidth: 70 } }
  });

  // Credit System
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("7. Credit System", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  const creditSystem = [
    "The credit system operates on a dual-tier model:",
    "",
    "Free Trial Credits:",
    "  - 3 free trial uploads upon signup",
    "  - Stored in profiles.free_trial_uploads_remaining",
    "  - Always consumed first before paid credits",
    "  - No expiration",
    "",
    "Paid Credits:",
    "  - Allocated based on subscription plan",
    "  - Stored in profiles.quota and profiles.used",
    "  - Monthly reset with subscription renewal",
    "  - Tracked via credit_transactions table",
    "",
    "Credit Operations (RPC Functions):",
    "",
    "credits_consume(_user_id, _amount, _ref, _service):",
    "  - Attempts to use free trial credits first",
    "  - Falls back to paid credits if trial exhausted",
    "  - Idempotent (uses _ref for deduplication)",
    "  - Returns remaining balance",
    "",
    "credits_refund(_user_id, _amount, _ref, _original_ref):",
    "  - Restores credits after failed operations",
    "  - Links to original transaction via _original_ref",
    "  - Idempotent refund processing",
    "",
    "credits_provision(_plan_code, _user_id):",
    "  - Resets quota and usage for new billing period",
    "  - Monthly idempotency via provision_USERID_YYYY-MM",
    "  - Updates user_payment_info table",
    "",
    "Admin Override:",
    "  - Users with 'admin' role bypass credit checks",
    "  - Checked via has_role() database function",
    "  - No credit consumption for admin operations"
  ];
  
  creditSystem.forEach(line => {
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

  // Security Architecture
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("8. Security Architecture", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  const security = [
    "8.1 Authentication & Authorization",
    "  - JWT-based authentication via Supabase Auth",
    "  - Token validation in all Edge Functions",
    "  - Role-based access control (admin/user)",
    "",
    "8.2 Architectural Integrity Rule",
    "  Purpose: Prevent AI from modifying room structure",
    "  Implementation:",
    "    - Rule embedded in every AI prompt",
    "    - SHA-256 hash verification: 5b6d2c8a...",
    "    - Violations logged to architectural_violations table",
    "    - Credits NOT refunded for violations (user error)",
    "",
    "8.3 Rate Limiting",
    "  - 10 requests per 60 seconds per user",
    "  - Tracked in rate_limit_buckets table",
    "  - Automatic cleanup of expired buckets",
    "  - Returns 429 Too Many Requests on limit",
    "",
    "8.4 Input Validation",
    "  - Prompt length validation (10-2000 chars)",
    "  - Image format validation (JPEG, PNG, WebP)",
    "  - File size limits enforced client-side",
    "  - Base64 encoding validation",
    "",
    "8.5 Row Level Security (RLS)",
    "  All tables enforce user isolation:",
    "    - uploads: user can only see own uploads",
    "    - credit_transactions: user can only see own transactions",
    "    - profiles: user can only update own profile",
    "    - user_payment_info: user can only see own payment data"
  ];
  
  security.forEach(line => {
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

  // Technology Stack
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("10. Technology Stack", 20, yPos);
  yPos += 10;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Category', 'Technology', 'Version/Details']],
    body: [
      ['Frontend Framework', 'React', '18.3.1'],
      ['Language', 'TypeScript', 'Strict mode enabled'],
      ['Build Tool', 'Vite', 'Latest'],
      ['Styling', 'Tailwind CSS', 'With custom design system'],
      ['UI Components', 'shadcn/ui + Radix UI', 'Accessible components'],
      ['State Management', 'TanStack Query', 'Server state management'],
      ['Routing', 'React Router', 'v6'],
      ['Backend', 'Supabase Edge Functions', 'Deno runtime'],
      ['Database', 'PostgreSQL', 'Supabase-hosted'],
      ['Authentication', 'Supabase Auth', 'JWT tokens'],
      ['Storage', 'Supabase Storage', 'S3-compatible'],
      ['AI Model', 'Google Gemini 2.0 Flash', 'Via Lovable AI Gateway'],
      ['Payment', 'Stripe', 'Subscriptions + webhooks'],
      ['Image Compression', 'browser-image-compression', '2.0.2'],
      ['PDF Generation', 'jsPDF', 'Latest'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  // Save the PDF
  doc.save("AI_Photo_Editor_Architecture.pdf");
};
