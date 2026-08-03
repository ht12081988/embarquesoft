'use client';

import React from 'react';

export default function RolesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>Roles</h1>
      </div>
      
      <div className="admin-card" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
        <h2>Roles section is currently under construction.</h2>
        <p>This will be implemented in a future update.</p>
      </div>
    </div>
  );
}
