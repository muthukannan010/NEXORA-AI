-- ============================================================
-- NEXORA AI — Database Schema
-- Custom Authentication (NO Supabase Auth)
-- Run this in Supabase SQL Editor (or psql)
-- ============================================================

-- Enable UUID extension (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USERS TABLE (Custom Auth — NOT auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    full_name       VARCHAR(200),
    profile_image   TEXT,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PROFILES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    phone               VARCHAR(20),
    date_of_birth       DATE,
    preferred_language  VARCHAR(10) DEFAULT 'en',
    bio                 TEXT,
    avatar_url          TEXT,
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. SKIN DISEASES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.skin_diseases (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disease_name            VARCHAR(200) NOT NULL,
    scientific_name         VARCHAR(200),
    category                VARCHAR(100),
    description             TEXT,
    symptoms                JSONB DEFAULT '[]'::jsonb,
    possible_causes         JSONB DEFAULT '[]'::jsonb,
    risk_factors            JSONB DEFAULT '[]'::jsonb,
    supportive_care         JSONB DEFAULT '[]'::jsonb,
    medical_information     TEXT,
    prevention              JSONB DEFAULT '[]'::jsonb,
    foods_to_consider       JSONB DEFAULT '[]'::jsonb,
    foods_to_limit          JSONB DEFAULT '[]'::jsonb,
    when_to_see_doctor      TEXT,
    emergency_warning_signs JSONB DEFAULT '[]'::jsonb,
    severity                VARCHAR(20) DEFAULT 'Low',
    created_at              TIMESTAMPTZ DEFAULT now(),
    updated_at              TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. SCAN HISTORY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scan_history (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    disease_id          UUID REFERENCES public.skin_diseases(id) ON DELETE SET NULL,
    image_url           TEXT,
    image_path          TEXT,
    predicted_condition VARCHAR(200),
    confidence          NUMERIC(6,3),
    severity            VARCHAR(20),
    model_name          VARCHAR(100),
    model_version       VARCHAR(20),
    prediction_data     JSONB,
    analysis_status     VARCHAR(20) DEFAULT 'completed',
    notes               TEXT,
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. PLANS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.plans (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(50) NOT NULL,
    description         TEXT,
    price               NUMERIC(10,2) DEFAULT 0,
    currency            VARCHAR(3) DEFAULT 'USD',
    monthly_scan_limit  INTEGER DEFAULT 5,
    features            JSONB DEFAULT '[]'::jsonb,
    is_active           BOOLEAN DEFAULT true,
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. SUBSCRIPTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    plan_id         UUID NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
    status          VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'paused')),
    start_date      TIMESTAMPTZ DEFAULT now(),
    end_date        TIMESTAMPTZ,
    auto_renew      BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. SCAN USAGE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scan_usage (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    month           INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year            INTEGER NOT NULL CHECK (year >= 2024),
    used            INTEGER DEFAULT 0,
    successful      INTEGER DEFAULT 0,
    failed          INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, month, year)
);

-- ============================================================
-- 8. NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title               VARCHAR(200) NOT NULL,
    message             TEXT,
    notification_type   VARCHAR(50) DEFAULT 'info',
    is_read             BOOLEAN DEFAULT false,
    created_at          TIMESTAMPTZ DEFAULT now()
);
