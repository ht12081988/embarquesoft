# EmbarqueSoft Mobile App - Business Rules Document

## 1. Login Screen
### Previous Screen: 
- Splash/Launch
### Description: 
- User authenticates to access the mobile application.
### Pre-condition:
- User must have an active registered account (Tenant or Customer).
### Business Rules:
- **Mobile Number**: Mandatory field. Must accept a valid mobile number format.
- **Password**: Mandatory field. Alphanumeric, hidden by default with a toggle to view.
- **Validation**: System must validate credentials against the backend. If incorrect, display an appropriate error message.
### Actions:
1. **Log In**: Submits credentials for authentication.
2. **Forgot Password?**: Redirects to password recovery flow.
3. **Create Account**: Redirects to user registration screen.
### Post-condition:
- On success, user session is created and navigated to the Home screen.
### Next Screen:
- Home (Overview)

## 2. Create Account Screen
### Previous Screen: 
- Login Screen
### Description: 
- Allows new users to register and create a customer account.
### Pre-condition:
- User clicked "Create Account" on the login screen.
### Business Rules:
- **First Name**: Mandatory field. Alphabetic characters only. Used for personalization.
- **Last Name**: Mandatory field. Alphabetic characters only.
- **Email Address**: Mandatory field. Must be a valid email format. This will act as the user's login ID and must be unique in the system.
- **Phone Number**: Mandatory field. Must accept international format. Used for SMS updates.
- **Password**: Mandatory field. Minimum 8 characters, must contain at least one uppercase letter, one number, and one special character.
- **Confirm Password**: Mandatory field. Must exactly match the Password field.
- **Terms & Conditions**: Mandatory checkbox. User must accept before submitting.
### Actions:
1. **Sign Up**: Validates all fields, creates the account, and triggers an OTP verification code.
2. **Back to Login**: Cancels registration and returns to Login.
### Post-condition:
- User account is created in a pending/unverified state.
### Next Screen:
- Verify OTP Screen

## 3. Verify OTP Screen
### Previous Screen: 
- Create Account or Forgot Password
### Description: 
- Verifies the user's identity via a One-Time Password sent to their Email or Phone Number.
### Pre-condition:
- User has submitted a registration form or requested a password reset.
### Business Rules:
- **OTP Input**: Mandatory field. Must accept exactly 4 to 6 numeric digits depending on backend configuration.
- **Expiration**: The OTP should expire after a set time (e.g., 5 minutes). A countdown timer should be visible.
### Actions:
1. **Verify**: Submits the entered OTP to the backend. If correct, marks the account as verified or allows password reset.
2. **Resend Code**: Requests a new OTP to be sent. Should have a cooldown period (e.g., 60 seconds) to prevent spam.
### Post-condition:
- Account is marked as verified, or user is authorized to reset their password.
### Next Screen:
- Home (if verifying registration) or Reset Password (if forgot password).

## 4. Forgot Password Screen
### Previous Screen: 
- Login Screen
### Description: 
- Allows users to request a password reset link if they have forgotten their credentials.
### Pre-condition:
- User clicked "Forgot Password?" on the login screen.
### Business Rules:
- **Email Address**: Mandatory field. Must be a valid email format. System will verify if the email exists in the database.
### Actions:
1. **Send Reset Code**: Submits the request. If email exists, sends an OTP to the user's email.
2. **Back to Login**: Returns user to the Login screen.
### Post-condition:
- An OTP is queued for delivery.
### Next Screen:
- Verify OTP Screen

## 5. Home / Overview Screen
### Previous Screen: 
- Login / Verify OTP
### Description: 
- Dashboard providing a summary of account activities, quick actions, and contact information.
### Pre-condition:
- User is successfully logged in.
### Business Rules:
- **Dashboard Stats**: Displays numeric summaries for Pickups, Packages, Invoices, and Ship Tos. These values must reflect real-time backend data for the logged-in user.
- **Special Deals**: Carousel displaying active promotions (Title, Expiry Date, and Image). If no deals are active, section is hidden or shows a placeholder.
- **Contact Info**: Displays static/dynamic phone numbers for US and RD branches. Clicking a number initiates a phone call.
### Actions:
1. **Tap Stat Card**: Navigates to the respective list screen (e.g., tapping Invoices navigates to Invoice List).
2. **Tap Deal**: Navigates to the specific deal detail or external link.
3. **Tap Phone Number**: Opens device dialer.
4. **Bottom Nav (Overview, Pickup, Profile)**: Navigates to primary app sections.
### Post-condition:
- None.
### Next Screen:
- Invoice List, Schedule Pickup List, Profile, etc.

