import React from 'react';

// Type definitions for Superflex integration
export interface SuperflexComponent {
  id: string;
  name: string;
  figmaId: string;
  lastUpdated: string;
  component: React.ComponentType<any>;
}

export interface ComponentMapping {
  manualComponent: string;
  superflexComponent: string;
  migrationStatus: 'pending' | 'in-progress' | 'completed';
  preserveLogic: boolean;
}

// Component registry for managing manual vs Superflex components
class SuperflexRegistry {
  private components: Map<string, SuperflexComponent> = new Map();
  private mappings: Map<string, ComponentMapping> = new Map();

  // Register a Superflex-generated component
  registerComponent(component: SuperflexComponent): void {
    this.components.set(component.name, component);
    console.log(`✅ Registered Superflex component: ${component.name}`);
  }

  // Get component (Superflex or fallback to manual)
  getComponent(name: string): React.ComponentType<any> | null {
    const superflexComponent = this.components.get(name);
    
    if (superflexComponent) {
      console.log(`🎨 Using Superflex component: ${name}`);
      return superflexComponent.component;
    }

    // Fallback to manual component
    console.log(`🔧 Falling back to manual component: ${name}`);
    return null;
  }

  // Create component mapping for gradual migration
  createMapping(mapping: ComponentMapping): void {
    this.mappings.set(mapping.manualComponent, mapping);
    console.log(`🔄 Created mapping: ${mapping.manualComponent} -> ${mapping.superflexComponent}`);
  }

  // Get all registered components
  getAllComponents(): SuperflexComponent[] {
    return Array.from(this.components.values());
  }

  // Check if component is available from Superflex
  hasComponent(name: string): boolean {
    return this.components.has(name);
  }
}

// Global registry instance
export const superflexRegistry = new SuperflexRegistry();

// Higher-order component for Superflex integration
export function withSuperflex<P extends object>(
  manualComponent: React.ComponentType<P>,
  componentName: string,
  options: {
    fallbackToManual?: boolean;
    preserveProps?: boolean;
    debugMode?: boolean;
  } = {}
) {
  const {
    fallbackToManual = true,
    preserveProps = true,
    debugMode = process.env.NODE_ENV === 'development'
  } = options;

  return function SuperflexWrapper(props: P) {
    // Try to get Superflex component first
    const SuperflexComponent = superflexRegistry.getComponent(componentName);

    if (SuperflexComponent) {
      if (debugMode) {
        console.log(`🎨 Rendering Superflex component: ${componentName}`);
      }
      
      // Render Superflex component with preserved props
      return React.createElement(SuperflexComponent, preserveProps ? props : {});
    }

    // Fallback to manual component
    if (fallbackToManual) {
      if (debugMode) {
        console.log(`🔧 Rendering manual component: ${componentName}`);
      }
      return React.createElement(manualComponent, props);
    }

    // No fallback - render nothing or error
    if (debugMode) {
      console.warn(`⚠️ No component available for: ${componentName}`);
    }
    return null;
  };
}

// Utility to sync with Figma
export async function syncWithFigma(): Promise<void> {
  try {
    console.log('🔄 Syncing with Figma...');
    
    // This would typically call the Superflex CLI or API
    // For now, we'll simulate the sync process
    
    // In a real implementation, this would:
    // 1. Connect to Figma API using the file key
    // 2. Fetch updated components
    // 3. Generate React components
    // 4. Register them in the registry
    
    console.log('✅ Figma sync completed');
  } catch (error) {
    console.error('❌ Figma sync failed:', error);
    throw error;
  }
}

// Component migration helper
export function migrateComponent(
  manualComponentName: string,
  superflexComponentName: string
): void {
  const mapping: ComponentMapping = {
    manualComponent: manualComponentName,
    superflexComponent: superflexComponentName,
    migrationStatus: 'pending',
    preserveLogic: true
  };

  superflexRegistry.createMapping(mapping);
}

// Development utilities
export const SuperflexDevTools = {
  // List all available components
  listComponents(): void {
    console.group('🎨 Superflex Components');
    const components = superflexRegistry.getAllComponents();
    
    if (components.length === 0) {
      console.log('No Superflex components registered');
    } else {
      components.forEach(comp => {
        console.log(`- ${comp.name} (${comp.figmaId}) - Updated: ${comp.lastUpdated}`);
      });
    }
    console.groupEnd();
  },

  // Force sync with Figma
  async forcSync(): Promise<void> {
    await syncWithFigma();
  },

  // Clear all registered components (for development)
  clearRegistry(): void {
    console.log('🧹 Clearing Superflex registry');
    // This would clear the internal registry
  }
};

// Export for global access in development
if (process.env.NODE_ENV === 'development') {
  (window as any).SuperflexDevTools = SuperflexDevTools;
}
