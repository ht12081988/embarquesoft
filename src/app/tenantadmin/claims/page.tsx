'use client';

import React, { useState } from 'react';
import { Search, Eye, Edit2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ClaimComment {
  id: string;
  userName: string;
  comment: string;
  timestamp: string;
  images: string[];
}

interface Claim {
  id: string;
  invoiceNumber: string;
  claimDate: string;
  firstName: string;
  lastName: string;
  telephone: string;
  cellphone: string;
  writeClaim: string;
  status: 'Open' | 'Processing' | 'Closed';
  createdDate: string;
  createdBy: string;
  images: string[];
  comments: ClaimComment[];
}

// Initial claims list matching layout and screenshots
const initialClaims: Claim[] = [
  {
    id: 'TCL-000012',
    invoiceNumber: 'TIV-000282',
    claimDate: '2026-04-06 12:25 PM',
    firstName: 'Sneha',
    lastName: 'Chanekar',
    telephone: '201-323-4234',
    cellphone: '201-556-6636',
    writeClaim: 'Box arrived damaged and contents were broken. Missing 2 items from the original packing list.',
    status: 'Open',
    createdDate: '2026-04-06',
    createdBy: 'Sneha Chanekar C12',
    images: [
      'https://placehold.co/150x150/e2e8f0/94a3b8?text=Image+1',
      'https://placehold.co/150x150/e2e8f0/94a3b8?text=Image+2',
      'https://placehold.co/150x150/e2e8f0/94a3b8?text=Image+3',
    ],
    comments: [
      {
        id: 'cc1',
        userName: 'Tenant Admin',
        comment: 'Yes, insurance can be added.',
        timestamp: '2026-07-17 2:45 PM',
        images: [],
      },
      {
        id: 'cc2',
        userName: 'John Doe',
        comment: 'Thank you for the quote...',
        timestamp: '2026-07-17 10:30 AM',
        images: ['https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG'],
      },
    ],
  },
  {
    id: 'TCL-000013',
    invoiceNumber: 'TIV-000285',
    claimDate: '2026-05-12 09:30 AM',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    telephone: '809-555-1234',
    cellphone: '809-555-5678',
    writeClaim: 'Refrigerator was scratched on the left side during cargo shipping.',
    status: 'Processing',
    createdDate: '2026-05-12',
    createdBy: 'Maria Gonzalez C13',
    images: [],
    comments: [],
  },
];

export default function TenantClaimsListing() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [claimsList, setClaimsList] = useState<Claim[]>(initialClaims);

  const filteredClaims = claimsList.filter(
    (c) =>
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="admin-card-header">
        <h2 className="admin-card-title">Claims Management</h2>
      </div>

      <div className="admin-card">
        {/* Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} 
            />
            <input
              type="text"
              className="admin-form-control"
              placeholder="Search by name, invoice or ID..."
              style={{ paddingLeft: '35px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Listing Grid */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Invoice Number</th>
                <th>Customer</th>
                <th>Claim Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.length > 0 ? (
                filteredClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td><strong>{claim.id}</strong></td>
                    <td>{claim.invoiceNumber}</td>
                    <td>{claim.firstName} {claim.lastName}</td>
                    <td>{claim.claimDate}</td>
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          background:
                            claim.status === 'Closed' ? '#def7ec' :
                            claim.status === 'Processing' ? '#fef3c7' :
                            '#fde8e8',
                          color:
                            claim.status === 'Closed' ? '#03543f' :
                            claim.status === 'Processing' ? '#92400e' :
                            '#9b1c1c',
                        }}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="admin-btn-icon"
                        title="Edit Claim"
                        onClick={() => router.push(`/tenantadmin/claims/${claim.id}`)}
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No claims found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
