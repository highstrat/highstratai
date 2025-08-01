// Supabase configuration for HIGHSTRAT AI
// This file manages the connection to Supabase and provides helper functions for data access

// Initialize Supabase client
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = 'your-supabase-anon-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Data retrieval functions
async function fetchProjects() {
    try {
        // For development/demo purposes, we're using mock data since we don't have actual credentials
        return mockProjects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

async function fetchAssessments() {
    try {
        // For development/demo purposes, we're using mock data
        return mockAssessments;
    } catch (error) {
        console.error('Error fetching assessments:', error);
        return [];
    }
}

async function fetchMetrics() {
    try {
        // For development/demo purposes, we're using mock data
        return mockMetrics;
    } catch (error) {
        console.error('Error fetching metrics:', error);
        return [];
    }
}

async function fetchActivities() {
    try {
        // For development/demo purposes, we're using mock data
        return mockActivities;
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
}

// Mock data for development/demo purposes
const mockProjects = [
    {
        id: 1,
        name: 'Phoenix Modernization',
        status: 'In Progress',
        completion: 65,
        startDate: '2025-01-15',
        endDate: '2025-06-30',
        phase: 'implement'
    },
    {
        id: 2,
        name: 'Cloud Migration Initiative',
        status: 'Planning',
        completion: 25,
        startDate: '2025-03-01',
        endDate: '2025-09-15',
        phase: 'design'
    },
    {
        id: 3,
        name: 'Data Analytics Platform',
        status: 'Contract',
        completion: 40,
        startDate: '2025-02-10',
        endDate: '2025-08-20',
        phase: 'contract'
    }
];

const mockAssessments = [
    {
        id: 1,
        name: 'IT Infrastructure Assessment',
        date: '2025-04-10',
        score: 72,
        status: 'Completed'
    },
    {
        id: 2,
        name: 'Application Portfolio Analysis',
        date: '2025-03-22',
        score: 68,
        status: 'Completed'
    },
    {
        id: 3,
        name: 'Digital Maturity Assessment',
        date: '2025-04-05',
        score: 63,
        status: 'In Review'
    }
];

const mockMetrics = [
    {
        id: 1,
        name: 'Cost Savings',
        value: '$1.2M',
        trend: 'up',
        percent: 15
    },
    {
        id: 2,
        name: 'Time to Market',
        value: '32 days',
        trend: 'down',
        percent: 22
    },
    {
        id: 3,
        name: 'Resource Utilization',
        value: '85%',
        trend: 'up',
        percent: 8
    },
    {
        id: 4,
        name: 'Quality Score',
        value: '92/100',
        trend: 'up',
        percent: 5
    }
];

const mockActivities = [
    {
        id: 1,
        type: 'assessment',
        name: 'IT Infrastructure Assessment Completed',
        date: '2025-04-10',
        user: 'John Smith'
    },
    {
        id: 2,
        type: 'contract',
        name: 'Cloud Provider Contract Signed',
        date: '2025-04-08',
        user: 'Maria Garcia'
    },
    {
        id: 3,
        type: 'implementation',
        name: 'Data Migration Started',
        date: '2025-04-05',
        user: 'David Chen'
    },
    {
        id: 4,
        type: 'design',
        name: 'Solution Architecture Approved',
        date: '2025-04-01',
        user: 'Sarah Johnson'
    }
];