## 6. Invoice List
### Previous Screen: 
- Home / Overview
### Description: 
- User can view, search, and filter all their invoices.
### Pre-condition:
- User clicked on Invoices from the dashboard.
### Business Rules:
- **List Display**: Shows all invoices associated with the user account, sorted by date (newest first).
- **Search**: User can search invoices by Invoice Number or Customer Name.
- **Card Data**: Each card displays:
  - Invoice Number (with light purple background and icon)
  - Ship To Name
  - Invoice Date
  - Province
  - Total Amount
  - Balance Due
  - Payment Status Badge (e.g., Unpaid, Paid)
### Actions:
1. **Search Input**: Filters the list in real-time.
2. **Tap Invoice Card**: Navigates to the Invoice Detail screen.
3. **Back Arrow**: Returns to Home.
### Post-condition:
- None.
### Next Screen:
- Invoice Detail

## 7. Invoice Detail
### Previous Screen: 
- Invoice List
### Description: 
- User views the detailed breakdown of a specific invoice.
### Pre-condition:
- User clicked on an invoice from the list.
### Business Rules:
- **Invoice Information**: Displays Invoice ID, Date, and current Status.
- **Sender/Receiver Details**: Displays full address and contact info for both parties.
- **Line Items**: Lists all packages/items included in the invoice with individual weights and prices.
- **Totals Summary**: Displays subtotal, taxes, fees, and final Balance Due.
### Actions:
1. **Download/Share**: Generates and downloads a PDF copy of the invoice.
2. **Back Arrow**: Returns to Invoice List.
### Post-condition:
- None.
### Next Screen:
- Remains on Invoice Detail

## 8. Schedule Pickup (List)
### Previous Screen: 
- Home / Overview
### Description: 
- User views their list of requested and scheduled pickups.
### Pre-condition:
- User clicked on Pickups from the bottom nav or dashboard stat.
### Business Rules:
- **List Display**: Shows all pickups associated with the user account.
- **Search**: Searchable by pickup ID or recipient name.
- **Card Data**: Each pickup displays ID, Status (Pending, Scheduled, Completed), Requested Date, Recipient Name, and Address.
### Actions:
1. **Search Input**: Filters the list in real-time.
2. **+ New**: Navigates to Create Schedule Pickup screen.
3. **Tap Card**: Navigates to pickup details (if applicable).
### Post-condition:
- None.
### Next Screen:
- Create Schedule Pickup

## 9. Create Schedule Pickup
### Previous Screen: 
- Schedule Pickup List
### Description: 
- Allows user to create a new pickup request.
### Pre-condition:
- User clicked "+ New" from the Schedule Pickup screen.
### Business Rules:
- **Recipient Name**: Mandatory field. Text input for the person receiving the pickup.
- **Pickup Address**: Mandatory field. Text input or location search for the pickup location.
- **Phone Number**: Mandatory field. Standard phone formatting.
- **Preferred Date**: Mandatory field. Date picker. Cannot be in the past.
- **Time Slot**: Mandatory field. Dropdown for selecting morning/afternoon/evening slots.
- **Number of Boxes**: Optional field. Numeric. Helps estimate truck capacity.
- **Special Notes**: Optional field. Text area for gate codes or specific pickup instructions.
### Actions:
1. **Schedule**: Validates all fields and submits the pickup request to the backend.
2. **Cancel/Back**: Discards changes and returns to previous screen.
### Post-condition:
- New pickup is created with a "Pending" status.
### Next Screen:
- Schedule Pickup List

## 10. Ship To List
### Previous Screen: 
- Home / Overview
### Description: 
- Displays a list of all recipient addresses (Ship Tos) saved by the user.
### Pre-condition:
- User clicked on Ship To from dashboard.
### Business Rules:
- **List Display**: Displays Name, Full Address, and Phone for each saved address.
- **Search**: Filterable by Name or Address.
### Actions:
1. **Search Input**: Filters the list in real-time.
2. **+ New**: Navigates to Create Ship To screen.
### Post-condition:
- None.
### Next Screen:
- Create Ship To

