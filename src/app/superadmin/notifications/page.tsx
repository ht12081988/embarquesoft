'use client';

import React, { useState } from 'react';
import { Plus, Search, Send, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  subject: string;
  sentDate: string;
  recipientCount: number;
}

export default function SuperAdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'System Maintenance', subject: 'Downtime scheduled for weekend', sentDate: '2026-07-26', recipientCount: 15420 },
    { id: '2', title: 'New Feature Update', subject: 'Version 2.0 is live!', sentDate: '2026-07-20', recipientCount: 15300 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    body: '',
  });

  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    notification.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({ title: '', subject: '', body: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: formData.title,
      subject: formData.subject,
      sentDate: new Date().toISOString().split('T')[0],
      recipientCount: 15450 // Mocked total of all tenants customers
    };
    setNotifications([newNotification, ...notifications]);
    closeModal();
    alert('Push notification sent successfully to all customers!');
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-card-title">Push Notifications (Super Admin)</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search notifications..." 
                className="admin-form-control"
                style={{ paddingLeft: '32px', width: '250px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
              <Send size={16} /> Send Notification
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Sent Date</th>
                <th>Recipients</th>
                </tr>
            </thead>
            <tbody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <tr key={notification.id}>
                    <td style={{ fontWeight: 500 }}>{notification.title}</td>
                    <td>{notification.subject}</td>
                    <td>{notification.sentDate}</td>
                    <td>
                      <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                        {notification.recipientCount.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No notifications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating Notification */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Compose Push Notification</h2>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', color: '#0369a1', fontSize: '13px' }}>
                  <strong>Note:</strong> This message will be sent to <strong>ALL</strong> customers across <strong>ALL</strong> tenants.
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Notification Title</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    placeholder="e.g. System Alert"
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Subject / Short Description</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    placeholder="Brief subject of the notification"
                    required 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Message Body</label>
                  <textarea 
                    className="admin-form-control" 
                    placeholder="Enter the full notification message here..."
                    required 
                    rows={4}
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={16} /> Broadcast Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
