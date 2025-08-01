#!/usr/bin/env node

/**
 * HIGHSTRAT AI - Prompt-Based UI Generator
 * Generate React components from text descriptions using Superflex
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// HIGHSTRAT AI Brand Context
const BRAND_CONTEXT = `
HIGHSTRAT AI Brand Guidelines:
- Colors: Primary Dark (#0e0934), Accent Pink (#bf2e8a), Accent Blue (#7ac5d7), White (#ffffff)
- Typography: Montserrat font family
- Style: Professional, modern B2B, minimalist, enterprise-grade
- Target: C-suite executives, procurement teams, enterprise users
- Aesthetic: Clean, trustworthy, sophisticated, data-driven
`;

// Component templates for common HIGHSTRAT AI use cases
const COMPONENT_TEMPLATES = {
  dashboard: {
    name: 'Dashboard Component',
    description: 'Enterprise dashboard with metrics, charts, and action items',
    requirements: [
      'Key performance indicators (KPIs) cards',
      'Interactive charts and graphs',
      'Recent activity feed',
      'Quick action buttons',
      'Responsive grid layout'
    ]
  },
  dataTable: {
    name: 'Data Table',
    description: 'Professional data table with sorting, filtering, and pagination',
    requirements: [
      'Sortable columns',
      'Search and filter functionality',
      'Pagination controls',
      'Row selection',
      'Export capabilities'
    ]
  },
  form: {
    name: 'Enterprise Form',
    description: 'Multi-step form with validation and progress tracking',
    requirements: [
      'Step-by-step progress indicator',
      'Form validation with error states',
      'Save draft functionality',
      'Professional input styling',
      'Submit confirmation'
    ]
  },
  modal: {
    name: 'Modal Dialog',
    description: 'Professional modal for confirmations and detailed views',
    requirements: [
      'Overlay backdrop',
      'Close button and ESC key support',
      'Responsive sizing',
      'Animation transitions',
      'Accessibility features'
    ]
  },
  navigation: {
    name: 'Navigation Component',
    description: 'Enterprise navigation with multi-level menu support',
    requirements: [
      'Collapsible sidebar',
      'Active state indicators',
      'Icon support',
      'Breadcrumb navigation',
      'Mobile responsive'
    ]
  }
};

function generatePrompt(componentName, userDescription, template = null) {
  let prompt = `${BRAND_CONTEXT}\n\n`;
  
  if (template) {
    prompt += `Template: ${template.name}\n`;
    prompt += `Base Description: ${template.description}\n`;
    prompt += `Requirements: ${template.requirements.join(', ')}\n\n`;
  }
  
  prompt += `Component Name: ${componentName}\n`;
  prompt += `User Description: ${userDescription}\n\n`;
  
  prompt += `Please generate a React TypeScript component with the following specifications:
1. Use HIGHSTRAT AI brand colors and Montserrat font
2. Professional B2B aesthetic suitable for enterprise users
3. Responsive design (mobile-first approach)
4. Accessibility compliant (WCAG 2.1 AA)
5. Include hover states and micro-interactions
6. Use Tailwind CSS classes
7. Include TypeScript interfaces for props
8. Add loading states where applicable
9. Follow React best practices and hooks
10. Include JSDoc comments for documentation

Generate clean, production-ready code that matches the HIGHSTRAT AI design system.`;

  return prompt;
}

function createComponent(componentName, prompt) {
  console.log(`🎨 Generating ${componentName} component...`);
  
  // Create the component directory if it doesn't exist
  const componentDir = path.join(__dirname, '../src/components/superflex');
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // Save the prompt for reference
  const promptFile = path.join(componentDir, `${componentName}.prompt.txt`);
  fs.writeFileSync(promptFile, prompt);
  
  console.log(`📝 Prompt saved to: ${promptFile}`);
  console.log(`\n🔥 Next steps:`);
  console.log(`1. Copy the prompt from ${promptFile}`);
  console.log(`2. Paste it into Superflex VS Code extension`);
  console.log(`3. The component will be generated at: src/components/superflex/${componentName}.tsx`);
  console.log(`4. It will automatically integrate with your existing components via withSuperflex HOC`);
  
  return promptFile;
}

function showTemplates() {
  console.log('\n📋 Available HIGHSTRAT AI Component Templates:\n');
  
  Object.entries(COMPONENT_TEMPLATES).forEach(([key, template]) => {
    console.log(`🔹 ${key}: ${template.name}`);
    console.log(`   ${template.description}`);
    console.log('');
  });
  
  console.log('Usage: npm run generate-ui <component-name> <description> [template-key]');
  console.log('Example: npm run generate-ui ProcurementDashboard "Dashboard for procurement metrics" dashboard');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log('🎨 HIGHSTRAT AI - Prompt-Based UI Generator\n');
    console.log('Generate React components from text descriptions using Superflex\n');
    showTemplates();
    return;
  }
  
  if (args[0] === '--templates' || args[0] === '-t') {
    showTemplates();
    return;
  }
  
  const componentName = args[0];
  const userDescription = args[1] || 'A professional component for HIGHSTRAT AI platform';
  const templateKey = args[2];
  
  if (!componentName) {
    console.error('❌ Error: Component name is required');
    console.log('Usage: npm run generate-ui <component-name> <description> [template-key]');
    return;
  }
  
  const template = templateKey ? COMPONENT_TEMPLATES[templateKey] : null;
  
  if (templateKey && !template) {
    console.error(`❌ Error: Template "${templateKey}" not found`);
    showTemplates();
    return;
  }
  
  const prompt = generatePrompt(componentName, userDescription, template);
  const promptFile = createComponent(componentName, prompt);
  
  console.log(`\n✨ Ready to generate ${componentName}!`);
  console.log(`📋 Prompt created with HIGHSTRAT AI branding and requirements`);
}

if (require.main === module) {
  main();
}

module.exports = {
  generatePrompt,
  createComponent,
  COMPONENT_TEMPLATES,
  BRAND_CONTEXT
};
