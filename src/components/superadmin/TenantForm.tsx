'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';

interface TenantFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function TenantForm({ initialData, isEditing = false }: TenantFormProps) {
  const [formData, setFormData] = useState<any>(initialData || {
    tenantId: 'TEN-000206',
    tenantName: '',
    emailId: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    cellNumber: '',
    telephoneNumber: '',
    officeNumber: '',
    website: '',
    tracking: 'No',
    tax: '1',
    userName: '',
    active: true,
    timeFormat: '24 hours',
    terms: true,
    enableGlobalDeals: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const PhoneInputMock = ({ name, value, label }: { name: string, value: string, label: string }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
      <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>{label}<span style={{ color: 'red' }}>*</span></label>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid var(--admin-border)', borderRight: 'none', padding: '0 8px', borderRadius: '4px 0 0 4px', fontSize: '0.875rem' }}>
          🇺🇸 +1 ▾
        </div>
        <input 
          type="text" 
          name={name}
          value={value}
          onChange={handleChange}
          className="admin-form-control" 
          style={{ borderRadius: '0 4px 4px 0' }}
        />
      </div>
    </div>
  );

  const InputRow = ({ label, name, type = "text", required = false, value, readOnly = false, isPassword = false }: any) => (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
      <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>{label}{required && <span style={{ color: 'red' }}>*</span>}</label>
      <div style={{ position: 'relative' }}>
        <input 
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          className="admin-form-control"
          style={{ backgroundColor: readOnly ? '#f1f5f9' : 'white' }}
        />
        {isPassword && (
          <Eye size={16} color="#64748b" style={{ position: 'absolute', right: '12px', top: '10px', cursor: 'pointer' }} />
        )}
      </div>
    </div>
  );

  return (
    <div className="admin-card" style={{ padding: '0' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--admin-border)' }}>
        <h1 className="admin-card-title">{isEditing ? 'Edit Tenant' : 'Add Tenant'}</h1>
        <div style={{ fontSize: '0.875rem', color: 'var(--admin-primary)', marginTop: '4px' }}>
          Tenant / {isEditing ? 'Edit Tenant' : 'Add Tenant'}
        </div>
      </div>
      
      <form style={{ padding: '32px' }} onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          
          {/* Left Column */}
          <div>
            <InputRow label="Tenant ID" name="tenantId" value={formData.tenantId} required readOnly />
            <InputRow label="Tenant Name" name="tenantName" value={formData.tenantName} required />
            <InputRow label="Email ID" name="emailId" value={formData.emailId} required />
            <InputRow label="Address 1" name="address1" value={formData.address1} required />
            <InputRow label="Address 2" name="address2" value={formData.address2} />
            <InputRow label="Country" name="country" value={formData.country} required />
            <InputRow label="City" name="city" value={formData.city} required />
            <InputRow label="State" name="state" value={formData.state} required />
            <InputRow label="Zip" name="zip" value={formData.zip} required />
            <InputRow label="Password" name="password" type="password" value={formData.password} isPassword />
            <InputRow label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} isPassword />
          </div>

          {/* Right Column */}
          <div>
            <PhoneInputMock label="Cell Number" name="cellNumber" value={formData.cellNumber} />
            <PhoneInputMock label="Telephone Number" name="telephoneNumber" value={formData.telephoneNumber} />
            <PhoneInputMock label="Office Number" name="officeNumber" value={formData.officeNumber} />
            
            <InputRow label="Website" name="website" value={formData.website} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>Tracking</label>
              <select name="tracking" value={formData.tracking} onChange={handleChange} className="admin-form-control">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <InputRow label="Tax(%)" name="tax" value={formData.tax} required />
            <InputRow label="User Name" name="userName" value={formData.userName} required readOnly />

            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>Active</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="checkbox" 
                  name="active" 
                  checked={formData.active} 
                  onChange={handleChange}
                  style={{ width: '16px', height: '16px', accentColor: '#2d338a', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>Time Format<span style={{ color: 'red' }}>*</span></label>
              <select name="timeFormat" value={formData.timeFormat} onChange={handleChange} className="admin-form-control">
                <option value="24 hours">24 hours</option>
                <option value="12 hours">12 hours</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>Terms and<br/>Conditions</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="checkbox" 
                  name="terms" 
                  checked={formData.terms} 
                  onChange={handleChange}
                  style={{ width: '16px', height: '16px', accentColor: '#2d338a', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ textAlign: 'right', paddingRight: '16px', fontSize: '0.875rem' }}>Enable Global Deals</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="checkbox" 
                  name="enableGlobalDeals" 
                  checked={formData.enableGlobalDeals || false} 
                  onChange={handleChange}
                  style={{ width: '16px', height: '16px', accentColor: '#2d338a', cursor: 'pointer' }}
                />
              </div>
            </div>

          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid var(--admin-border)', paddingTop: '24px' }}>
          <Link href="/superadmin/tenants" className="admin-btn admin-btn-secondary" style={{ textDecoration: 'none' }}>Cancel</Link>
          <button type="submit" className="admin-btn" style={{ backgroundColor: '#6c6f9e', color: 'white' }}>Save</button>
        </div>
      </form>
    </div>
  );
}
