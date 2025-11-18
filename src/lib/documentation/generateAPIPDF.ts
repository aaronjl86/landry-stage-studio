import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateAPIPDF = () => {
  const doc = new jsPDF();
  let yPos = 20;

  // Cover Page
  doc.setFontSize(28);
  doc.text("AI Photo Editor", 105, yPos, { align: "center" });
  yPos += 15;
  
  doc.setFontSize(20);
  doc.text("API Reference", 105, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("The Landry Method", 105, yPos, { align: "center" });
  yPos += 50;
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });

  // Edge Functions Overview
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("1. Edge Functions", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.text("All Edge Functions require JWT authentication via Authorization header:", 20, yPos);
  yPos += 7;
  
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  doc.text("Authorization: Bearer <JWT_TOKEN>", 20, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 15;

  // edit-photo API
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("1.1 POST /edit-photo", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Processes an image with AI-powered editing.", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.text("Request Body:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const editPhotoRequest = [
    '{',
    '  "prompt": "Transform this room with modern staging",',
    '  "imageData": "data:image/jpeg;base64,/9j/4AAQSkZJ..."',
    '}'
  ];
  editPhotoRequest.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');
  yPos += 5;

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Response (Success - 200):", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const editPhotoResponse = [
    '{',
    '  "success": true,',
    '  "imageData": "data:image/png;base64,iVBORw0KGgo...",',
    '  "message": "Image processed successfully"',
    '}'
  ];
  editPhotoResponse.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Error Responses:", 20, yPos);
  yPos += 6;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Status', 'Reason', 'Response']],
    body: [
      ['400', 'Invalid request', '{"error": "Prompt required"}'],
      ['401', 'Unauthorized', '{"error": "Invalid JWT token"}'],
      ['402', 'Insufficient credits', '{"error": "Insufficient credits", "remaining": 0}'],
      ['429', 'Rate limit', '{"error": "Too many requests"}'],
      ['500', 'AI processing failed', '{"error": "AI generation failed"}'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(11);
  doc.text("Processing Flow:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  const editPhotoFlow = [
    '1. Validate JWT and extract user_id',
    '2. Check rate limit (10 req/60s)',
    '3. Validate prompt (10-2000 chars)',
    '4. Check admin status (bypass credits if admin)',
    '5. Consume 1 credit via credits_consume() RPC',
    '6. Call Lovable AI Gateway with:',
    '   - Model: google/gemini-2.0-flash-exp',
    '   - Architectural integrity rule (SHA-256 verified)',
    '   - User prompt + image data',
    '7. Validate architectural integrity in response',
    '8. Return base64 image data',
    '9. On error: Refund credits automatically'
  ];
  
  editPhotoFlow.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 5;
  });

  // generate-image API
  doc.addPage();
  yPos = 20;
  doc.setFontSize(14);
  doc.text("1.2 POST /generate-image", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Generates an image from a text prompt (no base image required).", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.text("Request Body:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const genRequest = [
    '{',
    '  "prompt": "A modern living room with minimalist furniture"',
    '}'
  ];
  genRequest.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Response:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  doc.text('{ "imageData": "data:image/png;base64,..." }', 25, yPos);
  doc.setFont(undefined, 'normal');

  // get-credit-balance API
  yPos += 20;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("1.3 GET /get-credit-balance", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Retrieves the user's current credit balance.", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.text("Response:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const balanceResponse = [
    '{',
    '  "credits": 47,',
    '  "quota": 50,',
    '  "used": 3,',
    '  "free_trial_remaining": 0',
    '}'
  ];
  balanceResponse.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');

  // Database RPC Functions
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("2. Database RPC Functions", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(14);
  doc.text("2.1 credits_consume()", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Consumes credits for a user operation.", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(11);
  doc.text("Parameters:", 20, yPos);
  yPos += 6;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Parameter', 'Type', 'Required', 'Description']],
    body: [
      ['_user_id', 'UUID', 'Yes', 'User identifier'],
      ['_amount', 'INTEGER', 'Yes', 'Credits to consume'],
      ['_ref', 'TEXT', 'No', 'Idempotency key'],
      ['_service', 'TEXT', 'No', 'Service name (default: edit-photo)'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(11);
  doc.text("Returns:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const consumeReturn = [
    '{',
    '  "success": true,',
    '  "remaining": 49,',
    '  "free_trial_remaining": 2,',
    '  "message": "Credits consumed successfully"',
    '}'
  ];
  consumeReturn.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');
  yPos += 10;

  // credits_refund
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("2.2 credits_refund()", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Refunds credits after a failed operation.", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(11);
  doc.text("Parameters:", 20, yPos);
  yPos += 6;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Parameter', 'Type', 'Required', 'Description']],
    body: [
      ['_user_id', 'UUID', 'Yes', 'User identifier'],
      ['_amount', 'INTEGER', 'Yes', 'Credits to refund'],
      ['_ref', 'TEXT', 'No', 'Idempotency key'],
      ['_original_ref', 'TEXT', 'No', 'Original transaction reference'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 }
  });

  // Database Schema
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("3. Database Schema", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(14);
  doc.text("3.1 profiles", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Column', 'Type', 'Description']],
    body: [
      ['id', 'UUID', 'Primary key (FK to auth.users)'],
      ['email', 'TEXT', 'User email address'],
      ['quota', 'INTEGER', 'Monthly credit allocation'],
      ['used', 'INTEGER', 'Credits used this period'],
      ['free_trial_uploads_remaining', 'INTEGER', 'Free trial credits (default 3)'],
      ['created_at', 'TIMESTAMP', 'Account creation date'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
    columnStyles: { 2: { cellWidth: 80 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.text("3.2 credit_transactions", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Column', 'Type', 'Description']],
    body: [
      ['id', 'UUID', 'Primary key'],
      ['user_id', 'UUID', 'FK to profiles'],
      ['amount', 'INTEGER', 'Credits (negative for consume, positive for refund)'],
      ['balance_after', 'INTEGER', 'Balance after transaction'],
      ['operation', 'TEXT', 'consume | refund | provision'],
      ['ref', 'TEXT', 'Idempotency key'],
      ['service', 'TEXT', 'Service name'],
      ['created_at', 'TIMESTAMP', 'Transaction timestamp'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
    columnStyles: { 2: { cellWidth: 80 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.text("3.3 uploads", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Column', 'Type', 'Description']],
    body: [
      ['id', 'UUID', 'Primary key'],
      ['user_id', 'UUID', 'FK to profiles'],
      ['original_image_url', 'TEXT', 'Original image storage URL'],
      ['staged_image_url', 'TEXT', 'Edited image storage URL'],
      ['status', 'TEXT', 'pending | completed | failed'],
      ['is_public', 'BOOLEAN', 'Public gallery visibility'],
      ['credits_used', 'INTEGER', 'Credits consumed for this upload'],
      ['created_at', 'TIMESTAMP', 'Upload timestamp'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
    columnStyles: { 2: { cellWidth: 80 } }
  });

  // Integration Points
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("4. Integration Points", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(14);
  doc.text("4.1 Lovable AI Gateway", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Endpoint: https://ai.gateway.lovable.dev/v1/chat/completions", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.text("Authentication:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  doc.text('Authorization: Bearer ${LOVABLE_API_KEY}', 25, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Request Format:", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const aiRequest = [
    '{',
    '  "model": "google/gemini-2.0-flash-exp",',
    '  "messages": [',
    '    {',
    '      "role": "user",',
    '      "content": [',
    '        { "type": "text", "text": "ARCHITECTURAL_RULE + user_prompt" },',
    '        { "type": "image_url", "image_url": { "url": "data:image/..." } }',
    '      ]',
    '    }',
    '  ],',
    '  "modalities": ["image", "text"]',
    '}'
  ];
  aiRequest.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 4;
  });
  doc.setFont(undefined, 'normal');

  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("4.2 Stripe Webhooks", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Endpoint: /stripe-webhook", 20, yPos);
  yPos += 7;
  doc.text("Handles subscription lifecycle events:", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Event', 'Action']],
    body: [
      ['checkout.session.completed', 'Create subscription, provision credits'],
      ['customer.subscription.updated', 'Update subscription status'],
      ['customer.subscription.deleted', 'Cancel subscription'],
      ['invoice.payment_succeeded', 'Provision monthly credits'],
      ['invoice.payment_failed', 'Suspend subscription'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 }
  });

  doc.save("AI_Photo_Editor_API_Reference.pdf");
};
