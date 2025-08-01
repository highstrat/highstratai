import React, { useState } from 'react';
import { Search, Plus, Settings, Bell, User, Download } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ComponentShowcase: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('components');

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0e0934] dark:text-white font-montserrat mb-2">
            HIGHSTRAT AI Component Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-montserrat">
            A comprehensive collection of UI components built with React and Tailwind CSS
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="components">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons */}
              <Card title="Buttons" subtitle="Various button styles and states">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="text">Text</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" loading>Loading</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                    <Button variant="primary" leftIcon={<Plus size={16} />}>With Icon</Button>
                  </div>
                </div>
              </Card>

              {/* Badges */}
              <Card title="Badges" subtitle="Status indicators and labels">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="primary" dot>With Dot</Badge>
                    <Badge variant="success" removable onRemove={() => console.log('Removed')}>
                      Removable
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Loading States */}
              <Card title="Loading States" subtitle="Various loading indicators">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="md" />
                    <LoadingSpinner size="lg" />
                    <LoadingSpinner size="xl" />
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <LoadingSpinner color="primary" text="Loading..." />
                    <LoadingSpinner color="secondary" text="Processing..." />
                  </div>
                </div>
              </Card>

              {/* Modal */}
              <Card title="Modal" subtitle="Dialog and overlay components">
                <div className="space-y-4">
                  <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                  
                  <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Example Modal"
                    footer={
                      <>
                        <Button variant="outline" onClick={() => setModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setModalOpen(false)}>
                          Confirm
                        </Button>
                      </>
                    }
                  >
                    <p className="text-gray-600 dark:text-gray-400 font-montserrat">
                      This is an example modal dialog. You can put any content here including forms, 
                      images, or other components.
                    </p>
                  </Modal>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forms">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Fields */}
              <Card title="Input Fields" subtitle="Text inputs with various states">
                <div className="space-y-4">
                  <Input
                    label="Default Input"
                    placeholder="Enter text..."
                    helperText="This is helper text"
                  />
                  
                  <Input
                    label="With Icon"
                    placeholder="Search..."
                    leftIcon={<Search size={18} />}
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password..."
                  />
                  
                  <Input
                    label="Error State"
                    placeholder="Invalid input"
                    error="This field is required"
                  />
                  
                  <Input
                    label="Disabled"
                    placeholder="Disabled input"
                    disabled
                  />
                </div>
              </Card>

              {/* Select Fields */}
              <Card title="Select Fields" subtitle="Dropdown selections">
                <div className="space-y-4">
                  <Select
                    label="Default Select"
                    options={selectOptions}
                    placeholder="Choose an option..."
                  />
                  
                  <Select
                    label="With Error"
                    options={selectOptions}
                    error="Please select an option"
                  />
                  
                  <Select
                    label="Disabled"
                    options={selectOptions}
                    disabled
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="layout">
            <Card title="Layout Components" subtitle="Structural components for page layout">
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 font-montserrat">
                  The current page demonstrates the AppLayout component with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-montserrat">
                  <li>Responsive sidebar navigation</li>
                  <li>Dark mode toggle</li>
                  <li>Mobile-friendly design</li>
                  <li>HIGHSTRAT AI branding</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ComponentShowcase;
