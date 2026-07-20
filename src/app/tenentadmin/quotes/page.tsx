'use client';

import React, { useState } from 'react';
import { Search, Eye, X, Image as ImageIcon } from 'lucide-react';

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  telephone: string;
  description: string;
  hasImage: boolean;
  date: string;
}

// Mock Data
const initialQuotes: Quote[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    telephone: '212-444-8574',
    description: 'I need a quote for shipping a 20ft container to Santo Domingo.',
    hasImage: true,
    date: '2026-07-16',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    telephone: '809-555-1234',
    description: 'Looking to ship a refrigerator and 3 medium boxes. Please see attached image of the boxes.',
    hasImage: true,
    date: '2026-07-15',
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Smith',
    telephone: '305-999-8888',
    description: 'Quote for moving household items from Miami to Santiago.',
    hasImage: false,
    date: '2026-07-14',
  },
];

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const filteredQuotes = initialQuotes.filter(
    (quote) =>
      quote.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.telephone.includes(searchTerm)
  );

  return (
    <div>
      <div className="admin-card-header">
        <h2 className="admin-card-title">Customer Quotes</h2>
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
              placeholder="Search by name or telephone..."
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Telephone</th>
                <th>Description</th>
                <th style={{ textAlign: 'center' }}>Attachment</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td>{quote.date}</td>
                    <td>{quote.firstName}</td>
                    <td>{quote.lastName}</td>
                    <td>{quote.telephone}</td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={quote.description}>
                      {quote.description}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {quote.hasImage ? (
                        <div style={{ display: 'inline-flex', padding: '4px 8px', background: '#f1f5f9', borderRadius: '4px', color: '#475569' }} title="Image Attached">
                          <ImageIcon size={16} />
                        </div>
                      ) : (
                        <span style={{ color: '#cbd5e1' }}>-</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="admin-btn-icon" 
                        title="View Details"
                        onClick={() => setSelectedQuote(quote)}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>
                    No quotes found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedQuote && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Quote Request Details</h3>
              <button 
                className="admin-btn-icon" 
                onClick={() => setSelectedQuote(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>First Name</label>
                  <div style={{ fontWeight: 500 }}>{selectedQuote.firstName}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Last Name</label>
                  <div style={{ fontWeight: 500 }}>{selectedQuote.lastName}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Telephone</label>
                  <div style={{ fontWeight: 500 }}>{selectedQuote.telephone}</div>
                </div>
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Date Submitted</label>
                  <div style={{ fontWeight: 500 }}>{selectedQuote.date}</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label className="admin-form-label" style={{ color: '#64748b' }}>Quote Description</label>
                <div style={{ 
                  background: '#f8fafc', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  lineHeight: '1.5',
                  minHeight: '100px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedQuote.description}
                </div>
              </div>

              {selectedQuote.hasImage && (
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Attached Image</label>
                  <div style={{ 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f1f5f9',
                    height: '200px'
                  }}>
                    <img 
                      src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7a?auto=format&fit=crop&q=80&w=800" 
                      alt="Quote Attachment" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              )}

            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelectedQuote(null)}
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
