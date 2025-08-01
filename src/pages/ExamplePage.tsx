import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Mail, Lock, Search, User } from 'lucide-react';

const ExamplePage: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-brand-indigo dark:text-white">UI Components</h1>
        
        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-brand-indigo dark:text-white">Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Basic Card" subtitle="With header and content">
              <p className="text-gray-700 dark:text-gray-300">
                This is a basic card with a header and content area.
              </p>
            </Card>
            
            <Card 
              title="Card with Footer" 
              subtitle="Includes actions in the footer"
              footer={
                <div className="flex justify-end space-x-2">
                  <Button variant="text" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Save</Button>
                </div>
              }
            >
              <p className="text-gray-700 dark:text-gray-300">
                This card includes a footer with action buttons.
              </p>
            </Card>
            
            <Card hoverable bordered={false} className="bg-gradient-to-br from-brand-indigo to-brand-pink/90 text-white">
              <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
              <p>A card with gradient background and no border.</p>
            </Card>
          </div>
        </section>
        
        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-brand-indigo dark:text-white">Buttons</h2>
          
          <Card>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="text">Text</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="xs">Extra Small</Button>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" size="xl">Extra Large</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Button States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="primary" leftIcon={<Search size={16} />}>With Icon</Button>
                  <Button variant="outline" rightIcon={<ChevronRight size={16} />}>Next Step</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
        
        {/* Form Controls Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-brand-indigo dark:text-white">Form Controls</h2>
          
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formValues.name}
                  onChange={handleChange}
                  leftIcon={<User size={18} />}
                  fullWidth
                />
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={errors.email}
                  leftIcon={<Mail size={18} />}
                  fullWidth
                />
                
                <Select
                  label="Role"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Select a role', disabled: true },
                    { value: 'admin', label: 'Administrator' },
                    { value: 'user', label: 'Regular User' },
                    { value: 'guest', label: 'Guest' },
                  ]}
                  fullWidth
                />
                
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  leftIcon={<Lock size={18} />}
                  fullWidth
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-brand-indigo dark:text-gray-200">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 dark:border-dark-600 
                    bg-white dark:bg-dark-800 text-brand-indigo dark:text-white
                    py-2 px-4 shadow-sm text-sm focus:outline-none focus:ring-2
                    focus:ring-brand-blue focus:border-brand-blue
                    transition-colors duration-200"
                  placeholder="Enter your message"
                  value={formValues.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" type="button">Cancel</Button>
                <Button variant="primary" type="submit">Submit</Button><div className="flex justify-end space-x-3">
                <Button variant="outline" type="button">Cancel</Button>
                <Button variant="primary" type="submit">Submit</Button>
              </div>
            </form>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
};

export default ExamplePage;
