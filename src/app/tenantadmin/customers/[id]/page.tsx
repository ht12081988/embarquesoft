'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Calendar, ChevronDown, Check, FileImage, PenTool, Edit2, Trash2, Copy, Mail, DollarSign, ChevronsUpDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import PaymentModal from './PaymentModal';

export default function EditCustomerPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState('Customer Details');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100%', paddingBottom: '40px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>Edit Customer</h1>
          <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', gap: '4px' }}>
            <Link href="/tenantadmin/customers" style={{ color: '#3b82f6', textDecoration: 'none' }}>Customer List</Link>
            <span>/</span>
            <span>Edit Customer</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#ef4444', marginTop: '4px' }}>
            <span>Customer TestType</span>
            <span>|</span>
            <span>47 W 13th St</span>
            <span>|</span>
            <span>+1 201-455-4565</span>
            <span>|</span>
            <span>Balance: $32</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
            Pickups
          </button>
          <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
            Invoice
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '24px', marginBottom: '24px' }}>
        {['Customer Details', 'Invoice', 'Payments', 'Shipto', 'Pickups', 'Pickup Address', 'Deposit'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '8px 0', 
              border: 'none', 
              backgroundColor: 'transparent', 
              color: activeTab === tab ? '#3b82f6' : '#64748b', 
              borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent', 
              fontWeight: activeTab === tab ? 600 : 500, 
              fontSize: '0.95rem', 
              cursor: 'pointer' 
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Customer Details' && (
        <>
          {/* Action Buttons Top */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '20px' }}>
            <button style={{ padding: '6px 20px', backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Cancel
            </button>
            <button style={{ padding: '6px 20px', backgroundColor: '#6366f1', border: 'none', color: 'white', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Update
            </button>
          </div>

      {/* Main Form Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Customer ID <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" value={id} readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Company
            </label>
            <input type="text" defaultValue="ABCD" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              First Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="Customer" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Last Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="TestType" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Cellphone Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ flex: 1, display: 'flex', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 12px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px' }}>🇺🇸</span>
                <span style={{ fontSize: '0.85rem', color: '#475569' }}>+1</span>
                <ChevronDown size={14} color="#94a3b8" />
              </div>
              <input type="text" defaultValue="201-455-4565" style={{ flex: 1, padding: '8px 12px', border: 'none', outline: 'none', color: '#1e293b' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Telephone Number
            </label>
            <div style={{ flex: 1, display: 'flex', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 12px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px' }}>🇺🇸</span>
                <span style={{ fontSize: '0.85rem', color: '#475569' }}>+1</span>
                <ChevronDown size={14} color="#94a3b8" />
              </div>
              <input type="text" defaultValue="201-555-0123" style={{ flex: 1, padding: '8px 12px', border: 'none', outline: 'none', color: '#1e293b' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="47 W 13th St" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Address 2
            </label>
            <input type="text" placeholder="Enter Address 2" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Apartment
            </label>
            <input type="text" placeholder="Enter APT" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              City <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="New York" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              State <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="NY" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Zip Code <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="10011" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Username <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="CTestType72" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Password
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="password" defaultValue="password123456789" style={{ width: '100%', padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
              <Eye size={16} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Confirm Password
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="password" defaultValue="password123456789" style={{ width: '100%', padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
              <Eye size={16} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Latitude <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="40.7362169" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Longitude <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input type="text" defaultValue="-73.9966079" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          {/* Signatures */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px', paddingTop: '8px' }}>
              Signature
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                <PenTool size={40} color="#94a3b8" />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <Eye size={18} color="#ef4444" cursor="pointer" />
                 <FileImage size={18} color="#64748b" cursor="pointer" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px', paddingTop: '8px' }}>
              Contract Signature
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                <PenTool size={40} color="#94a3b8" />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <Eye size={18} color="#ef4444" cursor="pointer" />
                 <FileImage size={18} color="#64748b" cursor="pointer" />
              </div>
            </div>
          </div>

        </div>


        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Website
            </label>
            <input type="text" placeholder="Enter Website Id" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Email
            </label>
            <input type="email" placeholder="Enter Email Id" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Agent Code
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <select style={{ width: '100%', padding: '8px 12px', appearance: 'none', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8', fontSize: '0.85rem' }}>
                <option>Search Agent Name</option>
              </select>
              <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Branch Name
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <select style={{ width: '100%', padding: '8px 12px', appearance: 'none', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b', fontSize: '0.85rem' }}>
                <option>BranchNew12</option>
              </select>
              <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Balance
            </label>
            <input type="text" defaultValue="32" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Last Sale Date
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" defaultValue="2026-08-04" readOnly style={{ width: '100%', padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
              <Calendar size={14} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Signature Date
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" placeholder="YYYY-DD-MM" style={{ width: '100%', padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
              <Calendar size={14} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Year to Date
            </label>
            <input type="text" defaultValue="0" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Last Sale Call Date
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" placeholder="YYYY-DD-MM" readOnly style={{ width: '100%', padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
              <Calendar size={14} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              ID Type
            </label>
            <div style={{ flex: 1, position: 'relative', display: 'flex', border: '1px solid #e2e8f0', borderRadius: '4px', backgroundColor: 'white' }}>
              <input type="text" defaultValue="dasd" style={{ flex: 1, padding: '8px 12px', border: 'none', outline: 'none', color: '#1e293b' }} />
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', gap: '4px' }}>
                 <span style={{ cursor: 'pointer', color: '#94a3b8', fontSize: '10px' }}>×</span>
                 <ChevronDown size={14} color="#64748b" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              License Id
            </label>
            <input type="text" defaultValue="asdasdsasdasdwevdd" style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              License Expiry Date
            </label>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" placeholder="YYYY-DD-MM" style={{ width: '100%', padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8' }} />
              <Calendar size={14} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
              Language
            </label>
            <div style={{ flex: 1, position: 'relative', display: 'flex', border: '1px solid #e2e8f0', borderRadius: '4px', backgroundColor: 'white' }}>
              <input type="text" defaultValue="Bolivia, Plurinational State Of - Castilian" style={{ flex: 1, padding: '8px 12px', border: 'none', outline: 'none', color: '#1e293b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} />
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', gap: '4px' }}>
                 <span style={{ cursor: 'pointer', color: '#94a3b8', fontSize: '10px' }}>×</span>
                 <ChevronDown size={14} color="#64748b" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px', paddingTop: '8px' }}>
              Write Comment
            </label>
            <textarea placeholder="Enter Write Comment" rows={3} style={{ flex: 1, padding: '8px 12px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px', paddingTop: '8px' }}>
              Read Comment
            </label>
            <textarea placeholder="Enter Read Comment" rows={3} readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#94a3b8', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px' }}>
            <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px', paddingTop: '8px' }}>
              License Picture
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8" cy="10" r="2" />
                  <path d="M8 16a3 3 0 0 1 3-3h1" />
                  <path d="M16 10h2" />
                  <path d="M16 14h2" />
                </svg>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <Eye size={18} color="#ef4444" cursor="pointer" />
                 <FileImage size={18} color="#64748b" cursor="pointer" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Points Summary Section */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Points Summary</h2>
          <div style={{ position: 'relative', width: '120px' }}>
            <select style={{ width: '100%', padding: '6px 12px', appearance: 'none', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none', color: '#1e293b', fontSize: '0.85rem' }}>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                Invoice Points
              </label>
              <input type="text" defaultValue="12,450" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                Remaining Earned <span style={{ fontSize: '0.75rem', fontWeight: 'normal', display: 'block', color: '#64748b' }}>(This Year)</span>
              </label>
              <input type="text" defaultValue="2,050" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                Points Earned <span style={{ fontSize: '0.75rem', fontWeight: 'normal', display: 'block', color: '#64748b' }}>(This Year)</span>
              </label>
              <input type="text" defaultValue="3,250" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '140px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                Points Redeemed <span style={{ fontSize: '0.75rem', fontWeight: 'normal', display: 'block', color: '#64748b' }}>(This Year)</span>
              </label>
              <input type="text" defaultValue="1,200" readOnly style={{ flex: 1, padding: '8px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', color: '#1e293b' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Configurations Section */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>Configurations</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Contract</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="contract" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="contract" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Text Cust</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="textCust" defaultChecked style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="textCust" style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Voice Call</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="voiceCall" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="voiceCall" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Cash Cust</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="cashCust" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="cashCust" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Is License Picture</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="isLicensePic" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="isLicensePic" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Active</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="active" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="active" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>No Service</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="noService" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="noService" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Call</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="call" defaultChecked style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="call" style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>Sales Call</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="salesCall" style={{ accentColor: '#3b82f6' }} /> Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                <input type="radio" name="salesCall" defaultChecked style={{ accentColor: '#3b82f6' }} /> No
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons Bottom */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '40px' }}>
        <button style={{ padding: '6px 20px', backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Cancel
        </button>
        <button style={{ padding: '6px 20px', backgroundColor: '#6366f1', border: 'none', color: 'white', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Update
        </button>
      </div>
      </>
      )}

      {activeTab === 'Invoice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 16px', borderRadius: '4px', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>
              Columns <ChevronDown size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', gap: '16px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1e293b' }}>Search</span>
            <input type="text" placeholder="Search" style={{ flex: 1, maxWidth: '300px', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none' }} />
            <div style={{ flex: 1 }} />
            <button style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 24px', borderRadius: '4px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
              Search
            </button>
            <button style={{ backgroundColor: '#fca5a5', color: '#991b1b', padding: '8px 24px', borderRadius: '4px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
              Clear
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <button style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 16px', borderRadius: '4px', border: 'none', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>All</button>
            <button style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '6px 16px', borderRadius: '4px', border: '1px solid #1e3a8a', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>Paid</button>
            <button style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '6px 16px', borderRadius: '4px', border: '1px solid #1e3a8a', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>Not Paid</button>
            <span style={{ color: '#1e3a8a', fontSize: '0.85rem', marginLeft: '8px', cursor: 'pointer', fontWeight: 500 }}>Print</span>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden', marginTop: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', color: '#1e3a8a', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px' }}>Consignee <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>Province <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>Date <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>Invoice ID <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>I-Amount <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>Balance <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>Container <ChevronsUpDown size={12} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 16px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cons: 'Rupali1212 Test', prov: 'JapanProvinceann', date: '07/03/2026', inv: 'TIV-000294', amt: '1,210.00', bal: '207.00', cont: '-' },
                  { cons: 'Rupali1212 Test', prov: 'JapanProvinceann', date: '06/04/2026', inv: 'TIV-000285', amt: '300.00', bal: '400.00', cont: '10' },
                  { cons: 'Rupali Test', prov: 'JapanProvinceann', date: '06/04/2026', inv: 'TIV-000284', amt: '0', bal: '0', cont: 'containerNew' },
                  { cons: 'Rupali1212 Test', prov: 'JapanProvinceann', date: '06/03/2026', inv: 'TIV-000283', amt: '0', bal: '0', cont: 'containerNew' },
                  { cons: 'Rupali1212 Test', prov: 'JapanProvinceann', date: '12/05/2025', inv: 'TIV-000060', amt: '10.00', bal: '10.00', cont: '001' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', color: '#334155' }}>
                    <td style={{ padding: '12px 16px' }}>{row.cons}</td>
                    <td style={{ padding: '12px 16px' }}>{row.prov}</td>
                    <td style={{ padding: '12px 16px' }}>{row.date}</td>
                    <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 'bold' }}>{row.inv}</td>
                    <td style={{ padding: '12px 16px' }}>{row.amt}</td>
                    <td style={{ padding: '12px 16px' }}>{row.bal}</td>
                    <td style={{ padding: '12px 16px' }}>{row.cont}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <DollarSign size={14} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setIsPaymentModalOpen(true)} />
                        <Copy size={14} color="#64748b" style={{ cursor: 'pointer' }} />
                        <Mail size={14} color="#64748b" style={{ cursor: 'pointer' }} />
                        <Edit2 size={14} color="#64748b" style={{ cursor: 'pointer' }} />
                        <Trash2 size={14} color="#64748b" style={{ cursor: 'pointer' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />

    </div>
  );
}
