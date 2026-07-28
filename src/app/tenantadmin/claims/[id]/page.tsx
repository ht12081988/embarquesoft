'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { X, Reply, ArrowLeft, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';

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

const mockClaims: Claim[] = [
  {
    id: 'TCL-000012',
    invoiceNumber: 'TIV-000282',
    claimDate: '2026-04-06',
    firstName: 'Sneha',
    lastName: 'Chanekar',
    telephone: '201-323-4234',
    cellphone: '201-556-6636',
    writeClaim: 'Enter Write Claim',
    status: 'Open',
    createdDate: '2026-04-06',
    createdBy: 'Sneha Chanekar C12',
    images: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
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
];

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditClaimPage({ params }: PageProps) {
  const router = useRouter();
  const { id: claimId } = React.use(params);

  const [activeTab, setActiveTab] = useState<'details' | 'comments'>('details');
  const [claim, setClaim] = useState<Claim | undefined>(() =>
    mockClaims.find((c) => c.id === claimId) || mockClaims[0]
  );

  const [commentText, setCommentText] = useState('');

  if (!claim) {
    return (
      <div className="admin-card" style={{ textAlign: 'center', padding: '40px' }}>
        <p>Claim not found.</p>
        <button onClick={() => router.push('/tenantadmin/claims')} className="admin-btn admin-btn-primary">
          Back to Listing
        </button>
      </div>
    );
  }

  const handleStatusChange = (status: 'Open' | 'Processing' | 'Closed') => {
    setClaim(prev => prev ? { ...prev, status } : undefined);
  };

  const handleFieldChange = (field: keyof Claim, value: any) => {
    setClaim(prev => prev ? { ...prev, [field]: value } : undefined);
  };

  const handleSave = () => {
    alert('Claim updated successfully!');
    router.push('/tenantadmin/claims');
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newCommentObj: ClaimComment = {
      id: `cc${Date.now()}`,
      userName: 'Tenant Admin',
      comment: commentText.trim(),
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
      images: [],
    };
    setClaim(prev => prev ? { ...prev, comments: [...prev.comments, newCommentObj] } : undefined);
    setCommentText('');
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100%', padding: '20px 0' }}>
      
      {/* Page Heading & Breadcrumbs */}
      <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Edit Claim</h2>
        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Link href="/tenantadmin/claims" style={{ color: '#3b82f6', textDecoration: 'none' }}>Claim List</Link>
          <span>/</span>
          <span style={{ color: '#64748b' }}>Edit Claim</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('details')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'details' ? '2.5px solid #2563eb' : 'none',
            color: activeTab === 'details' ? '#2563eb' : '#64748b',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Claim Details
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'comments' ? '2.5px solid #2563eb' : 'none',
            color: activeTab === 'comments' ? '#2563eb' : '#64748b',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <MessageSquare size={16} />
          Claim Comment ({claim.comments.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'details' ? (
        /* ── CLAIM DETAILS TAB ── */
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Left Column Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Claim ID */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Claim ID<span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  type="text"
                  readOnly
                  value={claim.id}
                  className="admin-form-control"
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'not-allowed' }}
                />
              </div>

              {/* Claim Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Claim Date<span style={{ color: '#ef4444' }}>*</span></span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="date"
                    value={claim.claimDate}
                    onChange={(e) => handleFieldChange('claimDate', e.target.value)}
                    className="admin-form-control"
                    style={{ flex: 1 }}
                  />
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                    <input type="text" defaultValue="12" style={{ width: '32px', textAlign: 'center', border: 'none', fontSize: '13px', outline: 'none' }} />
                    <span style={{ color: '#cbd5e1' }}>:</span>
                    <input type="text" defaultValue="25" style={{ width: '32px', textAlign: 'center', border: 'none', fontSize: '13px', outline: 'none' }} />
                    <button type="button" style={{ background: '#2563eb', color: '#ffffff', border: 'none', fontSize: '11px', fontWeight: 'bold', padding: '6px 8px', height: '100%' }}>PM</button>
                  </div>
                </div>
              </div>

              {/* First Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>First Name<span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  type="text"
                  value={claim.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  className="admin-form-control"
                />
              </div>

              {/* Last Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Last Name<span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  type="text"
                  value={claim.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  className="admin-form-control"
                />
              </div>

              {/* Telephone */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Telephone Number<span style={{ color: '#ef4444' }}>*</span></span>
                <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '0 8px', borderRight: '1px solid #cbd5e1', fontSize: '12px', gap: '4px' }}>
                    <img src="https://flagcdn.com/w20/us.png" width="16" alt="US" />
                    <span>+1</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>▼</span>
                  </div>
                  <input
                    type="text"
                    value={claim.telephone}
                    onChange={(e) => handleFieldChange('telephone', e.target.value)}
                    className="admin-form-control"
                    style={{ border: 'none', flex: 1 }}
                  />
                </div>
              </div>

              {/* Cellphone */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Cellphone Number<span style={{ color: '#ef4444' }}>*</span></span>
                <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '0 8px', borderRight: '1px solid #cbd5e1', fontSize: '12px', gap: '4px' }}>
                    <img src="https://flagcdn.com/w20/us.png" width="16" alt="US" />
                    <span>+1</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>▼</span>
                  </div>
                  <input
                    type="text"
                    value={claim.cellphone}
                    onChange={(e) => handleFieldChange('cellphone', e.target.value)}
                    className="admin-form-control"
                    style={{ border: 'none', flex: 1 }}
                  />
                </div>
              </div>

              {/* Images Section */}
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {['Image 1', 'Image 2', 'Image 3'].map((label, index) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        border: '1px solid #cbd5e1'
                      }}>
                        {claim.images[index] ? (
                          <img src={claim.images[index]} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>No Photo</div>
                        )}
                      </div>
                      <button type="button" style={{ border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff', padding: '6px', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Invoice Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Invoice Number<span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  type="text"
                  value={claim.invoiceNumber}
                  onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
                  className="admin-form-control"
                />
              </div>

              {/* Type / Status radio list */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Type<span style={{ color: '#ef4444' }}>*</span></span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {(['Open', 'Processing', 'Closed'] as const).map((status) => (
                    <label key={status} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="claimStatus"
                        checked={claim.status === status}
                        onChange={() => handleStatusChange(status)}
                        style={{ cursor: 'pointer' }}
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              {/* Created By */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Created By<span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  type="text"
                  readOnly
                  value={claim.createdBy}
                  className="admin-form-control"
                  style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                />
              </div>

              {/* Created Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Created Date</span>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    readOnly
                    value={claim.createdDate}
                    className="admin-form-control"
                    style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                  <Calendar size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>
              </div>

              {/* Write Claim */}
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'start' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginTop: '8px' }}>Write Claim<span style={{ color: '#ef4444' }}>*</span></span>
                <textarea
                  value={claim.writeClaim}
                  onChange={(e) => handleFieldChange('writeClaim', e.target.value)}
                  className="admin-form-control"
                  rows={4}
                  placeholder="Enter Write Claim"
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Action Bar at bottom */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
            <button
              onClick={() => router.push('/tenantadmin/claims')}
              style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '10px 20px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{ background: '#2563eb', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '13px', fontWeight: '600', color: '#ffffff', cursor: 'pointer' }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        /* ── CLAIM COMMENT TAB ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* New Comment Compositing section */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Add Comment</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="admin-form-control"
              rows={3}
              placeholder="Type your claim comment here..."
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                style={{
                  background: commentText.trim() ? '#2563eb' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: commentText.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background 0.15s ease'
                }}
              >
                Send Comment
              </button>
            </div>
          </div>

          {/* Comments History Grid */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
            <table className="admin-table" style={{ margin: 0 }}>
              <thead style={{ background: '#f1f5f9' }}>
                <tr>
                  <th style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'left' }}>Comments</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'left' }}>Date/Time</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'left' }}>Images</th>
                </tr>
              </thead>
              <tbody>
                {claim.comments.length > 0 ? (
                  [...claim.comments].reverse().map((comment) => (
                    <tr key={comment.id}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{comment.userName}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155' }}>{comment.comment}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{comment.timestamp}</td>
                      <td style={{ padding: '12px 16px' }}>
                        {comment.images && comment.images.length > 0 ? (
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {comment.images.map((img, idx) => (
                              <a href={img} target="_blank" rel="noreferrer" key={idx}>
                                <img
                                  src={img}
                                  alt="attachment"
                                  style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                />
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: '#cbd5e1', fontSize: '12px' }}>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '13px' }}>
                      No comments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
