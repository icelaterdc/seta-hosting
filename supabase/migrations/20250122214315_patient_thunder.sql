/*
  # Initial Schema Setup for Discord Bot Hosting Platform

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - username (text)
      - created_at (timestamp)
    - bots
      - id (uuid)
      - user_id (uuid, references profiles)
      - token (text, encrypted)
      - name (text)
      - status (text)
      - status_message (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create bots table
CREATE TABLE bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  token text NOT NULL,
  name text NOT NULL,
  status text DEFAULT 'online',
  status_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bots"
  ON bots
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own bots"
  ON bots
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    (SELECT COUNT(*) FROM bots WHERE user_id = auth.uid()) < 3
  );

CREATE POLICY "Users can update own bots"
  ON bots
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own bots"
  ON bots
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());