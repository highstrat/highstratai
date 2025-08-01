module.exports = {
  // Prompt-Based Generation (No Figma Required)
  mode: 'prompt', // Enable prompt-based generation
  
  // Output Configuration
  outputDir: './src/components/superflex',
  
  // Framework Configuration
  framework: 'react',
  typescript: true,
  
  // Styling Configuration
  styling: {
    framework: 'tailwindcss',
    customClasses: {
      // HIGHSTRAT AI Brand Classes
      'primary-dark': 'bg-primary-dark text-white',
      'accent-pink': 'bg-accent-pink text-white',
      'accent-blue': 'bg-accent-blue text-primary-dark',
      'primary-background': 'bg-white text-primary-dark',
      'brand-gradient': 'bg-gradient-to-r from-accent-pink to-accent-blue text-white'
    },
    // Brand color palette
    colors: {
      primary: {
        dark: '#0e0934',
        background: '#ffffff'
      },
      accent: {
        pink: '#bf2e8a',
        blue: '#7ac5d7'
      }
    }
  },
  
  // Component Configuration
  components: {
    // Preserve existing component structure
    preserveExisting: true,
    
    // Component naming convention
    naming: {
      prefix: 'Superflex',
      suffix: '',
      case: 'PascalCase'
    },
    
    // Default props for generated components
    defaultProps: {
      className: 'font-montserrat', // HIGHSTRAT AI font
    }
  },
  
  // Prompt Generation Settings
  generation: {
    // AI model preferences
    model: 'gpt-4',
    
    // Brand context for all prompts
    brandContext: `
      HIGHSTRAT AI is an enterprise strategy and AI solutions platform.
      Brand Colors: Primary Dark (#0e0934), Accent Pink (#bf2e8a), Accent Blue (#7ac5d7), White (#ffffff)
      Typography: Montserrat font family
      Style: Professional, modern B2B, minimalist, enterprise-grade
      Target: C-suite executives, procurement teams, enterprise users
    `,
    
    // Default component requirements
    defaultRequirements: [
      'Responsive design (mobile-first)',
      'Accessibility compliant (WCAG 2.1 AA)',
      'TypeScript interfaces',
      'HIGHSTRAT AI brand colors only',
      'Professional B2B aesthetic',
      'Hover states and micro-interactions',
      'Loading states where applicable'
    ]
  },
  
  // Integration Settings
  integration: {
    // Auto-register components
    autoRegister: true,
    
    // Fallback to manual components
    fallbackEnabled: true,
    
    // Development mode debugging
    debugMode: true
  }
};
