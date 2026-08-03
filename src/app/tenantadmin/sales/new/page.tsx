'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Save, X, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function TenantAdminNewSalePage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    price: '',
  });

  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    router.push('/tenantadmin/sales');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>Add Sale Item</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Create a new item listing for the marketplace.</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="admin-card" style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* Left Column: Image */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Image (Limit 1) <span style={{ color: '#ef4444' }}>*</span></label>
                {image ? (
                  <div style={{ position: 'relative', width: '100%', height: '154px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      type="button" 
                      onClick={handleRemoveImage}
                      style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '154px', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#f8fafc' }}>
                    <ImageIcon size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Click to upload an image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                )}
              </div>

              {/* Right Column: Category & Price */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Category <span style={{ color: '#ef4444' }}>*</span></label>
                  <select 
                    required
                    className="admin-form-control"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    style={{ height: '40px', padding: '0 12px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Price ($) <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontWeight: 500 }}>$</span>
                    <input 
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      className="admin-form-control"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      style={{ height: '40px', padding: '0 12px 0 28px', width: '100%', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Section - Full Width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Description <span style={{ color: '#ef4444' }}>*</span></label>
              <textarea 
                required
                rows={5}
                placeholder="Enter detailed description of the item..."
                className="admin-form-control"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', resize: 'vertical', width: '100%' }}
              />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', marginTop: '10px' }}>
            <Link href="/tenantadmin/sales">
              <button type="button" className="admin-btn admin-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <X size={16} />
                Cancel
              </button>
            </Link>
            <button type="submit" className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={16} />
              Save Item
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
