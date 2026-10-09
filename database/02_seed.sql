-- ============================================================
-- NEXORA AI — Seed Data
-- Populate Default Plans and Diseases Database
-- ============================================================

-- Seed Default Plans
INSERT INTO public.plans (id, name, description, price, currency, monthly_scan_limit, features)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Free', 'Basic skin analysis with monthly limits', 0.00, 'USD', 5, '["5 Scans per month", "Standard AI Analysis", "Basic History", "General Care Recommendations"]'::jsonb),
    ('00000000-0000-0000-0000-000000000002', 'Pro', 'Unlimited scan health analyzer for individuals', 19.99, 'USD', 50, '["50 Scans per month", "Advanced AI Multi-Model Analysis", "Full Medical Info & Care", "Detailed History & Export", "Priority Support"]'::jsonb),
    ('00000000-0000-0000-0000-000000000003', 'Enterprise', 'Complete clinical grade access', 49.99, 'USD', 9999, '["Unlimited Scans", "Clinical Precision Analysis", "Dermatologist Export", "24/7 Priority Support"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed Common Skin Diseases
INSERT INTO public.skin_diseases (
    disease_name, scientific_name, category, description, severity, symptoms, possible_causes, risk_factors, supportive_care, medical_information, prevention, foods_to_consider, foods_to_limit, when_to_see_doctor, emergency_warning_signs
) VALUES 
(
    'Acne Vulgaris',
    'Acne vulgaris',
    'Inflammatory Skin Disease',
    'Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells. It causes whiteheads, blackheads or pimples.',
    'Mild',
    '["Comedones (blackheads and whiteheads)", "Pimples (papules and pustules)", "Large, solid, painful lumps under the skin (nodules)", "Painful, pus-filled lumps under the skin (cystic lesions)"]'::jsonb,
    '["Excess oil (sebum) production", "Hair follicles clogged by oil and dead skin cells", "Bacteria (Cutibacterium acnes)", "Inflammation"]'::jsonb,
    '["Hormonal changes during puberty or pregnancy", "Certain medications containing corticosteroids, testosterone or lithium", "Diet high in refined carbohydrates", "Stress"]'::jsonb,
    '["Wash affected areas twice daily with a mild cleanser", "Avoid touching or picking at acne lesions", "Use non-comedogenic cosmetics and skincare products", "Apply over-the-counter benzoyl peroxide or salicylic acid preparations"]'::jsonb,
    'Acne vulgaris is one of the most common dermatological conditions globally. Topically applied retinoids, antibiotics, and benzoyl peroxide are first-line treatments for mild to moderate disease. Systemic therapy including oral antibiotics or isotretinoin may be indicated for severe cystic acne.',
    '["Cleanse skin gently after sweating", "Shampoo oily hair regularly", "Keep hands off your face", "Avoid harsh scrubbing"]'::jsonb,
    '["Zinc-rich foods (seeds, legumes)", "Omega-3 fatty acids (salmon, walnuts)", "Foods rich in vitamins A & E", "Green tea"]'::jsonb,
    '["High glycemic index foods (white bread, sugary snacks)", "Skim milk and dairy products", "Excessive whey protein supplements"]'::jsonb,
    'Consult a doctor or dermatologist if self-care remedies do not clear your acne, if it persists or becomes severe, or if it causes emotional distress or scarring.',
    '["Rapidly spreading redness and swelling", "Severe facial swelling accompanying deep lesions", "Signs of systemic infection like high fever"]'::jsonb
),
(
    'Eczema (Atopic Dermatitis)',
    'Atopic dermatitis',
    'Allergic / Inflammatory',
    'Eczema is a condition that causes dry, itchy and inflamed skin. It is common in young children but can occur at any age. It is long lasting (chronic) and tends to flare periodically.',
    'Moderate',
    '["Dry, cracked skin", "Itchiness (pruritus), which may be severe, especially at night", "Red to dark brown skin patches", "Small, raised bumps which may leak fluid and crust over when scratched"]'::jsonb,
    '["Genetic variation affecting skin barrier function", "Immune system dysregulation", "Environmental triggers such as soap, allergens, and cold weather"]'::jsonb,
    '["Family history of eczema, allergies, asthma or hay fever", "Living in cold or highly polluted environments", "Frequent exposure to harsh chemicals or detergents"]'::jsonb,
    '["Moisturize your skin at least twice a day with fragrance-free ointments or creams", "Take warm, short baths or showers", "Use mild, non-soap cleansers", "Wear soft, breathable cotton fabrics"]'::jsonb,
    'Atopic dermatitis is characterized by epidermal barrier dysfunction and immune activation. Topical corticosteroids and calcineurin inhibitors are standard anti-inflammatory therapies. Biologic therapies like dupilumab may be prescribed for moderate-to-severe disease.',
    '["Avoid known environmental allergic triggers", "Keep indoor humidity comfortable", "Pat skin dry gently after bathing and moisturize immediately"]'::jsonb,
    '["Anti-inflammatory foods (fatty fish, berries, leafy greens)", "Probiotic-rich foods (yogurt, kefir)", "Quercetin-rich foods (apples, blueberries)"]'::jsonb,
    '["Common food allergens if diagnosed (eggs, dairy, soy, nuts)", "Processed foods with artificial additives", "Excessive sugar"]'::jsonb,
    'See a medical professional if eczema causes sleep disruption, daily activity limitation, shows signs of bacterial skin infection (yellow crusting, pus), or fails to respond to moisturizers.',
    '["Widespread fluid-filled blisters (possible eczema herpeticum)", "High fever with sudden severe skin redness", "Spreading warmth and pus suggesting cellulitis"]'::jsonb
),
(
    'Melanoma',
    'Malignant melanoma',
    'Neoplastic / Skin Cancer',
    'Melanoma is the most serious type of skin cancer. It develops in the cells (melanocytes) that produce melanin — the pigment that gives skin its color. Early detection is critical.',
    'High',
    '["Asymmetrical mole shape", "Irregular, scalloped, or poorly defined borders", "Varied color pattern (shades of brown, black, red, white, or blue)", "Diameter larger than 6mm (pencil eraser size)", "Evolving mole that changes in size, shape, or color"]'::jsonb,
    '["Unrepaired DNA damage to skin cells triggered by ultraviolet (UV) radiation from sunlight or tanning beds"]'::jsonb,
    '["Fair skin, freckles, light hair", "History of sunburns, especially severe or blistering burns in youth", "Excessive UV light exposure", "Having many moles or unusual moles (dysplastic nevi)", "Family history of melanoma"]'::jsonb,
    '["Immediate evaluation by a qualified dermatologist or medical practitioner", "Avoid picking, scratching, or applying home remedies to suspicious moles", "Keep accurate photographic records of suspicious lesions for medical review"]'::jsonb,
    'Melanoma requires prompt histological confirmation via surgical biopsy. Staging determines whether treatment involves wide local excision, sentinel lymph node biopsy, immunotherapy (e.g., anti-PD-1 agents), targeted therapy (for BRAF mutations), or radiation.',
    '["Avoid exposure to direct sun during peak hours (10 AM to 4 PM)", "Wear broad-spectrum sunscreen with SPF 30+ daily", "Wear protective clothing, wide-brimmed hats, and UV-blocking sunglasses", "Avoid tanning beds completely"]'::jsonb,
    '["Antioxidant-rich colorful vegetables and fruits", "Foods high in Vitamin D", "Green tea and Mediterranean diet components"]'::jsonb,
    '["Ultra-processed foods", "Alcohol consumption", "High sugar diet"]'::jsonb,
    'Consult a healthcare provider immediately if you notice any mole or lesion matching the ABCDE criteria (Asymmetry, Border, Color, Diameter, Evolving) or if a lesion bleeds, oozes, or itches.',
    '["Rapidly growing nodule with bleeding", "Swollen lymph nodes near suspicious lesion", "Sudden spread of dark spots around existing mole"]'::jsonb
),
(
    'Psoriasis',
    'Psoriasis vulgaris',
    'Autoimmune / Chronic Inflammatory',
    'Psoriasis is a skin disease that causes a rash with itchy, scaly patches, most commonly on the knees, elbows, trunk and scalp. It is a chronic autoimmune condition without a complete cure.',
    'Moderate',
    '["Raised, red patches of skin covered with thick, silvery scales", "Small scaling spots (commonly seen in children)", "Dry, cracked skin that may bleed or itch", "Itching, burning or soreness", "Thickened, pitted or ridged nails"]'::jsonb,
    '["Autoimmune dysfunction causing rapid overproduction of skin cells", "T-cells mistakenly attacking healthy skin cells, accelerating the cell life cycle"]'::jsonb,
    '["Family history of psoriasis", "Stress and anxiety", "Smoking and heavy alcohol consumption", "Obesity", "Certain medications like lithium, beta-blockers, and antimalarials"]'::jsonb,
    '["Apply heavy moisturizing ointments or creams daily", "Take short warm baths with Epsom salts or bath oil", "Get small, controlled amounts of natural sunlight", "Avoid scratching skin patches"]'::jsonb,
    'Psoriasis treatment aims to stop skin cells from growing so quickly and remove scales. Topical corticosteroids, vitamin D analogues, phototherapy, and systemic biological therapies (TNF inhibitors, IL-17/23 inhibitors) are widely prescribed.',
    '["Manage stress through mindfulness or exercise", "Avoid skin injuries (cuts, scrapes, sunburn)", "Limit alcohol intake and refrain from smoking"]'::jsonb,
    '["Omega-3 fatty acid sources (salmon, flaxseeds, chia seeds)", "Turmeric and ginger", "Fresh leafy green vegetables"]'::jsonb,
    '["Red meat and dairy products", "Gluten (for susceptible individuals)", "Alcohol and nightshade vegetables if triggered"]'::jsonb,
    'Seek medical advice if psoriasis causes pain or discomfort, makes daily tasks difficult, causes joint swelling and pain (psoriatic arthritis), or does not improve with self-care.',
    '["Generalized pustular psoriasis (widespread pus-filled blisters with high fever)", "Erythrodermic psoriasis (redness covering entire body with severe chills)"]'::jsonb
),
(
    'Healthy Skin',
    'Cutis sana',
    'Normal Condition',
    'The skin appears healthy with no visible signs of clinical skin disease, pathological infection, or malignant lesions.',
    'None',
    '["Even skin texture and tone", "No active rashes, papules, or abnormal scale formation", "Good skin elasticity and hydration"]'::jsonb,
    '["Normal physiological homeostasis and skin barrier function"]'::jsonb,
    '["None"]'::jsonb,
    '["Maintain balanced skincare routine (cleanser, moisturizer, sun protection)", "Stay well hydrated", "Eat a nutrient-dense diet"]'::jsonb,
    'Healthy skin performs critical barrier, thermoregulatory, and immune functions. Daily maintenance with gentle cleansing, moisture retention, and UV protection ensures optimal physiological health.',
    '["Daily broad-spectrum SPF 30+ sunscreen application", "Gentle cleansing without stripping natural oils", "Sufficient sleep and hydration"]'::jsonb,
    '["Water and hydration rich foods", "Fresh fruits and vegetables", "Healthy fats (avocado, nuts)"]'::jsonb,
    '["Excessive alcohol and smoking", "Dehydrating beverages", "High sugar diet"]'::jsonb,
    'Perform regular self-examinations and schedule routine annual skin check-ups with a dermatologist.',
    '["Any new, changing, or bleeding spot should always be promptly examined"]'::jsonb
)
ON CONFLICT DO NOTHING;
