# LumaPress - User Roles & Access System

## 🎭 User Roles & Permissions

### 👥 **Viewer (Not Logged In)**
**What they see:**
- ✅ Published blog posts (read-only)
- ✅ Individual post pages with comments (read-only)  
- ✅ Author profiles (public information)
- ✅ Login/Register forms
- ✅ Legal pages (Impressum, Privacy Policy, Terms)
- ❌ Cannot comment, create posts, or access dashboard

**Navigation:**
- Home, Login, Register, Legal Pages

### 👤 **User (Logged In)**
**What they see:**
- ✅ Everything viewers see, PLUS:
- ✅ Personal dashboard with their posts/drafts
- ✅ Post editor to create/edit their own content
- ✅ Comment on posts
- ✅ Personal settings page
- ✅ Profile management (avatar, bio, social links)
- ❌ Cannot edit others' posts or access admin features

**Navigation:**
- Home, Dashboard, Editor, Profile Settings, Logout

### 👑 **Admin**
**What they see:**
- ✅ Everything users see, PLUS:
- ✅ Admin dashboard with site analytics
- ✅ User management (view all users, change roles)
- ✅ Content moderation (edit/delete any post)
- ✅ Featured posts management
- ✅ Site settings and configuration
- ✅ Legal pages management

**Navigation:**
- All user navigation PLUS Admin Panel

## 🔐 **How to Login as Admin**

### Option 1: Database Direct
```javascript
// In MongoDB, update user role:
db.users.updateOne(
  { email: "admin@ese-tech.com" },
  { $set: { role: "admin" } }
)
```

### Option 2: Registration with Admin Code
- Register normally
- Use special admin code during registration
- Auto-assigns admin role

### Option 3: First User Auto-Admin
- First registered user automatically becomes admin
- All subsequent users are "user" role by default

## 🎨 **Improved Color Palette**

### Primary Colors
- **Brand Blue**: #2563EB (professional, trustworthy)
- **Brand Purple**: #7C3AED (creative, premium)
- **Success Green**: #059669 (positive actions)
- **Warning Orange**: #D97706 (alerts)
- **Error Red**: #DC2626 (warnings, errors)

### Neutral Colors
- **Text Dark**: #0F172A (main text)
- **Text Medium**: #475569 (secondary text)
- **Text Light**: #94A3B8 (muted text)
- **Background**: #FFFFFF (main background)
- **Surface**: #F8FAFC (cards, elevated elements)
- **Border**: #E2E8F0 (dividers, borders)

### Accent Colors
- **Soft Pink**: #F472B6 (feminine touch)
- **Soft Blue**: #60A5FA (links, buttons)
- **Soft Green**: #34D399 (success states)

## 🔒 **Password Reset Flow**

1. **Forgot Password Page**: Email input form
2. **Email Sent**: Confirmation message
3. **Reset Token**: Secure link sent to email
4. **New Password Form**: Secure password reset
5. **Success**: Redirect to login with success message

## 📄 **Legal Pages Required**

### For Ese-tech Germany:
1. **Impressum** (Legal Notice) - Required by German law
2. **Datenschutzerklärung** (Privacy Policy) - GDPR compliance
3. **Nutzungsbedingungen** (Terms of Service)
4. **Cookie-Richtlinie** (Cookie Policy)

---

**Next Steps**: Implement these features systematically!