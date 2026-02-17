-- Forum categories (matching wireframe tabs)
INSERT INTO forum_categories (name, slug, sort_order) VALUES
  ('Urgent Needs', 'urgent-needs', 1),
  ('Community Chat', 'community-chat', 2),
  ('Ask an Expert', 'ask-expert', 3),
  ('Events', 'events', 4);

-- Training modules (matching wireframe: 5 modules shown)
INSERT INTO training_modules (title, description, sort_order, published) VALUES
  ('Dog Body Language', 'Learn to read signals — tail, ears, posture, and what they mean', 1, true),
  ('Safe Handling', 'Proper techniques for leashing, crating, and introducing to new spaces', 2, true),
  ('Meeting Needs', 'Food, water, exercise, enrichment, and medical care basics', 3, true),
  ('Decompression', 'Helping your foster adjust to a new home environment safely', 4, true),
  ('Positive Reinforcement', 'Reward-based training techniques that work', 5, true);

-- Training steps for Module 1: Dog Body Language
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (1, 1, 'Reading Tail Position', 'A wagging tail doesn''t always mean a happy dog. The position and speed of the wag tells you a lot. A tail held high and wagging stiffly can signal alertness or even aggression. A low, slow wag often means insecurity. A relaxed, mid-height wag with a loose body usually means a happy, friendly dog.'),
  (1, 2, 'Ear Signals', 'Ears are one of the most expressive parts of a dog. Forward-pointing ears show interest or alertness. Ears pinned flat against the head often indicate fear or submission. One ear forward and one back can mean the dog is processing conflicting information. Learn to read ears in context with other body signals.'),
  (1, 3, 'Body Posture', 'A dog''s overall posture tells you their emotional state. A relaxed dog has loose muscles, a slightly open mouth, and weight evenly distributed. A fearful dog may crouch low, tuck their tail, and lean away. An aroused or aggressive dog may lean forward with tense muscles and a stiff body.'),
  (1, 4, 'Putting It Together', 'Now that you know the individual signals, practice reading the whole dog. Look at tail, ears, body posture, mouth, and eyes together. A dog with a wagging tail but tense body and forward ears is NOT necessarily friendly. Context matters: consider the environment and what just happened.');

-- Training steps for Module 2: Safe Handling
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (2, 1, 'Approaching a New Dog', 'Never rush up to a new foster dog. Let them come to you. Avoid direct eye contact initially — look slightly to the side. Offer the back of your hand for sniffing at their level. If they turn away or show stress signals, give them space.'),
  (2, 2, 'Leashing Safely', 'Always use a properly fitted collar or harness. Check that you can fit two fingers between the collar and neck. Attach the leash before opening any door. Use a 6-foot leash (not retractable) for walks. Keep the leash loose when possible.'),
  (2, 3, 'Crate Introduction', 'Make the crate a positive space. Place treats and a blanket inside. Let the dog explore on their own. Never force a dog into a crate. Start with short periods (5-10 minutes) and gradually increase. The crate should feel like a safe den, not a punishment.');

-- Training steps for Module 3: Meeting Needs
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (3, 1, 'Feeding Basics', 'Feed your foster on a consistent schedule (typically twice daily for adults). Use the food provided by SGA or approved brands. Fresh water should always be available. Monitor eating habits — sudden changes can indicate health issues.'),
  (3, 2, 'Exercise Requirements', 'Most dogs need 30-60 minutes of exercise daily. Start slow with new fosters — they may be out of shape or recovering. Avoid dog parks until you know the dog''s temperament. Sniff walks (letting the dog explore at their pace) are excellent mental exercise.'),
  (3, 3, 'When to Contact SGA', 'Contact SGA immediately for: vomiting or diarrhea lasting more than 24 hours, not eating for more than a day, limping or signs of pain, any aggression toward people, and any medical emergency. When in doubt, reach out — we''d rather hear from you than not.');

-- Library resources (matching wireframe content)
INSERT INTO library_resources (title, description, category, type, url) VALUES
  ('Understanding Dog Body Language', 'A visual guide to what your foster dog is telling you', 'Dog Training', 'video', 'https://www.youtube.com/watch?v=example1'),
  ('Crate Training 101', 'Step-by-step guide to making the crate a happy place', 'Dog Training', 'article', NULL),
  ('Leash Reactivity: What To Do', 'When your foster lunges at other dogs on walks', 'Dog Training', 'video', 'https://www.youtube.com/watch?v=example2'),
  ('Separation Anxiety Quick Fixes', '5 things you can try tonight if your foster can''t be left alone', 'Dog Training', 'article', NULL),
  ('When to Call the Vet vs. Wait It Out', 'A guide to common symptoms and when they''re emergencies', 'Dog Health', 'article', NULL),
  ('Basic First Aid for Dogs', 'What to do before you can get to the vet', 'Dog Health', 'article', NULL),
  ('Setting Up Your Foster Space', 'How to prepare your home for a new foster dog', 'Foster Resources', 'article', NULL),
  ('The Two-Week Shutdown', 'Why your new foster needs time to decompress', 'Foster Resources', 'article', NULL),
  ('Volunteer Orientation Guide', 'Everything you need to know for your first shift', 'Volunteer', 'link', 'https://www.savinggreatanimals.org/volunteer'),
  ('Dealing with Pet Loss', 'Resources for coping when a foster or adopted dog passes', 'Pet Loss', 'article', NULL);

-- Add content for articles that are "internal"
UPDATE library_resources SET content = 'A step-by-step guide to making the crate a happy, safe space for your foster dog.

Start by placing the crate in a common area where the family spends time. Put a comfortable blanket inside and leave the door open. Toss high-value treats inside periodically throughout the day.

Never force a dog into a crate. Let them explore on their own terms. Start with very short sessions (5 minutes) and gradually increase duration.

Feed meals in the crate to build positive associations. Practice closing the door for brief periods while you''re still in the room. Gradually increase your distance and the duration.

If the dog shows signs of distress (excessive barking, drooling, trying to escape), reduce the duration and consult with SGA staff for additional guidance.'
WHERE title = 'Crate Training 101';

UPDATE library_resources SET content = 'Try these five strategies tonight if your foster dog struggles with being alone:

1. **Start small.** Leave for just 2-3 minutes and return before the dog gets anxious. Gradually increase the time.

2. **Create a departure routine.** Give a special treat (like a frozen Kong with peanut butter) only when you leave. This makes departures positive.

3. **Practice calm departures and arrivals.** No big goodbyes or excited hellos. Keep it low-key.

4. **Leave worn clothing.** Your scent can comfort an anxious dog. Leave a recently worn t-shirt near their bed.

5. **Background noise.** Leave a radio or TV on at low volume. The sound of human voices can be calming.

If symptoms persist (destructive behavior, excessive barking, self-harm), contact SGA — we may need to discuss medication options with our vet partner.'
WHERE title = 'Separation Anxiety Quick Fixes';
