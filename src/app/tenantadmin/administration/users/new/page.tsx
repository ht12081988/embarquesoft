'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { User, X } from 'lucide-react';

export default function EditUserPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>Edit User</h1>
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          <Link href="/tenantadmin/administration/users" style={{ color: '#2d338a', textDecoration: 'none' }}>User List</Link>
          {' / '}
          <span>Edit User</span>
        </div>
      </div>

      <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
        
        {/* User Information Section */}
        <div style={{ padding: '20px 24px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2d338a', borderBottom: '2px solid #2d338a', paddingBottom: '8px', display: 'inline-block', marginBottom: '24px' }}>User Information</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '40px', rowGap: '16px' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>User ID#</label>
                <input type="text" className="admin-form-control" value="TUS-000010" disabled style={{ backgroundColor: '#f1f5f9', color: '#475569' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>First Name<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" defaultValue="Esha" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Last Name<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" defaultValue="Test" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Email Id<span style={{color: '#ef4444'}}>*</span></label>
                <input type="email" className="admin-form-control" defaultValue="esha123@gmr.la" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Address 1<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" defaultValue="47 W 13th St" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Address 2</label>
                <input type="text" className="admin-form-control" placeholder="Enter Address 2" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>City<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" defaultValue="New York" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>State<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" defaultValue="NY" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Zipcode<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" defaultValue="10011" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>User Name<span style={{color: '#ef4444'}}>*</span></label>
                <input type="text" className="admin-form-control" value="esha123" disabled style={{ backgroundColor: '#f1f5f9', color: '#475569' }} />
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Telephone Number</label>
                <div style={{ display: 'flex', width: '100%' }}>
                  <select className="admin-form-control" style={{ width: '80px', borderRight: 'none', borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: '#f8fafc' }}>
                    <option>🇺🇸 +1</option>
                  </select>
                  <input type="text" className="admin-form-control" defaultValue="201-555-0123" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Cellphone Number<span style={{color: '#ef4444'}}>*</span></label>
                <div style={{ display: 'flex', width: '100%' }}>
                  <select className="admin-form-control" style={{ width: '80px', borderRight: 'none', borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: '#f8fafc' }}>
                    <option>🇺🇸 +1</option>
                  </select>
                  <input type="text" className="admin-form-control" defaultValue="201-555-1236" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Country<span style={{color: '#ef4444'}}>*</span></label>
                <select className="admin-form-control">
                  <option>United States</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Branch Name<span style={{color: '#ef4444'}}>*</span></label>
                <select className="admin-form-control">
                  <option>Branch20</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Warehouse<span style={{color: '#ef4444'}}>*</span></label>
                <select className="admin-form-control">
                  <option>WarehouseOne</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Password<span style={{color: '#ef4444'}}>*</span></label>
                <input type="password" className="admin-form-control" defaultValue="password" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>Confirm Password<span style={{color: '#ef4444'}}>*</span></label>
                <input type="password" className="admin-form-control" defaultValue="password" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px' }}>IP address</label>
                <input type="text" className="admin-form-control" placeholder="Enter IP address" />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <label style={{ width: '130px', fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', textAlign: 'right', paddingRight: '16px', marginTop: '8px' }}>Profile Photo</label>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div 
                      onClick={() => !profilePhoto && fileInputRef.current?.click()}
                      style={{ 
                        width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative',
                        cursor: profilePhoto ? 'default' : 'pointer'
                      }}
                      title={!profilePhoto ? "Upload Photo" : ""}
                    >
                      {profilePhoto ? (
                        <>
                          <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button 
                            type="button"
                            onClick={handleRemovePhoto}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s' }}
                            title="Remove Photo"
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                          >
                            <X size={24} color="#ef4444" style={{ backgroundColor: 'white', borderRadius: '50%', padding: '2px' }} />
                          </button>
                        </>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <User size={24} color="#94a3b8" />
                          <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500 }}>Upload</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Configurations Section */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #e2e8f0', marginTop: '16px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Configurations</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', rowGap: '32px' }}>
            
            {/* Driver */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Driver<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="driver" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="driver" defaultChecked /> No</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="driver" /> Both</label>
              </div>
            </div>

            {/* Can Login */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Can Login<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="login" defaultChecked /> Web</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="login" /> Mobile</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="login" /> Both</label>
              </div>
            </div>

            {/* Pickup Delivery */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Pickup Delivery<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="pd" defaultChecked /> P (Pickup)</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="pd" /> D (Delivery)</label>
              </div>
            </div>

            {/* Customer Pickup Only (Mobile) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Customer Pickup Only (Mobile)<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpom" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpom" defaultChecked /> No</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpom" /> All</label>
              </div>
            </div>

            {/* Customer Delivery Only (Mobile) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Customer Delivery Only (Mobile)<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cdom" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cdom" defaultChecked /> No</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cdom" /> All</label>
              </div>
            </div>

            {/* Add Pickups Mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Add Pickups Mobile<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="apm" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="apm" defaultChecked /> No</label>
              </div>
            </div>

            {/* Change Pickup Date (Mobile) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Change Pickup Date (Mobile)<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpdm" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpdm" defaultChecked /> No</label>
              </div>
            </div>

            {/* Can Print Ios Invoice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Can Print Ios Invoice<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpii" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="cpii" defaultChecked /> No</label>
              </div>
            </div>

            {/* User Branch Only */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>User Branch Only<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="ubo" defaultChecked /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="ubo" /> No</label>
              </div>
            </div>

            {/* Branch Customer Only */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Branch Customer Only<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bco" defaultChecked /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bco" /> No</label>
              </div>
            </div>

            {/* Petty Cash Branch Only */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Petty Cash Branch Only<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="pcbo" defaultChecked /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="pcbo" /> No</label>
              </div>
            </div>

            {/* Is Agent */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Is Agent<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="ia" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="ia" defaultChecked /> No</label>
              </div>
            </div>

            {/* Is Auto Deactive */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Is Auto Deactive<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="iad" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="iad" defaultChecked /> No</label>
              </div>
            </div>

            {/* Invoice Balance (Mobile) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Invoice Balance (Mobile)<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="ibm" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="ibm" defaultChecked /> No</label>
              </div>
            </div>

            {/* Direction (Route generation) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Direction (Route generation)<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="drg" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="drg" defaultChecked /> No</label>
              </div>
            </div>

            {/* Transportation Cost */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Transportation Cost<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="tc" /> Yes</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="tc" defaultChecked /> No</label>
              </div>
            </div>

            {/* Active */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Active</label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: '#2d338a' }} />
              </div>
            </div>

            {/* Lockout enabled */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Lockout enabled</label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#2d338a' }} />
              </div>
            </div>

            {/* Language */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Language<span style={{color: '#ef4444'}}>*</span></label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="lang" defaultChecked /> English</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="lang" /> Spanish</label>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="admin-btn admin-btn-secondary">
            Cancel
          </button>
          <button className="admin-btn admin-btn-primary">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
