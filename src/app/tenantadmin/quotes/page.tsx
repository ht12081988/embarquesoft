'use client';

import React, { useState } from 'react';
import { Search, Eye, X, Image as ImageIcon, Reply } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface QuoteReply {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  images?: string[];
}

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  telephone: string;
  description: string;
  hasImage: boolean;
  date: string;
  estimatedShippingDateTime?: string;
  comments?: QuoteReply[];
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
    estimatedShippingDateTime: '2026-07-25 09:00 AM',
    comments: [
      {
        id: 'r1',
        userId: 'user1',
        userName: 'John Doe',
        comment: 'Thank you for the quote. Can you also include insurance?',
        timestamp: '2026-07-17 10:30 AM',
        images: [
          'https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG',
        ],
      },
      {
        id: 'r2',
        userId: 'admin1',
        userName: 'Tenant Admin',
        comment: 'Yes, insurance can be added. The cost would be $50.',
        timestamp: '2026-07-17 2:45 PM',
        images: [],
      },
    ],
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    telephone: '809-555-1234',
    description: 'Looking to ship a refrigerator and 3 medium boxes. Please see attached image of the boxes.',
    hasImage: true,
    date: '2026-07-15',
    comments: [
      {
        id: 'r3',
        userId: 'user2',
        userName: 'Maria Gonzalez',
        comment: 'I need this by Friday.',
        timestamp: '2026-07-16 9:15 AM',
        images: [
          'https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG',
          'https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG',
        ],
      },
    ],
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Smith',
    telephone: '305-999-8888',
    description: 'Quote for moving household items from Miami to Santiago.',
    hasImage: false,
    date: '2026-07-14',
    estimatedShippingDateTime: '2026-07-20 02:30 PM',
  },
];

// Mock initial replies
const initialReplies: Record<string, QuoteReply[]> = {
  '1': [
    {
      id: 'r1',
      userId: 'user1',
      userName: 'John Doe',
      comment: 'Thank you for the quote. Can you also include insurance?',
      timestamp: '2026-07-17 10:30 AM',
    },
    {
      id: 'r2',
      userId: 'admin1',
      userName: 'Tenant Admin',
      comment: 'Yes, insurance can be added. The cost would be $50.',
      timestamp: '2026-07-17 2:45 PM',
    },
  ],
  '2': [
    {
      id: 'r3',
      userId: 'user2',
      userName: 'Maria Gonzalez',
      comment: 'I need this by Friday.',
      timestamp: '2026-07-16 9:15 AM',
    },
  ],
};

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotesList, setQuotesList] = useState<Quote[]>(initialQuotes);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyQuote, setReplyQuote] = useState<Quote | null>(null);
  const [replyText, setReplyText] = useState('');
  const router = useRouter();

  const filteredQuotes = quotesList.filter(
    (quote) =>
      quote.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.telephone.includes(searchTerm)
  );

  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const handleReply = (quote: Quote) => {
    setReplyQuote(quote);
    setReplyText('');
    setShowReplyModal(true);
  };

  const handleCloseModal = () => {
    setSelectedQuote(null);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !replyQuote) return;

    const newReply: QuoteReply = {
      id: `r${Date.now()}`,
      userId: 'admin1',
      userName: 'Tenant Admin',
      comment: replyText.trim(),
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    };

    setQuotesList(prevQuotes =>
      prevQuotes.map(q =>
        q.id === replyQuote.id
          ? { ...q, comments: [...(q.comments || []), newReply] }
          : q
      )
    );

    setShowReplyModal(false);
    setReplyQuote(null);
    setReplyText('');
  };

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
                <th>Estimated Shipping</th>
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
                    <td>
                      {quote.estimatedShippingDateTime ? (
                        <span style={{ color: '#166534', fontWeight: 500 }}>
                          {quote.estimatedShippingDateTime}
                        </span>
                      ) : (
                        <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>Not set</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="admin-btn-icon" 
                        title="View Details"
                        onClick={() => handleViewDetails(quote)}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="admin-btn-icon" 
                        title="Reply"
                        onClick={() => handleReply(quote)}
                        style={{ marginLeft: '8px' }}
                      >
                        <Reply size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '30px' }}>
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

              {/* Comments Section */}
              {selectedQuote.comments && selectedQuote.comments.length > 0 && (
                <div>
                  <label className="admin-form-label" style={{ color: '#64748b' }}>Comments</label>
                  <div style={{ 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    maxHeight: '250px',
                    overflowY: 'auto'
                  }}>
                    <table className="admin-table" style={{ margin: 0 }}>
                      <thead style={{ background: '#f1f5f9' }}>
                        <tr>
                          <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left' }}>User</th>
                          <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left' }}>Comments</th>
                          <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left' }}>Date/Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedQuote.comments.map((comment, index) => (
                          <tr key={comment.id}>
                            <td style={{ padding: '10px', fontSize: '13px' }}>{comment.userName}</td>
                            <td style={{ padding: '10px', fontSize: '13px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={comment.comment}>
                              {comment.comment}
                            </td>
                            <td style={{ padding: '10px', fontSize: '13px' }}>{comment.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button 
                className="admin-btn"
                onClick={() => {
                  handleCloseModal();
                  handleReply(selectedQuote);
                }}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && replyQuote && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '500px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Reply to Quote</h3>
              <button 
                className="admin-btn-icon" 
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyQuote(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Original Quote:</div>
                <div style={{
                  background: '#f8fafc',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  color: '#334155',
                  marginTop: '4px',
                  lineHeight: '1.4'
                }}>
                  {replyQuote.description}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                <label className="admin-form-label" style={{ color: '#64748b', fontSize: '13px' }}>Your Comment</label>
                <textarea
                  className="admin-form-control"
                  rows={3}
                  placeholder="Type your comment here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              {/* Comments History Table */}
              <div>
                <label className="admin-form-label" style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                  Comments History
                </label>
                <div
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  <table className="admin-table" style={{ margin: 0 }}>
                    <thead style={{ background: '#f1f5f9' }}>
                      <tr>
                        <th style={{ padding: '8px 10px', fontSize: '11px', textAlign: 'left' }}>User</th>
                        <th style={{ padding: '8px 10px', fontSize: '11px', textAlign: 'left' }}>Comments</th>
                        <th style={{ padding: '8px 10px', fontSize: '11px', textAlign: 'left' }}>Date/Time</th>
                        <th style={{ padding: '8px 10px', fontSize: '11px', textAlign: 'left' }}>Images</th>
                      </tr>
                    </thead>
                    <tbody>
                      {replyQuote.comments && replyQuote.comments.length > 0 ? (
                        [...replyQuote.comments].reverse().map((reply) => (
                          <tr key={reply.id}>
                            <td style={{ padding: '8px 10px', fontSize: '12px', fontWeight: 500 }}>{reply.userName}</td>
                            <td
                              style={{
                                padding: '8px 10px',
                                fontSize: '12px',
                                maxWidth: '150px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                              title={reply.comment}
                            >
                              {reply.comment}
                            </td>
                            <td style={{ padding: '8px 10px', fontSize: '12px', color: '#64748b' }}>{reply.timestamp}</td>
                            <td style={{ padding: '8px 10px' }}>
                              {reply.images && reply.images.length > 0 ? (
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  {reply.images.map((img, idx) => (
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
                                <span style={{ color: '#cbd5e1', fontSize: '11px' }}>-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            style={{ textAlign: 'center', padding: '15px', fontSize: '12px', color: '#94a3b8' }}
                          >
                            No comments yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyQuote(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="admin-btn"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
