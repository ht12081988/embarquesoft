'use client';

import React from 'react';
import TenantForm from '@/components/superadmin/TenantForm';

export default function NewTenantPage() {
  return (
    <div>
      <TenantForm isEditing={false} />
    </div>
  );
}
