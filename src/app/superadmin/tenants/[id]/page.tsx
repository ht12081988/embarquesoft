'use client';

import React from 'react';
import TenantForm from '@/components/superadmin/TenantForm';

export default function EditTenantPage({ params }: { params: { id: string } }) {
  // In a real application, we would fetch the tenant data based on the params.id
  // For now, we'll pass mock initial data.
  const mockTenantData = {
    tenantId: 'TEN-000206',
    tenantName: 'Sneha Chanekar',
    emailId: 'snehachanekar1@grr.la',
    address1: 'Goa',
    address2: 'palll',
    country: 'India',
    city: 'goa',
    state: 'GA',
    zip: '56544332',
    password: '',
    confirmPassword: '',
    cellNumber: '201-555-8543',
    telephoneNumber: '201-555-8567',
    officeNumber: '201-555-5981',
    website: '',
    tracking: 'No',
    tax: '1',
    userName: 'snehachanekar1',
    active: true,
    timeFormat: '24 hours',
    terms: true,
  };

  return (
    <div>
      <TenantForm isEditing={true} initialData={mockTenantData} />
    </div>
  );
}
