'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Reply, Image as ImageIcon, Camera } from 'lucide-react';
import Link from 'next/link';

interface QuoteReply {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
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
const quotes: Quote[] = [
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
      },
      {
        id: 'r2',
        userId: 'admin1',
        userName: 'Tenant Admin',
        comment: 'Yes, insurance can be added. The cost would be $50.',
        timestamp: '2026-07-17 2:45 PM',
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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ReplyQuotePage({ params }: PageProps) {
  const router = useRouter();
  const { id: quoteId } = React.use(params);
  const quote = quotes.find((q) => q.id === quoteId);

  const [replyText, setReplyText] = useState('');
  const [quoteReplies, setQuoteReplies] = useState<Record<string, QuoteReply[]>>(initialReplies);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!quote) {
    return (
      <div>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Quote Reply</h2>
        </div>
        <div className="admin-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Quote not found.</p>
          <Link href="/tenantadmin/quotes" className="admin-btn admin-btn-secondary" style={{ marginTop: '20px' }}>
            Back to Quotes
          </Link>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleTakePicture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // Wait for video to be ready
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(dataUrl);
      
      // Convert data URL to blob for file handling
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      setImageFile(file);
      
      // Stop video stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please use upload instead.');
    }
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendReply = () => {
    if (replyText.trim() || selectedImage) {
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
      setQuoteReplies((prev) => ({
        ...prev,
        [quote.id]: [...(prev[quote.id] || []), newReply],
      }));
      setReplyText('');
      setSelectedImage(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      router.back();
    }
  };

  return (
    <div>
      <div className="admin-card-header">
        <h2 className="admin-card-title">Reply to Quote</h2>
        <button className="admin-btn-icon" onClick={handleBack} title="Back">
          <X size={20} />
        </button>
      </div>

      <div className="admin-card">
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>
            <strong>{quote.firstName} {quote.lastName}</strong>
          </div>
          <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>
            {quote.telephone} | {quote.date}
          </div>
          <div
            style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            {quote.description}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label className="admin-form-label" style={{ color: '#64748b' }}>
            Your Reply
          </label>
          <textarea
            className="admin-form-control"
            rows={4}
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ resize: 'vertical', minHeight: '100px' }}
          />
        </div>

        {selectedImage && (
          <div style={{ marginBottom: '20px' }}>
            <label className="admin-form-label" style={{ color: '#64748b' }}>
              Attached Image
            </label>
            <div
              style={{
                position: 'relative',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f1f5f9',
                height: '200px',
              }}
            >
              <img
                src={selectedImage}
                alt="Attachment preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                className="admin-btn-icon"
                onClick={handleRemoveImage}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  padding: '4px',
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label className="admin-form-label" style={{ color: '#64748b' }}>
            Attach Image
          </label>
          <div
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              background: '#f8fafc',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file && file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
                setImageFile(file);
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTakePicture();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: '#e0f2fe',
                  border: '1px solid #7dd3fc',
                  borderRadius: '6px',
                  color: '#0ea5e9',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <Camera size={16} />
                Take Picture
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#475569',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <ImageIcon size={16} />
                Upload Image
              </button>
            </div>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8' }}>
              Drag & drop or click to browse
            </p>
          </div>
        </div>

        <div>
          <label className="admin-form-label" style={{ color: '#64748b' }}>
            Comments
          </label>
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              overflow: 'hidden',
              maxHeight: '250px',
              overflowY: 'auto',
            }}
          >
            <table className="admin-table" style={{ margin: 0 }}>
              <thead style={{ background: '#f1f5f9' }}>
                <tr>
                  <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left' }}>Comments</th>
                  <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left' }}>Date/Time</th>
                  <th style={{ padding: '10px', fontSize: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quoteReplies[quote.id]?.length > 0 ? (
                  quoteReplies[quote.id]?.map((reply) => (
                    <tr key={reply.id}>
                      <td style={{ padding: '10px', fontSize: '13px' }}>{reply.userName}</td>
                      <td
                        style={{
                          padding: '10px',
                          fontSize: '13px',
                          maxWidth: '200px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={reply.comment}
                      >
                        {reply.comment}
                      </td>
                      <td style={{ padding: '10px', fontSize: '13px' }}>{reply.timestamp}</td>
                      <td style={{ padding: '10px', fontSize: '13px', textAlign: 'center' }}>
                        <button
                          className="admin-btn-icon"
                          title="Reply"
                          onClick={() => setReplyText(`Re: ${reply.comment}`)}
                        >
                          <Reply size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: 'center', padding: '20px', fontSize: '13px', color: '#94a3b8' }}
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

      <div className="admin-card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button className="admin-btn admin-btn-secondary" onClick={handleBack}>
          Cancel
        </button>
        <button 
          className="admin-btn" 
          disabled={!replyText.trim() && !selectedImage} 
          onClick={handleSendReply}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