## 11. Create Ship To
### Previous Screen: 
- Ship To List
### Description: 
- Allows the user to add a new recipient address.
### Pre-condition:
- User clicked "+ New" on the Ship To list screen.
### Business Rules:
- **First Name**: Mandatory field. Alphabetic.
- **Last Name**: Mandatory field. Alphabetic.
- **Address Line 1**: Mandatory field. Text input.
- **City**: Mandatory field. Text input.
- **State/Province**: Mandatory field. Dropdown or text input.
- **Zip/Postal Code**: Mandatory field. Alphanumeric.
- **Phone Number**: Mandatory field. Standard phone formatting.
- **Email**: Optional field. Valid email format.
### Actions:
1. **Save Recipient**: Validates fields and saves the recipient to the user's address book.
2. **Cancel/Back**: Discards changes.
### Post-condition:
- New Ship To record is added to the database.
### Next Screen:
- Ship To List

## 12. Claims List
### Previous Screen: 
- Home / Overview
### Description: 
- User can track the status of reported issues or claims regarding shipments.
### Pre-condition:
- User clicked on Claims from dashboard.
### Business Rules:
- **List Display**: Displays Claim ID, Date Filed, Subject, and Status (Pending, Investigating, Resolved, Rejected).
- **Search**: Filterable by Claim ID or Subject.
### Actions:
1. **Search Input**: Filters the list in real-time.
2. **+ New**: Navigates to Create Claim screen.
### Post-condition:
- None.
### Next Screen:
- Create Claim

## 13. Create Claim
### Previous Screen: 
- Claims List
### Description: 
- Allows the user to file a new issue or claim regarding a specific invoice or shipment.
### Pre-condition:
- User clicked "+ New" on the Claims List.
### Business Rules:
- **Invoice Number**: Mandatory field. Text input or dropdown to link the claim to an existing invoice/shipment.
- **Claim Subject**: Mandatory field. Short description (e.g., "Missing Box", "Damaged Item"). Max 100 characters.
- **Detailed Description**: Mandatory field. Text area explaining the issue in detail.
- **Attachment**: Optional field. File upload (Image/PDF) to provide proof of damage or receipts.
### Actions:
1. **Submit Claim**: Validates fields, creates the claim ticket, and sends a notification to the administration team.
2. **Cancel/Back**: Discards the form.
### Post-condition:
- Claim is created with status "Pending".
### Next Screen:
- Claims List

## 14. Locations
### Previous Screen: 
- Home / Overview
### Description: 
- Displays a map and list of physical branch locations or drop-off points.
### Pre-condition:
- User clicked on Locations from dashboard.
### Business Rules:
- **List Display**: Shows branch name, address, operating hours, and contact information.
- **Map View**: Optionally displays pins for each location on a map.
### Actions:
1. **Get Directions**: Redirects to native map application (Apple Maps/Google Maps).
2. **Call Branch**: Initiates a phone call to the selected location.
### Post-condition:
- None.
### Next Screen:
- Native Maps app or Dialer.

## 15. Profile Settings
### Previous Screen: 
- Any (via Bottom Nav)
### Description: 
- Manage user account details and app preferences.
### Pre-condition:
- User clicked Profile on the bottom navigation.
### Business Rules:
- **Display Data**: Shows logged-in user's Name, Email, Phone, and Account Type.
- **Settings Options**: Links to Edit Profile, Change Password, Notification Settings, and Terms of Service.
### Actions:
1. **Edit Profile**: Navigates to a form to update contact information.
2. **Logout**: Clears session token and returns to Login.
### Post-condition:
- If logged out, session is destroyed locally and on the server.
### Next Screen:
- Login (if logged out)

## 16. Notifications
### Previous Screen: 
- Any (via Bell Icon)
### Description: 
- Displays alerts, status updates, and broadcast messages.
### Pre-condition:
- User clicked the Bell icon from the header.
### Business Rules:
- **List Display**: Shows notifications ordered chronologically. Unread notifications have a distinct visual style (e.g., light blue background tint, active blue dot indicator).
- **Badge**: The bell icon on other screens displays a numeric count of unread notifications.
### Actions:
1. **Mark as Read/Unread**: Tapping the icon on a notification toggles it between read and unread.
2. **Mark All as Read**: Action button in header to clear all unread statuses.
### Post-condition:
- Notification status updated in the database. Unread count decreases.
### Next Screen:
- Remains on Notifications
