import React from 'react';
import { X, ChevronDown, ChevronsUpDown } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '1000px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1e293b', margin: 0 }}>Payment</h2>
          <X size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          
          {/* Form Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '24px' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Date <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                  <input type="date" defaultValue="2026-04-07" style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none' }} />
                  <input type="text" defaultValue="04:43 PM" style={{ width: '90px', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Personal
                </label>
                <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', appearance: 'none', backgroundColor: 'white' }}>
                  <option>Sneha Chanekar C12</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  User <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" defaultValue="Sneha Chanekar C12" readOnly style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', backgroundColor: '#f8fafc' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Currency <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', appearance: 'none', backgroundColor: 'white' }}>
                  <option>USA - USD</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Payment Type <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', appearance: 'none', backgroundColor: 'white' }}>
                  <option>Select Payment Type</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Payment Amount <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" placeholder="Enter Payment Amount" style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Reference
                </label>
                <input type="text" placeholder="Enter Reference" style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <label style={{ width: '120px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px', paddingTop: '8px' }}>
                  Comment
                </label>
                <textarea placeholder="Enter Comment" rows={3} style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Invoice Amount <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" defaultValue="1540.00" readOnly style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', backgroundColor: '#f1f5f9' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Total Balance <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" defaultValue="637.00" readOnly style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', backgroundColor: '#f1f5f9' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Applied Payments <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" placeholder="Enter Applied Payments" readOnly style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', backgroundColor: '#f1f5f9' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Current Balance <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" placeholder="Enter Current Balance" readOnly style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', backgroundColor: '#f1f5f9' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '130px', fontSize: '0.85rem', color: '#1e293b', fontWeight: 500, textAlign: 'right', paddingRight: '16px' }}>
                  Exchange Rate <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" defaultValue="1" readOnly style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', backgroundColor: '#f1f5f9' }} />
              </div>

              {/* Push buttons to the bottom right of the right column */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'auto', paddingTop: '40px' }}>
                <button style={{ padding: '6px 20px', backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }} onClick={onClose}>
                  Cancel
                </button>
                <button style={{ padding: '6px 20px', backgroundColor: '#1e3a8a', border: 'none', color: 'white', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Save
                </button>
              </div>

            </div>
          </div>

          {/* Table */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ color: '#1e3a8a', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 12px' }}>Invoice ID <ChevronsUpDown size={12} style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 12px' }}>User</th>
                  <th style={{ padding: '12px 12px' }}>Customer</th>
                  <th style={{ padding: '12px 12px' }}>Invoice Date <ChevronsUpDown size={12} style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 12px' }}>Inv. Amount <ChevronsUpDown size={12} style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 12px' }}>Inv. Ba... <ChevronsUpDown size={12} style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 12px' }}>Applied Amount <ChevronsUpDown size={12} style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }} /></th>
                  <th style={{ padding: '12px 12px' }}>Point</th>
                  <th style={{ padding: '12px 12px' }}>Payment Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'TIV-000294', user: 'Sneha Chan...', cust: 'ricardo11 Sinha', date: '07/03/2026, 15:24', amt: '1210', bal: '207.00' },
                  { id: 'TIV-000285', user: 'Sneha Chan...', cust: 'ricardo11 Sinha', date: '06/04/2026, 17:11', amt: '300', bal: '400.00' },
                  { id: 'TIV-000059', user: 'Sneha Chan...', cust: 'ricardo11 Sinha', date: '12/05/2025, 15:00', amt: '10', bal: '10.00' },
                  { id: 'TIV-000058', user: 'Sneha Chan...', cust: 'ricardo11 Sinha', date: '12/04/2025, 00:00', amt: '10', bal: '10.00' },
                  { id: 'TIV-000057', user: 'Sneha Chan...', cust: 'ricardo11 Sinha', date: '12/04/2025, 00:00', amt: '10', bal: '10.00' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', color: '#334155' }}>
                    <td style={{ padding: '12px 12px', color: '#3b82f6' }}>{row.id}</td>
                    <td style={{ padding: '12px 12px' }}>{row.user}</td>
                    <td style={{ padding: '12px 12px' }}>{row.cust}</td>
                    <td style={{ padding: '12px 12px' }}>{row.date}</td>
                    <td style={{ padding: '12px 12px' }}>{row.amt}</td>
                    <td style={{ padding: '12px 12px' }}>{row.bal}</td>
                    <td style={{ padding: '12px 12px' }}></td>
                    <td style={{ padding: '12px 12px' }}></td>
                    <td style={{ padding: '12px 12px' }}>
                      <button style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '4px 12px', borderRadius: '4px', border: 'none', fontWeight: 500, fontSize: '0.75rem', cursor: 'pointer' }}>Apply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              Showing 
              <select style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '4px 8px', outline: 'none' }}>
                <option>10</option>
              </select>
              per page
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Showing 1 to 5 out of 5 records</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>«</button>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>‹</button>
              <button style={{ border: 'none', backgroundColor: '#1e3a8a', color: 'white', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.8rem' }}>1</button>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>›</button>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>»</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
