'use client';

import React, { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';

interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  comments: string;
  date: string;
}

// Mock Data
const initialInquiries: Inquiry[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '212-444-8574',
    email: 'john.doe@example.com',
    comments: 'I would like to know if you deliver to Santo Domingo East.',
    date: '2026-07-16',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    mobile: '809-555-1234',
    email: 'maria.g@example.com',
    comments: 'What are the current rates for ocean freight per pound?',
    date: '2026-07-15',
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Smith',
    mobile: '305-999-8888',
    email: 'carlos.s@example.com',
    comments: 'I have a question about my recent invoice #INV-2309.',
    date: '2026-07-14',
  },
];

export default function InquiriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = initialInquiries.filter(
    (inq) =>
      inq.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.mobile.includes(searchTerm)
  );

  return (
    <div>
      <div className="admin-card-header">
        <h2 className="admin-card-title">Customer Inquiries</h2>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} 
            />
            <input
              type="text"
              className="admin-form-control"
              placeholder="Search by name, email, or mobile..."
              style={{ paddingLeft: '35px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Comment</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>{inq.date}</td>
                    <td>{inq.firstName} {inq.lastName}</td>
                    <td>{inq.mobile}</td>
                    <td>{inq.email}</td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={inq.comments}>
                      {inq.comments}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="admin-btn-icon" 
                        title="View Details"
                        onClick={() => setSelectedInquiry(inq)}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '30px' }}>
                    No inquiries found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Inquiry Details</h3>
              <button 
                className="admin-btn-icon" 
                onClick={() => setSelectedInquiry(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>First Name</label>
                  <div style={{ fontWeight: 500 }}>{selectedInquiry.firstName}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Last Name</label>
                  <div style={{ fontWeight: 500 }}>{selectedInquiry.lastName}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Mobile Number</label>
                  <div style={{ fontWeight: 500 }}>{selectedInquiry.mobile}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Email Address</label>
                  <div style={{ fontWeight: 500 }}>{selectedInquiry.email}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Date Submitted</label>
                  <div style={{ fontWeight: 500 }}>{selectedInquiry.date}</div>
                </div>
              </div>
              
              <div>
                <label className="admin-form-label" style={{ color: '#64748b' }}>Comments / Query Details</label>
                <div style={{ 
                  background: '#f8fafc', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  lineHeight: '1.5',
                  minHeight: '100px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedInquiry.comments}
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
