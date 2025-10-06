# Authentication Debugging Guide

## 🔍 **Debugging "Invalid Credentials" Issue**

### **Steps to Debug:**

1. **Test Signup Process:**
   - Try signing up with a new email
   - Open browser DevTools (F12) → Console tab
   - Look for console logs during signup process
   - Check what gets logged about user creation and email confirmation

2. **Check Supabase Dashboard:**
   - Go to your Supabase dashboard
   - Navigate to **Authentication** → **Users**
   - Verify if users are being created
   - Check if users show "Email Confirmed" status

3. **Check Email Confirmation Settings:**
   - In Supabase dashboard → **Authentication** → **Settings**
   - Look for "Email confirmation" setting
   - If enabled, users must confirm email before login

4. **Test Login Process:**
   - Try logging in with credentials you just signed up with
   - Check console logs for detailed error messages
   - Look for specific error patterns

### **Common Issues & Solutions:**

#### **Issue 1: Email Confirmation Required**
**Symptoms:** Users created but can't login immediately
**Solution:** Either:
- Disable email confirmation in Supabase settings, OR
- Check email and click confirmation link before login

#### **Issue 2: Profile Creation Failing**
**Symptoms:** Auth user created but profile creation fails
**Check:** Console logs for "Profile creation error"
**Solution:** Ensure database schema is properly applied

#### **Issue 3: Wrong Database Function**
**Symptoms:** "Function create_user_profile does not exist"
**Solution:** Re-run the database schema SQL

### **Quick Test:**

1. **Sign up** with a test email (e.g., test@example.com)
2. **Check console** for any errors
3. **Check Supabase Users table** - is user there?
4. **Try login** with same credentials
5. **Check console** for login error details

### **Expected Console Logs:**

**During Signup:**
```
Starting signup process for: test@example.com
Auth signup result: { authData: {...}, authError: null }
User created: <user-id> Email confirmed: <timestamp or null>
Creating user profile...
Profile created successfully
```

**During Login:**
```
Attempting login for: test@example.com
Login result: { data: {...}, error: null }
Login successful for user: <user-id>
```

### **If Still Failing:**

**Check these in Supabase Dashboard:**
1. **Authentication** → **Settings** → **Email confirmation** (disable temporarily)
2. **Authentication** → **Users** → Verify user exists
3. **SQL Editor** → Check if `create_user_profile` function exists
4. **Database** → **Tables** → Check if tables exist with correct structure

**Try Manual Test:**
```sql
-- Test if function exists
SELECT * FROM information_schema.routines 
WHERE routine_name = 'create_user_profile';

-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'user_tabs', 'user_settings');
```