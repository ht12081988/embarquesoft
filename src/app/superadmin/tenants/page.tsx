'use client';

import React, { useState } from 'react';
import { Plus, Search, Eye, Lock, Edit2, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Tenant {
  id: string;
  tenantId: string;
  userName: string;
  name: string;
  branch: number;
  container: number;
  driver: number;
  invoice: number;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: '1', tenantId: 'TEN-000263', userName: 'Sdasq4234', name: 'Hardik', branch: 0, container: 0, driver: 0, invoice: 0 },
    { id: '2', tenantId: 'TEN-000206', userName: 'Snehachanekar1', name: 'Sneha Chanekar', branch: 0, container: 0, driver: 0, invoice: 0 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      setTenants(tenants.filter(t => t.id !== id));
    }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '16px', marginBottom: '24px' }}>
          <h1 className="admin-card-title">Tenants</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/superadmin/tenants/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
              <Plus size={16} /> Add
            </Link>
            <button className="admin-btn admin-btn-secondary">
              Columns <span style={{ fontSize: '10px', marginLeft: '4px' }}>▼</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Search</label>
            <input 
              type="text" 
              placeholder="Search" 
              className="admin-form-control"
              style={{ width: '250px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Date</label>
            <input 
              type="date" 
              className="admin-form-control"
              style={{ width: '200px' }}
              value={dateQuery}
              onChange={(e) => setDateQuery(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
            <button className="admin-btn admin-btn-danger" style={{ backgroundColor: '#dc2626' }}>Search</button>
            <button className="admin-btn" style={{ backgroundColor: '#fecaca', color: '#dc2626' }}>Clear</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead style={{ borderTop: '2px solid #3b82f6' }}>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" /></th>
                <th>Tenant ID ↕</th>
                <th>User Name ↕</th>
                <th>Name ↕</th>
                <th>Branch</th>
                <th>Container</th>
                <th>Driver</th>
                <th>Invoice</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(tenant => (
                <tr key={tenant.id}>
                  <td><input type="checkbox" /></td>
                  <td style={{ color: '#64748b' }}>{tenant.tenantId}</td>
                  <td>{tenant.userName}</td>
                  <td>{tenant.name}</td>
                  <td>{tenant.branch}</td>
                  <td>{tenant.container}</td>
                  <td>{tenant.driver}</td>
                  <td>{tenant.invoice}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '12px', color: '#64748b' }}>
                      <button title="View" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Eye size={16} /></button>
                      <button title="Lock" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Lock size={16} /></button>
                      <button title="Forward" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowRight size={16} /></button>
                      <Link href={`/superadmin/tenants/${tenant.id}`} title="Edit" style={{ color: 'inherit' }}><Edit2 size={16} /></Link>
                      <button title="Delete" onClick={() => handleDelete(tenant.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {tenants.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '20px' }}>No tenants found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '0.875rem', color: '#64748b' }}>
          <div>
            Showing <select className="admin-form-control" style={{ width: 'auto', display: 'inline-block', padding: '4px 8px' }}><option>10</option></select> per page
          </div>
          <div>Showing 1 to {tenants.length} of {tenants.length} records</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>«</span>
            <span>‹</span>
            <div style={{ backgroundColor: '#2d338a', color: 'white', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>1</div>
            <span>›</span>
            <span>»</span>
          </div>
        </div>
      </div>
    </div>
  );
}
