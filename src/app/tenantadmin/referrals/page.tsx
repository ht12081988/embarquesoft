'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, UserPlus, Eye, Mail, Phone, Calendar } from 'lucide-react';

export default function TenantAdminReferralsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for referrals
  const referrals = [
    {
      id: 'REF-000001',
      referredById: 'CUST-8492',
      referredByName: 'Ricardo Guerrero',
      referredCustomerName: 'Alex Martinez',
      mobile: '305-123-4567',
      email: 'alex.m@example.com',
      dateTime: '2026-07-28 14:30',
      status: 'Joined'
    },
    {
      id: 'REF-000002',
      referredById: 'CUST-1029',
      referredByName: 'Maria Gonzalez',
      referredCustomerName: 'Sarah Connor',
      mobile: '212-987-6543',
      email: 'sarah.c@example.com',
      dateTime: '2026-07-20 09:15',
      status: 'Pending'
    },
    {
      id: 'REF-000003',
      referredById: 'CUST-8492',
      referredByName: 'Ricardo Guerrero',
      referredCustomerName: 'John Doe',
      mobile: '415-555-0198',
      email: 'johndoe@email.com',
      dateTime: '2026-08-01 11:45',
      status: 'Joined'
    }
  ];

  const filteredReferrals = referrals.filter(ref => 
    ref.referredByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.referredCustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.referredById.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.mobile.includes(searchQuery)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>Referrals</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Manage and view customer referrals.</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="admin-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by Referrer or Referred Name..." 
              className="admin-form-control"
              style={{ paddingLeft: '36px', height: '36px', fontSize: '0.875rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Referred BY ID</th>
                <th>Referred By Name</th>
                <th>Referred Customer Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Date/Time Referred</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map((ref) => (
                  <tr key={ref.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{ref.referredById}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>
                          {ref.referredByName.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 500, color: '#334155' }}>{ref.referredByName}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eb5b2715', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eb5b27', fontWeight: 600, fontSize: '0.75rem' }}>
                          {ref.referredCustomerName.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 500, color: '#334155' }}>{ref.referredCustomerName}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                        <Phone size={14} color="#94a3b8" />
                        {ref.mobile}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                        <Mail size={14} color="#94a3b8" />
                        {ref.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                        <Calendar size={14} color="#94a3b8" />
                        {ref.dateTime}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge ${ref.status === 'Joined' ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                        {ref.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <UserPlus size={32} color="#cbd5e1" />
                      <p>No referrals found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fafafa', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Showing 1 to {filteredReferrals.length} of {filteredReferrals.length} entries
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="admin-btn admin-btn-secondary" style={{ padding: '6px', minWidth: '32px', display: 'flex', justifyContent: 'center' }} disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="admin-btn admin-btn-primary" style={{ padding: '6px 12px', minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
              1
            </button>
            <button className="admin-btn admin-btn-secondary" style={{ padding: '6px', minWidth: '32px', display: 'flex', justifyContent: 'center' }} disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
