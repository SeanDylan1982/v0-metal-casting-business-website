-- Insert default categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Potjie Pots', 'potjie-pots', 'Traditional South African three-legged cast iron cooking pots', 1),
  ('Religious Art', 'religious-art', 'Handcrafted metal crosses and religious decorative pieces', 2),
  ('Jewelry', 'jewelry', 'Custom cast metal jewelry pieces', 3),
  ('Home Decor', 'home-decor', 'Decorative metal pieces for your home', 4),
  ('Garden Ornaments', 'garden-ornaments', 'Durable outdoor metal decorations', 5),
  ('Camping & Survival', 'camping-survival', 'Practical metal gear for outdoor adventures', 6),
  ('Custom Orders', 'custom-orders', 'Bespoke metal casting for your unique needs', 7)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products using the provided images
INSERT INTO products (name, slug, description, category_id, is_featured, image_url) VALUES
  (
    'Traditional Potjie Pot - Size 2',
    'traditional-potjie-pot-size-2',
    'Authentic cast aluminum potjie pot, perfect for outdoor cooking and traditional South African dishes. Features three sturdy legs and a fitted lid.',
    (SELECT id FROM categories WHERE slug = 'potjie-pots'),
    true,
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2022.14.27_98b90f3c-WkGe8i5bM9GLaTt9qpFCM6ny1A7VFK.jpg'
  ),
  (
    'Decorative Metal Cross - Angel Design',
    'decorative-cross-angel-design',
    'Beautifully detailed cast metal cross featuring intricate angel and floral designs. Perfect for home decor or as a meaningful gift.',
    (SELECT id FROM categories WHERE slug = 'religious-art'),
    true,
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2020.04.19_963264e2-xxpEJ5jPTEohvJpZSvg8xn0t9KEHs4.jpg'
  ),
  (
    'Simple Elegance Cross',
    'simple-elegance-cross',
    'Clean, minimalist cast metal cross with smooth finish. Timeless design suitable for any space.',
    (SELECT id FROM categories WHERE slug = 'religious-art'),
    false,
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2020.04.18_30111e46-ELxFCYmpk2B3R2kAyjuGxsb8cPRfGU.jpg'
  ),
  (
    'Heart Cross - Love Design',
    'heart-cross-love-design',
    'Contemporary metal cross featuring a heart at the center, symbolizing faith and love.',
    (SELECT id FROM categories WHERE slug = 'religious-art'),
    false,
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2022.14.28_8785ffdb-exZuLBPP5WXlQVbIqFaiS8DdPqxcv1.jpg'
  ),
  (
    'Custom Brass Jewelry Piece',
    'custom-brass-jewelry',
    'Handcrafted brass jewelry piece showcasing our precision casting capabilities.',
    (SELECT id FROM categories WHERE slug = 'jewelry'),
    false,
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2020.04.18_70f7aebe-fLcbqIQfbPdqBJAiaby93cl6wnWjHT.jpg'
  ),
  (
    '"Be Mine" Decorative Bowls (Set of 2)',
    'be-mine-decorative-bowls',
    'Charming set of two cast metal bowls with "BE MINE" text and heart designs. Perfect for Valentine''s Day or romantic decor.',
    (SELECT id FROM categories WHERE slug = 'home-decor'),
    true,
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2022.14.38_b0fce57d-HHRy30vCB73GwDjIuF6eSirjWrbriO.jpg'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert gallery images
INSERT INTO gallery (title, image_url, description, display_order, is_visible) VALUES
  ('Potjie Pot Collection', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2022.14.27_98b90f3c-WkGe8i5bM9GLaTt9qpFCM6ny1A7VFK.jpg', 'Our signature potjie pots ready for delivery', 1, true),
  ('Master Craftsman at Work', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2020.04.18_5439fba0-WuUEdL7PjX4nemNboThuITbW4Sqk8O.jpg', 'Our skilled artisan with a finished potjie pot', 2, true),
  ('Religious Art Collection', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2020.04.19_963264e2-xxpEJ5jPTEohvJpZSvg8xn0t9KEHs4.jpg', 'Ornate metal crosses with detailed designs', 3, true),
  ('Casting Process', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2022.10.38_120648c9-AwtbAsaYT47nGjIsFQS8WCwMc72S2j.jpg', 'Sand mold preparation for metal casting', 4, true),
  ('Showroom Display', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-13%20at%2022.10.35_3debac83-h2E8VSL5o7nQKfPXycpFRHYeRjmgGL.jpg', 'Finished potjie pot in our showroom', 5, true)
ON CONFLICT DO NOTHING;
