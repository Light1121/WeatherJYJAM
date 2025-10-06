-- SQL Schema for WeatherJYJAM Account System
-- Run this in your Supabase SQL Editor

-- Note: auth.users table already has RLS enabled by Supabase
-- We don't need to modify it directly

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create user_tabs table for storing tab data
CREATE TABLE IF NOT EXISTS user_tabs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  tab_data JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Create user_settings table for storing user settings
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  settings_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Allow service role to insert profiles (needed for user registration)
CREATE POLICY "Service role can insert profiles" ON profiles
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update profiles" ON profiles
  FOR UPDATE TO service_role USING (true);

-- Create RLS policies for user_tabs table
CREATE POLICY "Users can view own tabs" ON user_tabs 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tabs" ON user_tabs 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tabs" ON user_tabs 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tabs" ON user_tabs 
  FOR DELETE USING (auth.uid() = user_id);

-- Allow service role to insert user_tabs (needed for user registration)
CREATE POLICY "Service role can insert user_tabs" ON user_tabs
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update user_tabs" ON user_tabs
  FOR UPDATE TO service_role USING (true);

-- Create RLS policies for user_settings table
CREATE POLICY "Users can view own settings" ON user_settings 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON user_settings 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings" ON user_settings 
  FOR DELETE USING (auth.uid() = user_id);

-- Allow service role to insert user_settings (needed for user registration)
CREATE POLICY "Service role can insert user_settings" ON user_settings
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update user_settings" ON user_settings
  FOR UPDATE TO service_role USING (true);

-- Create function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to create user profile (can be called manually)
CREATE OR REPLACE FUNCTION create_user_profile(user_id UUID, user_email TEXT, user_username TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (user_id, user_username, user_email);
  
  INSERT INTO public.user_tabs (user_id, tab_data)
  VALUES (user_id, '[]'::jsonb);
  
  INSERT INTO public.user_settings (user_id, settings_data)
  VALUES (user_id, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION create_user_profile(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile(UUID, TEXT, TEXT) TO anon;

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_tabs_updated_at
  BEFORE UPDATE ON user_tabs
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();