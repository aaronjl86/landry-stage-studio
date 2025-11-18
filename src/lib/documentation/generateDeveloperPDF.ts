import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateDeveloperPDF = () => {
  const doc = new jsPDF();
  let yPos = 20;

  // Cover Page
  doc.setFontSize(28);
  doc.text("AI Photo Editor", 105, yPos, { align: "center" });
  yPos += 15;
  
  doc.setFontSize(20);
  doc.text("Developer Guide", 105, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("The Landry Method", 105, yPos, { align: "center" });
  yPos += 50;
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });

  // Setup Instructions
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("1. Development Setup", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("1.1 Prerequisites", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Tool', 'Version', 'Purpose']],
    body: [
      ['Node.js', 'v18+', 'JavaScript runtime'],
      ['npm', 'v9+', 'Package manager'],
      ['Git', 'Latest', 'Version control'],
      ['VS Code', 'Latest', 'Recommended IDE'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("1.2 Project Setup", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const setupCommands = [
    '# Clone repository',
    'git clone <repository-url>',
    'cd the-landry-method',
    '',
    '# Install dependencies',
    'npm install',
    '',
    '# Copy environment variables',
    'cp .env.example .env',
    '',
    '# Start development server',
    'npm run dev',
    '',
    '# Open browser',
    'http://localhost:5173'
  ];
  
  setupCommands.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');

  // Environment Variables
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("2. Environment Configuration", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("2.1 Required Environment Variables", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Variable', 'Description', 'Source']],
    body: [
      ['VITE_SUPABASE_URL', 'Supabase project URL', 'Supabase Dashboard'],
      ['VITE_SUPABASE_PUBLISHABLE_KEY', 'Supabase anon key', 'Supabase Dashboard'],
      ['LOVABLE_API_KEY', 'AI Gateway API key', 'Lovable Dashboard'],
      ['STRIPE_SECRET_KEY', 'Stripe API key', 'Stripe Dashboard'],
      ['STRIPE_WEBHOOK_SECRET', 'Stripe webhook secret', 'Stripe Dashboard'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
    columnStyles: { 2: { cellWidth: 50 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("2.2 Edge Function Secrets", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Secrets are managed via Supabase CLI:", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  doc.text('supabase secrets set LOVABLE_API_KEY=<key>', 25, yPos);
  yPos += 5;
  doc.text('supabase secrets set STRIPE_SECRET_KEY=<key>', 25, yPos);
  doc.setFont(undefined, 'normal');

  // Code Structure
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("3. Code Structure & Conventions", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("3.1 Project Structure", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const structure = [
    'src/',
    '├── components/',
    '│   ├── ai/                 # AI photo editor components',
    '│   │   ├── AIPhotoEditor.tsx',
    '│   │   ├── EnhancedPhotoUpload.tsx',
    '│   │   ├── EnhancedTemplateSelector.tsx',
    '│   │   └── ProcessingQueue.tsx',
    '│   ├── landing/            # Marketing pages',
    '│   └── ui/                 # shadcn/ui components',
    '├── contexts/               # React contexts',
    '│   └── AuthContext.tsx',
    '├── hooks/                  # Custom hooks',
    '│   └── useAIProcessor.tsx',
    '├── lib/',
    '│   ├── aiAPI.ts           # AI Gateway client',
    '│   └── documentation/     # PDF generators',
    '├── pages/                  # Route pages',
    '├── integrations/supabase/ # Supabase client',
    '└── styles/                # Global styles',
    '',
    'supabase/',
    '├── functions/              # Edge Functions',
    '│   ├── edit-photo/',
    '│   ├── generate-image/',
    '│   ├── get-credit-balance/',
    '│   └── _shared/           # Shared utilities',
    '└── config.toml            # Supabase config'
  ];
  
  structure.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 4;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });
  doc.setFont(undefined, 'normal');

  // Coding Standards
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("4. Coding Standards", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("4.1 TypeScript Guidelines", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const tsGuidelines = [
    "• Always use TypeScript strict mode",
    "• Prefer interfaces over types for object shapes",
    "• Use explicit return types for functions",
    "• Avoid 'any' type - use 'unknown' or proper types",
    "• Use optional chaining (?.) for nullable values",
    "• Use nullish coalescing (??) over ||",
    "",
    "Example:",
  ];
  
  tsGuidelines.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const tsExample = [
    'interface EditingJob {',
    '  id: string;',
    '  status: JobStatus;',
    '  progress: number;',
    '  originalImage: string;',
    '  editedImage?: string;',
    '}',
    '',
    'async function processJob(',
    '  job: EditingJob',
    '): Promise<EditingJob> {',
    '  // Implementation',
    '}'
  ];
  
  tsExample.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 4;
  });
  doc.setFont(undefined, 'normal');

  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("4.2 React Component Guidelines", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const reactGuidelines = [
    "• Use functional components with hooks",
    "• Extract complex logic into custom hooks",
    "• Keep components under 300 lines",
    "• Use meaningful prop names",
    "• Document complex components with JSDoc",
    "• Memoize expensive computations with useMemo",
    "• Use useCallback for event handlers passed as props"
  ];
  
  reactGuidelines.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });

  // Testing
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("5. Testing Procedures", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("5.1 Manual Testing Checklist", 20, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Feature', 'Test Steps', 'Expected Result']],
    body: [
      [
        'Image Upload',
        '1. Upload single image\n2. Upload multiple images\n3. Drag & drop',
        'Images compressed and previewed'
      ],
      [
        'Template Selection',
        '1. Select template\n2. Enter custom prompt',
        'Template/prompt highlighted'
      ],
      [
        'Processing',
        '1. Submit job\n2. Watch progress\n3. Check result',
        'Status updates, image displayed'
      ],
      [
        'Credit System',
        '1. Check balance\n2. Process image\n3. Verify deduction',
        'Credits deducted correctly'
      ],
      [
        'Error Handling',
        '1. Submit invalid image\n2. Submit with 0 credits',
        'Error messages displayed'
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 8 },
    columnStyles: { 
      0: { cellWidth: 35 },
      1: { cellWidth: 60 },
      2: { cellWidth: 80 }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("5.2 Edge Function Testing", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.text("Test Edge Functions locally:", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const testCommands = [
    '# Start Supabase locally',
    'supabase start',
    '',
    '# Deploy functions',
    'supabase functions deploy edit-photo',
    '',
    '# Test with curl',
    'curl -X POST http://localhost:54321/functions/v1/edit-photo \\',
    '  -H "Authorization: Bearer <anon-key>" \\',
    '  -H "Content-Type: application/json" \\',
    '  -d \'{"prompt":"test","imageData":"..."}\'',
  ];
  
  testCommands.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 4;
  });
  doc.setFont(undefined, 'normal');

  // Deployment
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("6. Deployment Process", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("6.1 Pre-Deployment Checklist", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const preDeployment = [
    "□ All TypeScript errors resolved",
    "□ Environment variables configured",
    "□ Edge Functions tested locally",
    "□ Database migrations applied",
    "□ RLS policies verified",
    "□ Credit system tested",
    "□ Error handling tested",
    "□ Performance optimized"
  ];
  
  preDeployment.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  yPos += 5;
  doc.setFontSize(12);
  doc.text("6.2 Deployment Steps", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont(undefined, 'mono');
  const deploySteps = [
    '# 1. Build frontend',
    'npm run build',
    '',
    '# 2. Deploy Edge Functions',
    'supabase functions deploy',
    '',
    '# 3. Apply database migrations',
    'supabase db push',
    '',
    '# 4. Deploy to hosting (Cloudflare Pages)',
    'npm run deploy',
    '',
    '# 5. Verify deployment',
    'curl https://your-domain.com/health'
  ];
  
  deploySteps.forEach(line => {
    doc.text(line, 25, yPos);
    yPos += 5;
  });
  doc.setFont(undefined, 'normal');

  // Troubleshooting
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("7. Troubleshooting Guide", 20, yPos);
  yPos += 10;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Problem', 'Solution']],
    body: [
      [
        'Type errors in Supabase types',
        'Run: supabase gen types typescript > src/integrations/supabase/types.ts'
      ],
      [
        'Edge Function not found',
        'Verify function deployed: supabase functions list'
      ],
      [
        'CORS errors',
        'Check corsHeaders in Edge Function, verify OPTIONS handler'
      ],
      [
        'Credits not deducting',
        'Check RPC function permissions, verify RLS policies'
      ],
      [
        'Images not uploading',
        'Verify Storage bucket policies, check RLS on room-images'
      ],
      [
        'AI generation timeout',
        'Increase timeout in fetch call, check AI Gateway status'
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
    columnStyles: { 
      0: { cellWidth: 60 },
      1: { cellWidth: 120 }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.text("7.1 Debugging Tools", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const debugTools = [
    "• Browser DevTools Console - Frontend errors",
    "• Supabase Functions Dashboard - Edge Function logs",
    "• Supabase Table Editor - Database inspection",
    "• Network Tab - API request/response inspection",
    "• React DevTools - Component state inspection"
  ];
  
  debugTools.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Best Practices
  doc.addPage();
  yPos = 20;
  doc.setFontSize(16);
  doc.text("8. Best Practices", 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text("8.1 Performance", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const perfPractices = [
    "• Compress images before upload (target: <2MB)",
    "• Use lazy loading for images",
    "• Implement proper error boundaries",
    "• Memoize expensive computations",
    "• Batch API requests when possible",
    "• Use React.memo for expensive components",
    "• Implement proper loading states"
  ];
  
  perfPractices.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  yPos += 5;
  doc.setFontSize(12);
  doc.text("8.2 Security", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const securityPractices = [
    "• Never expose API keys in frontend code",
    "• Always validate JWT tokens in Edge Functions",
    "• Implement rate limiting on all endpoints",
    "• Use RLS policies for data isolation",
    "• Sanitize user inputs before processing",
    "• Use HTTPS in production",
    "• Implement proper error handling (no sensitive info leaks)"
  ];
  
  securityPractices.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  yPos += 5;
  doc.setFontSize(12);
  doc.text("8.3 Code Quality", 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  const qualityPractices = [
    "• Write self-documenting code with clear names",
    "• Add JSDoc comments for complex functions",
    "• Keep functions small and focused (single responsibility)",
    "• Extract magic numbers into named constants",
    "• Use meaningful commit messages",
    "• Review your own PR before submitting",
    "• Run linter before committing"
  ];
  
  qualityPractices.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  doc.save("AI_Photo_Editor_Developer_Guide.pdf");
};
