'use client';

import React, { useState } from 'react';
import { Plus, Search, X, Users } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  subject: string;
  sentDate: string;
  recipientsCount: number;
}

export default function PushNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Maintenance Window', subject: 'System downtime this weekend', sentDate: '2026-07-10 14:30', recipientsCount: 1500 },
    { id: '2', title: 'New Deal Available!', subject: 'Check out the summer special', sentDate: '2026-07-12 09:00', recipientsCount: 850 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    selectAll: false,
    selectedCustomers: [] as string[]
  });

  // Mock customers list
  const customers = [
    { id: 'c1', name: 'John Doe' },
    { id: 'c2', name: 'Jane Smith' },
    { id: 'c3', name: 'Michael Johnson' },
    { id: 'c4', name: 'Emily Davis' },
    { id: 'c5', name: 'William Brown' },
  ];

  const filteredNotifications = notifications.filter(notif => 
    notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    notif.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({ title: '', subject: '', selectAll: false, selectedCustomers: [] });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipientsCount = formData.selectAll ? customers.length : formData.selectedCustomers.length;
    
    if (recipientsCount === 0) {
      alert("Please select at least one customer.");
      return;
    }

    setNotifications([
      { 
        id: Date.now().toString(),
        title: formData.title,
        subject: formData.subject,
        sentDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
        recipientsCount
      },
      ...notifications
    ]);
    closeModal();
  };

  const handleCustomerToggle = (customerId: string) => {
    setFormData(prev => {
      const selected = prev.selectedCustomers.includes(customerId)
        ? prev.selectedCustomers.filter(id => id !== customerId)
        : [...prev.selectedCustomers, customerId];
      
      return {
        ...prev,
        selectedCustomers: selected,
        selectAll: selected.length === customers.length
      };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectAll: checked,
      selectedCustomers: checked ? customers.map(c => c.id) : []
    }));
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-card-title">Push Notifications</h1>
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
              <Plus size={16} /> Send Notification
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
                filteredNotifications.map(notif => (
                  <tr key={notif.id}>
                    <td style={{ fontWeight: 500 }}>{notif.title}</td>
                    <td>{notif.subject}</td>
                    <td>{notif.sentDate}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={14} color="#64748b" />
                        {notif.recipientsCount}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No notifications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Create Push Notification</h2>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Title</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Subject</label>
                  <textarea 
                    className="admin-form-control" 
                    required 
                    rows={4}
                    style={{ resize: 'vertical' }}
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label" style={{ marginBottom: '10px' }}>Select Customers</label>
                  
                  <div style={{ padding: '12px', border: '1px solid var(--admin-border)', borderRadius: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '10px', borderBottom: '1px solid var(--admin-border)', marginBottom: '10px' }}>
                      <input 
                        type="checkbox" 
                        id="selectAll"
                        checked={formData.selectAll}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                      <label htmlFor="selectAll" style={{ fontWeight: 600 }}>Select All Customers</label>
                    </div>
                    
                    {customers.map(customer => (
                      <div key={customer.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0' }}>
                        <input 
                          type="checkbox" 
                          id={`customer-${customer.id}`}
                          checked={formData.selectedCustomers.includes(customer.id)}
                          onChange={() => handleCustomerToggle(customer.id)}
                        />
                        <label htmlFor={`customer-${customer.id}`}>{customer.name}</label>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.8rem', marginTop: '6px', color: '#64748b' }}>
                    {formData.selectAll ? 'All customers selected' : `${formData.selectedCustomers.length} customers selected`}
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
