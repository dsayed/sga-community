-- ============================================================
-- SGA Community MVP — Seed Data
-- All names are fictional. Inspired by the real SGA organization
-- in Seattle, WA — a foster-based dog rescue.
-- ============================================================

-- Forum categories
INSERT INTO forum_categories (name, slug, sort_order) VALUES
  ('Foster & Volunteer Needs', 'urgent-needs', 1),
  ('Community Chat', 'community-chat', 2),
  ('Ask an Expert', 'ask-expert', 3),
  ('Events & Meetups', 'events', 4);

-- ============================================================
-- TRAINING MODULES
-- SGA fosters go through orientation + these training modules
-- before being matched with a dog. Content reflects the real
-- SGA foster program (foster-based, no facility, SGA covers
-- all vet care, two-week trial adoption process).
-- ============================================================

INSERT INTO training_modules (title, description, sort_order, published) VALUES
  ('Reading Your Foster Dog', 'Learn to read body language signals — tail, ears, posture, and what they mean for a dog adjusting to your home', 1, true),
  ('Safe Handling & Transport', 'How to safely leash, crate, and transport a foster dog — especially one you''ve just met', 2, true),
  ('The Two-Week Shutdown', 'Why decompression matters and how to give your new foster the space they need to settle in', 3, true),
  ('Daily Care & Feeding', 'Food schedules, exercise, enrichment, and knowing when something''s off', 4, true),
  ('Meet & Greets', 'How to prepare for and handle adoption meet-and-greet visits at your home', 5, true);

-- Module 1: Reading Your Foster Dog
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (1, 1, 'Why This Matters',
   'Every dog that comes into SGA has a story — and most of them can''t tell you what happened before. A stray picked up in Redmond has had a very different week than a dog surrendered by a family in Bellevue.

Your job as a foster is to figure out how they''re feeling by watching what they''re doing. This module teaches you to read the signals so you can give your foster what they need — whether that''s space, comfort, or confidence.'),

  (1, 2, 'Tail Position & Movement',
   'A wagging tail does NOT always mean a happy dog. Here''s how to read what the tail is really saying:

HIGH AND STIFF: The dog is alert and aroused. This can tip into overstimulation. You''ll see this when a foster first spots a squirrel or meets a new person. Give them a moment before approaching.

LOW AND SLOW: Uncertainty or insecurity. Very common in the first 48 hours of a new foster placement. Don''t force interaction — let them approach you.

MID-HEIGHT, LOOSE WAG: This is the good one. Relaxed body, relaxed tail, easy wag. Your foster is comfortable.

TUCKED UNDER: Fear. If you see this, the dog needs less stimulation, not more. Reduce noise, people, and activity around them.'),

  (1, 3, 'Ears, Eyes & Mouth',
   'EARS FORWARD: Alert, interested, potentially fixated. Watch for this during walks when they spot another dog.

EARS PINNED BACK: Stress or submission. Very common during the first car ride to your home. Speak softly.

WHALE EYE (showing whites of eyes): The dog is uncomfortable. You''ll sometimes see this when a child reaches for them too quickly. Create distance.

YAWNING when not tired: A stress signal. If your foster yawns repeatedly during a meet-and-greet, they may need a break.

LIP LICKING with no food present: Another stress signal. Often happens when a foster is being handled in a way that makes them nervous.

SOFT, OPEN MOUTH: Relaxed and content. This is what you''re aiming for.'),

  (1, 4, 'Putting It All Together',
   'No single signal tells the whole story. Always look at the full picture:

A wagging tail + tense body + forward ears = aroused, not necessarily friendly
A tucked tail + pinned ears + lip licking = stressed, needs space
A loose wag + soft eyes + relaxed ears = happy and comfortable

CONTEXT MATTERS: A dog that''s relaxed in your living room might be tense at the vet or during a meet-and-greet. Read the dog in the moment, not based on yesterday.

When in doubt, give the dog more space and less stimulation. You can always add interaction later — you can''t take back a bad experience.

If you''re ever unsure about what your foster is telling you, text a photo or video to the SGA group chat. We''ve all been there.');

-- Module 2: Safe Handling & Transport
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (2, 1, 'Picking Up a New Foster',
   'When SGA matches you with a dog, you''ll either pick them up from a previous foster home, a vet clinic, or occasionally meet a transport van.

BEFORE YOU GO: Have a crate or seatbelt harness ready in your car. Bring high-value treats (small, soft ones work best). Bring a slip lead as backup even if you have a regular leash.

FIRST MEETING: Let the dog sniff you. Don''t reach over their head. Crouch to their level if they''re small. Avoid direct eye contact for the first minute.

LOADING THE CAR: Some dogs jump right in. Others freeze. If they freeze, don''t drag them — try tossing treats onto the car seat. If that doesn''t work, you can lift them gently (support chest and rear). Ask for help if the dog is large.'),

  (2, 2, 'Leashing & Walking',
   'Always use a properly fitted harness or martingale collar (SGA can provide these).

THE TWO-FINGER TEST: You should be able to fit two fingers between the collar and the dog''s neck. Too loose and they can slip out. Too tight and it''s uncomfortable.

FIRST WALKS: Keep them short (10-15 minutes) for the first few days. Stick to your neighborhood — no dog parks, pet stores, or crowded trails until you know the dog.

IF THEY PULL: Stop moving. Wait for slack in the leash. Then continue. Reward walking near you. Don''t jerk the leash.

IF THEY FREEZE: Don''t pull. Crouch down, use an encouraging voice, and wait. Sometimes they just need a moment to process a new environment.

ALWAYS: Leash before opening any door. Even in a fenced yard for the first week. New fosters are unpredictable flight risks.'),

  (2, 3, 'Crate Training Basics',
   'Most SGA fosters use a crate, at least initially. It gives the dog a safe space and prevents destructive behavior when you''re away.

SETUP: Place the crate in a room where the family spends time (living room, not the garage). Add a blanket or bed. Leave the door open.

INTRODUCTION: Toss treats inside. Let the dog go in and out freely. Feed meals in the crate with the door open for the first day or two.

CLOSING THE DOOR: Start with 5 minutes while you''re in the room. Gradually increase. If the dog panics (not just whines — panics), open the door and try shorter intervals.

NEVER USE THE CRATE AS PUNISHMENT. If you need to manage behavior, redirect the dog — don''t shove them in the crate when you''re frustrated.

If your foster truly cannot tolerate a crate after a week of patient introduction, contact SGA. Some dogs do better with an exercise pen or baby-gated room instead.');

-- Module 3: The Two-Week Shutdown
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (3, 1, 'What Is the Two-Week Shutdown?',
   'The two-week shutdown is a decompression period for your new foster dog. It means keeping things calm, predictable, and low-stimulation for the first two weeks.

This is not about ignoring the dog. It''s about letting them learn:
- Where they sleep
- When they eat
- Who lives in the house
- That this is a safe place

Think of it like jet lag for dogs. They''ve been through intake, maybe transport, a vet visit, a car ride, and now they''re in a brand new home with brand new people. They need time to process.'),

  (3, 2, 'Rules for the First Two Weeks',
   'WEEK 1: Keep it very quiet.
- No visitors, no dog playdates, no trips to Home Depot
- Short, calm walks in your immediate neighborhood only
- Feed on a consistent schedule (same times, same place)
- If you have kids over 6, teach them to let the dog approach first
- If you have other pets, keep them separated initially and do slow, supervised introductions

WEEK 2: Slowly expand the world.
- Slightly longer walks, one new route
- One or two calm visitors (sitting, not crowding the dog)
- If the dog is eating, sleeping, and relaxed in your presence — great signs
- Begin short solo departures (leave for 10 minutes, then 30, then an hour)

SGA will check in with you at the end of week 1. Don''t hesitate to reach out sooner.'),

  (3, 3, 'Common Mistakes',
   'THROWING A WELCOME PARTY: We know you''re excited. Your friends are excited. The dog is not excited — the dog is overwhelmed. Save the introductions for week 3.

"BUT THEY SEEM FINE!": Some dogs look perfectly happy in the first 48 hours, then crash on day 3 or 4. This is sometimes called the "honeymoon period." The dog is still in survival mode — true personality emerges later.

TOO MUCH FREEDOM TOO FAST: Don''t give the dog run of the house on day one. Start with one or two rooms. Expand as they show they can handle it.

COMPARING TO YOUR LAST FOSTER: Every dog is different. What worked for your last foster might terrify this one.

Remember: a calm first two weeks sets the foundation for the entire foster experience. Rush it and you''ll spend weeks undoing anxiety.');

-- Module 4: Daily Care & Feeding
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (4, 1, 'Feeding Schedule & Nutrition',
   'SGA will tell you what food to feed (we provide food for all fosters, or reimburse approved brands). Don''t switch food suddenly — it causes stomach issues.

ADULTS: Twice daily, morning and evening. Measure the portions — don''t free-feed (leave food out all day). Pick up the bowl after 15 minutes whether they''ve finished or not.

PUPPIES (under 1 year): Three times daily. Follow the amount guidelines on the bag or ask SGA.

FRESH WATER: Always available. Change it daily.

TREATS: Use small, soft treats for training. Avoid rawhide, cooked bones, and anything with xylitol (toxic). Carrots and plain rice are safe and cheap.

RED FLAGS: Not eating for more than 24 hours, sudden vomiting, diarrhea lasting more than a day, or eating things that aren''t food (socks, plastic). Contact SGA right away.'),

  (4, 2, 'Exercise & Enrichment',
   'Most dogs need 30-60 minutes of physical activity daily, but start slow with a new foster.

FIRST WEEK: Two 10-15 minute walks. Let the dog sniff — "sniff walks" are the best mental exercise. They''re processing their new world through their nose.

AFTER SETTLING IN: Gradually increase. Some dogs want to run and play, others prefer slow strolls. Follow their lead.

ENRICHMENT IDEAS (for when you''re not walking):
- Frozen Kong stuffed with peanut butter (make sure it''s xylitol-free)
- Snuffle mat with hidden kibble
- Cardboard box with treats inside (let them destroy it)
- Training sessions — even 5 minutes of "sit" and "down" is tiring

AVOID: Dog parks (until you know the dog well), retractable leashes, and off-leash time in unfenced areas. Foster dogs are flight risks — even calm ones can bolt at an unexpected noise.'),

  (4, 3, 'SGA Vet Care & When to Call',
   'SGA covers ALL veterinary costs for foster dogs. You never pay for vet visits, medications, or procedures. We have approved vet partners in the Seattle/Eastside area.

ROUTINE: SGA coordinates annual exams, vaccinations, and spay/neuter. We''ll schedule these and let you know.

CALL SGA IMMEDIATELY FOR:
- Vomiting or diarrhea lasting more than 24 hours
- Not eating for more than a day
- Limping or obvious pain
- Difficulty breathing
- Swelling, bleeding, or wounds
- Any bite incident (dog biting a person or another animal)

FOR AFTER-HOURS EMERGENCIES: Go directly to the nearest emergency vet (BluePearl in Renton or Seattle, or Veterinary Specialty Center in Lynnwood). Call or text SGA as soon as you can — we''ll handle the billing.

NEVER take a foster dog to a non-approved vet without checking with SGA first, unless it''s a genuine emergency.');

-- Module 5: Meet & Greets
INSERT INTO training_steps (module_id, step_number, title, body) VALUES
  (5, 1, 'How the Adoption Process Works',
   'When someone applies to adopt a dog you''re fostering, SGA''s adoption coordinator will contact you to arrange a meet-and-greet at your home.

THE PROCESS:
1. Adopter fills out an application on savinggreatanimals.org
2. SGA reviews the application (24-48 hours)
3. If approved, the adoption coordinator contacts you
4. You arrange a meet-and-greet time that works for both parties
5. Meet-and-greet happens at your home (usually 30-60 minutes)
6. If both sides feel good: two-week trial adoption begins
7. After the trial, it''s official!

YOUR ROLE: You know this dog better than anyone. Your observations about their personality, quirks, and needs are invaluable to the adopter. Be honest — a good match means the dog stays in their forever home.'),

  (5, 2, 'Preparing for the Visit',
   'BEFORE THEY ARRIVE:
- Walk the dog so they''re a little tired (calmer = better first impression)
- Put away the dog''s food and any high-value toys (prevents resource guarding)
- Have treats ready
- If you have other animals, consider putting them in a separate room

DURING THE VISIT:
- Let the dog approach the adopter, not the other way around
- Have the adopter sit on the floor or couch — less intimidating
- Offer the adopter treats to give the dog
- Let the interaction happen naturally — don''t force it
- If the adopter brought kids, supervise closely and teach them to be calm

Share what you know: Does the dog like walks? Are they crate-trained? How are they with other dogs? Cats? Kids? What scares them? What makes them happy?'),

  (5, 3, 'After the Meet & Greet',
   'After the visit, you''ll fill out a short feedback form for SGA. Be honest about how the interaction went.

GOOD SIGNS:
- Dog approached the adopter willingly
- Relaxed body language during the visit
- Took treats from the adopter
- Showed curiosity about new people

CONCERNS (share these with SGA):
- Dog hid or tried to avoid the visitors
- Growling, snapping, or resource guarding behavior
- Adopter seemed unprepared or dismissive of your guidance
- Kids were rough despite your coaching

Remember: it''s okay if a meet-and-greet doesn''t lead to adoption. A bad match returned after two weeks is harder on the dog than waiting for the right family.

IF THE TRIAL BEGINS: Pack up the dog''s belongings (SGA supplies a go-home bag with food, treats, and care instructions). Share your notes about the dog''s routine. And yes, it''s okay to cry. Most of us do.');


-- ============================================================
-- LIBRARY RESOURCES
-- A mix of articles, videos, and external links covering the
-- topics SGA fosters and volunteers actually need. Categories
-- reflect the real SGA resource pages.
-- ============================================================

INSERT INTO library_resources (title, description, category, type, url) VALUES
  -- Dog Training
  ('Understanding Dog Body Language', 'A visual guide to what your foster dog is telling you through tail position, ears, and posture', 'Dog Training', 'video', 'https://www.youtube.com/watch?v=vnJNnSjkL4g'),
  ('Crate Training 101', 'Step-by-step guide to making the crate a safe, comfortable space', 'Dog Training', 'article', NULL),
  ('Leash Reactivity: What To Do', 'When your foster lunges or barks at other dogs on walks — practical strategies', 'Dog Training', 'video', 'https://www.youtube.com/watch?v=EUCl6ndLN7Q'),
  ('Separation Anxiety Quick Fixes', '5 things you can try tonight if your foster can''t be left alone', 'Dog Training', 'article', NULL),
  ('Loose Leash Walking Basics', 'How to teach a foster dog to walk without pulling — the stop-and-wait method', 'Dog Training', 'article', NULL),
  ('Preventing Resource Guarding', 'What to do if your foster growls over food, toys, or sleeping spots', 'Dog Training', 'article', NULL),

  -- Dog Health
  ('When to Call the Vet vs. Wait It Out', 'A guide to common symptoms and when they''re actual emergencies', 'Dog Health', 'article', NULL),
  ('Basic First Aid for Dogs', 'What to do before you can get to the vet — cuts, limping, vomiting, and more', 'Dog Health', 'article', NULL),
  ('SGA Approved Vet Partners', 'List of vet clinics SGA works with in the Seattle/Eastside area', 'Dog Health', 'link', 'https://savinggreatanimals.org/resources/veterinary-partners/'),
  ('Flea & Tick Prevention', 'What products SGA recommends and how to apply them', 'Dog Health', 'article', NULL),

  -- Foster Resources
  ('Setting Up Your Foster Space', 'How to prepare your home before your foster dog arrives — room by room', 'Foster Resources', 'article', NULL),
  ('The Two-Week Shutdown Guide', 'Why decompression matters and exactly what to do for the first 14 days', 'Foster Resources', 'article', NULL),
  ('Foster Supply Checklist', 'Everything you need before your foster dog arrives (SGA provides most of it)', 'Foster Resources', 'article', NULL),
  ('Writing a Great Dog Bio', 'How to describe your foster for the adoption listing — tips that get dogs adopted faster', 'Foster Resources', 'article', NULL),
  ('Chewy.com for Supplies', 'SGA''s recommended supplier for food, treats, and gear shipped to your door', 'Foster Resources', 'link', 'https://www.chewy.com'),

  -- Volunteer Resources
  ('Volunteer Orientation Guide', 'Everything you need to know before your first volunteer shift', 'Volunteer', 'link', 'https://savinggreatanimals.org/our-services/volunteer/'),
  ('SignUpGenius: Current Shifts', 'Sign up for available volunteer shifts — transport runs, event help, and more', 'Volunteer', 'link', 'https://www.signupgenius.com'),
  ('How Transport Days Work', 'What to expect when you volunteer for a dog transport run', 'Volunteer', 'article', NULL),

  -- End of Life / Pet Loss
  ('Coping with Losing a Foster', 'It''s okay to grieve. Resources and stories from other SGA fosters who''ve been there', 'Pet Loss & Support', 'article', NULL),
  ('CodaPet: In-Home Euthanasia', 'Compassionate end-of-life services available in Bellevue and Seattle', 'Pet Loss & Support', 'link', 'https://www.codapet.com'),
  ('Quality of Life Assessment', 'A questionnaire to help evaluate whether your dog is in pain or discomfort', 'Pet Loss & Support', 'link', 'https://www.codapet.com/quality-of-life-assessment');

-- Add full article content for key resources
UPDATE library_resources SET content =
'A step-by-step guide to making the crate a safe space for your foster dog.

WHERE TO PUT IT
Place the crate in a room where the family spends time — living room, kitchen, or bedroom. Never the garage or basement. The dog should be near you.

MAKING IT COZY
Add a blanket or old towel. Some dogs like having a cover over the top (makes it more den-like). Leave the door open initially.

INTRODUCTION (DAY 1-2)
Toss high-value treats inside throughout the day. Let the dog go in and out freely. Feed meals in the crate with the door open.

CLOSING THE DOOR (DAY 3+)
Start with 5 minutes while you''re sitting nearby. Gradually move farther away and increase the time. If the dog panics (not just whines — actively panics), open the door and try shorter intervals.

COMMON MISTAKES
- Forcing the dog in. Never. Let them choose.
- Using the crate as punishment. This ruins the association.
- Leaving a new foster crated for 8 hours on day one. Build up to it.

WHEN THE CRATE ISN''T WORKING
Some dogs genuinely can''t handle crates — they''ll bend the bars, hurt their teeth, or soil themselves from panic. If this happens after a week of patient introduction, contact SGA. We''ll work out an alternative (exercise pen, baby-gated room, etc.).'
WHERE title = 'Crate Training 101';

UPDATE library_resources SET content =
'Try these strategies tonight if your foster can''t handle being alone:

1. START TINY
Leave for 2-3 minutes and return before the dog gets anxious. Tomorrow, try 5 minutes. The key is returning before they panic — you''re teaching them you always come back.

2. THE DEPARTURE TREAT
Give a frozen Kong stuffed with peanut butter (xylitol-free!) ONLY when you leave. The dog starts associating your departure with something amazing. Pick it up when you return so it''s special.

3. BORING EXITS, BORING ENTRANCES
No dramatic goodbyes. No excited hellos. Grab your keys, walk out, done. When you return, wait until the dog is calm before giving attention. This teaches them that your coming and going is no big deal.

4. YOUR SCENT
Leave a recently worn t-shirt near the dog''s bed. Your smell is comforting.

5. BACKGROUND NOISE
Leave a radio or TV on low. The sound of human voices can reduce anxiety. Some fosters swear by classical music — there''s actually research supporting this.

WHEN TO ESCALATE
If after a week of consistent practice the dog is still: destroying things, barking for more than 30 minutes straight, self-harming (bloody paws from scratching at doors), or having accidents despite being house-trained — contact SGA. We may discuss medication options with our vet partner. There''s no shame in this — some dogs need pharmaceutical help to get through the anxiety.'
WHERE title = 'Separation Anxiety Quick Fixes';

UPDATE library_resources SET content =
'You need surprisingly little. SGA provides most supplies, but here''s what to have ready:

SGA PROVIDES:
- Dog food (or reimburses approved brands)
- Crate (if you don''t have one)
- Collar, leash, and harness
- Basic medications as needed

YOU SHOULD HAVE:
- A quiet space for the crate (not a high-traffic hallway)
- Old towels or blankets for the crate
- Poop bags (always keep some in your coat pocket)
- Baby gates if you want to restrict access to certain rooms
- Paper towels and enzymatic cleaner (for accidents — they will happen)

NICE TO HAVE:
- A Kong or similar puzzle toy
- Soft training treats
- A snuffle mat
- An old t-shirt you''ve worn (for your scent)

DON''T BUY YET:
- Expensive dog beds (wait until you know if the dog is a chewer)
- Toys (SGA usually sends some, and you''ll learn what the dog likes)
- Fancy food (stick with what SGA provides for consistency)'
WHERE title = 'Foster Supply Checklist';

UPDATE library_resources SET content =
'The decompression period — often called the "two-week shutdown" — is the most important thing you can do for a new foster.

WHY IT MATTERS
Your foster dog has been through a lot: surrender or stray pickup, intake at a vet clinic, possibly a transport van, and now a brand new home with strangers. Their stress hormones are elevated. Even if they seem "fine," their body is in survival mode.

THE 3-3-3 RULE
- 3 days: The dog is overwhelmed. They may not eat, may hide, may not show their true personality.
- 3 weeks: The dog is starting to settle. You''ll see more of their real personality emerge. Some issues (like resource guarding) may appear now.
- 3 months: The dog feels at home. This is who they really are.

WEEK 1: QUIET MODE
- No visitors, no dog playdates, no car rides (unless to the vet)
- Two short walks daily in your immediate neighborhood
- Consistent feeding schedule — same times, same place
- If you have kids 6+, teach them to wait for the dog to approach
- Other pets: keep separated, supervised introductions only

WEEK 2: SLOWLY EXPAND
- Slightly longer walks, try one new route
- One or two calm visitors (sitting, not hovering)
- Begin short solo departures (10 min, then 30, then an hour)
- If the dog is eating, sleeping, and relaxed around you — great progress

SGA will check in with you after week 1. Don''t wait to reach out if something feels off.'
WHERE title = 'The Two-Week Shutdown Guide';

UPDATE library_resources SET content =
'A good bio is the difference between your foster getting inquiries and getting overlooked. Here''s what works:

LEAD WITH PERSONALITY, NOT BREED
"Goofy, snuggly couch potato who loves belly rubs" beats "2-year-old pit mix, house-trained." People adopt personality, not pedigree.

BE SPECIFIC
Instead of "good dog," try: "Curls up next to you on the couch every evening around 8pm" or "Does a full-body wiggle when you come home from work."

BE HONEST ABOUT CHALLENGES
"Working on leash manners — pulls toward squirrels" is fine. Adopters appreciate honesty. If they find out after adoption, it feels like a bait-and-switch.

INCLUDE THE GOOD STUFF
- Are they house-trained?
- How are they with other dogs, cats, or kids?
- Do they know commands?
- What''s their energy level?
- What makes them unique?

PHOTO TIPS
- Natural light (no flash, no dark rooms)
- Get on the dog''s level
- Action shots > posed shots
- Show their face clearly
- Include one photo showing their size relative to something familiar

SHARE YOUR FAVORITE MOMENT
"On day 3, she brought me her stuffed elephant and dropped it in my lap. That was the moment I knew she was going to make someone very happy."

Send your bio and photos to the adoption coordinator. They''ll post it on savinggreatanimals.org and social media.'
WHERE title = 'Writing a Great Dog Bio';

UPDATE library_resources SET content =
'Some symptoms are emergencies. Others can wait until morning. Here''s how to tell:

GO TO THE EMERGENCY VET NOW:
- Difficulty breathing (labored, gasping, blue gums)
- Bloated, hard belly with dry heaving (could be GDV — life-threatening)
- Seizures lasting more than 2 minutes
- Uncontrolled bleeding
- Suspected poisoning (chocolate, xylitol, grapes, rat poison, etc.)
- Hit by a car or major trauma
- Inability to walk or stand

CALL SGA WITHIN A FEW HOURS:
- Vomiting more than twice in 24 hours
- Diarrhea lasting more than a day
- Not eating for more than 24 hours
- Limping that doesn''t improve with rest
- Excessive scratching or hair loss
- Eye discharge or squinting

CAN WAIT FOR A REGULAR VET VISIT:
- Mild, occasional scratching
- Slightly loose stool (one episode)
- Bad breath
- Ear odor (might be an infection — common but not urgent)

EMERGENCY VETS IN OUR AREA:
- BluePearl: Renton & Seattle locations
- Veterinary Specialty Center: Lynnwood
- ACCES: Renton (Animal Critical Care & Emergency Services)

Always call or text SGA when something happens — even if you went straight to the emergency vet. We handle billing and need to update the dog''s medical record.'
WHERE title = 'When to Call the Vet vs. Wait It Out';

UPDATE library_resources SET content =
'Losing a foster dog is a unique kind of grief. You opened your home, gave your heart, and now there''s an empty crate in the living room. Here''s what we want you to know:

IT''S REAL GRIEF
"But you knew it was temporary" is something well-meaning people say. It doesn''t help. The bond you formed was real, the loss is real, and you''re allowed to feel it fully.

YOU''RE NOT ALONE
Nearly every SGA foster has cried when a dog left — whether to an adopter (happy tears and sad tears) or because a dog was too sick to save (just sad tears). This is a community that understands.

WHAT HELPS
- Talk to other fosters. The SGA community chat is full of people who''ve been through this.
- Keep a photo of your foster somewhere you''ll see it. Remember the good you did.
- Take a break between fosters if you need one. There''s no obligation to take the next dog.
- If the dog was adopted: ask the adopter for updates. Most are happy to share.

GRIEF RESOURCES
- CodaPet offers grief counseling services in the Seattle area
- The ASPCA Pet Loss Hotline: (877) 474-3310
- Sometimes just writing about it helps — consider posting in the community chat

THE HARDEST PART IS THE BEST PART
The reason it hurts is because you gave that dog something they desperately needed: a safe place, a warm bed, and a person who cared. That matters. Even when it hurts.'
WHERE title = 'Coping with Losing a Foster';

UPDATE library_resources SET content =
'Resource guarding is when a dog growls, snaps, or stiffens over food, toys, beds, or even people. It''s one of the most common behavioral issues in foster dogs — and one of the most misunderstood.

WHAT IT LOOKS LIKE:
- Freezing over their food bowl when you walk by
- Growling when you approach their bed or crate
- Snapping if you try to take a toy away
- Stiffening body, hard stare, showing teeth

WHAT NOT TO DO:
- Don''t punish the growl. A growl is communication — it means "I''m uncomfortable." If you punish the warning, the dog may skip straight to biting next time.
- Don''t "show them who''s boss" by taking things away. This makes guarding worse.
- Don''t stick your hand in their food bowl to "teach" them. This is a great way to get bitten.

WHAT TO DO:
1. MANAGE THE ENVIRONMENT: Pick up high-value items. Feed in a quiet spot where the dog won''t be disturbed. Don''t approach while they''re eating.

2. TRADE UP: When you need something the dog has, offer something better. Drop a piece of chicken near them, pick up the item while they eat the chicken. They learn that people approaching = better stuff.

3. PRACTICE "DROP IT": Start with low-value items. Offer a treat, say "drop it," and trade. Gradually work up to higher-value items over days and weeks.

4. FEED BY HAND: Once the dog is comfortable around you, occasionally hand-feed kibble. This builds trust.

WHEN TO CALL SGA:
- The dog has bitten or attempted to bite someone
- Guarding is getting worse despite management
- You feel unsafe

Resource guarding is treatable. Most dogs improve significantly with consistent, patient work. Contact SGA — we can connect you with a trainer if needed.'
WHERE title = 'Preventing Resource Guarding';

UPDATE library_resources SET content =
'What to do when you can''t make it to the vet right away:

CUTS & SCRAPES
- Clean with warm water (no hydrogen peroxide — it damages tissue)
- Apply gentle pressure with a clean cloth if bleeding
- A small amount of triple antibiotic ointment is safe
- Bandage loosely if needed — too tight restricts blood flow
- See a vet if: the cut is deep, won''t stop bleeding, or is near the eyes/mouth

LIMPING
- Check the paw pads for cuts, thorns, or swelling
- Feel gently along the leg for heat or tenderness
- Restrict activity (leash walks only, no running or jumping)
- If it doesn''t improve in 24 hours, or the dog can''t bear weight, see a vet

VOMITING
- Withhold food for 12 hours (water is fine in small amounts)
- After 12 hours, offer a small amount of plain boiled chicken and white rice
- If vomiting continues, see a vet

DIARRHEA
- Plain pumpkin puree (NOT pie filling) can help — 1 tablespoon per 10 lbs of body weight
- Boiled chicken and rice for 24 hours
- Make sure the dog stays hydrated
- See a vet if: bloody, lasts more than 2 days, or the dog seems weak

CHOKING
- Look in the mouth — can you see the object?
- If yes and you can safely reach it, gently pull it out
- If not, or the dog is unconscious: perform a modified Heimlich (compress the abdomen in quick upward thrusts)
- Get to a vet immediately

THIS IS NOT A SUBSTITUTE FOR VETERINARY CARE. When in doubt, call SGA or go to the emergency vet. We cover all costs.'
WHERE title = 'Basic First Aid for Dogs';

UPDATE library_resources SET content =
'The stop-and-wait method is the simplest and most effective way to teach loose leash walking.

THE IDEA:
When the leash is tight, you stop. When it''s loose, you walk. The dog learns that pulling gets them nowhere, and staying near you keeps the walk going.

HOW TO DO IT:
1. Start walking at a normal pace
2. The moment the leash goes tight, STOP. Don''t pull back — just stop.
3. Wait. Don''t say anything. Just stand there.
4. Eventually the dog will look back at you or move toward you, creating slack.
5. The INSTANT there''s slack: say "yes!" and start walking again.
6. Repeat. Every single time the leash goes tight.

YOUR FIRST WALK WILL BE SLOW.
You might cover half a block in 15 minutes. That''s normal. The dog is learning a new concept. It gets better fast if you''re consistent.

TIPS:
- Use a front-clip harness (it turns the dog toward you when they pull)
- Bring small treats — reward the dog when they''re walking next to you
- Practice when you''re NOT in a hurry. A "training walk" is different from a "we need to get around the block" walk.
- Be consistent. If you let them pull sometimes, they''ll keep trying.

COMMON MISTAKES:
- Jerking the leash. This teaches nothing except that walks are unpleasant.
- Only training when they pull hard. Train from the first step.
- Giving up. Consistency over 5-7 walks usually produces dramatic improvement.'
WHERE title = 'Loose Leash Walking Basics';

UPDATE library_resources SET content =
'Here''s what to know about flea and tick prevention for your foster dog:

SGA PROVIDES PREVENTATIVES
We typically use Simparica Trio or NexGard. Your foster coordinator will let you know what''s been given and when the next dose is due.

HOW TO APPLY (if given an oral preventative):
- Give it with food — most dogs eat it like a treat
- Make sure they swallow it (watch for spit-outs)
- Mark your calendar for the next dose (usually monthly)

SIGNS OF FLEAS:
- Excessive scratching, especially at the base of the tail
- Small black specks in the fur (flea dirt — actually flea poop)
- Red, irritated skin
- If you see live fleas: contact SGA, we''ll provide treatment

TICKS IN THE PACIFIC NORTHWEST:
- Less common than the East Coast, but still present in wooded and grassy areas
- Check your dog after hikes: look in ears, between toes, under the collar, and around the tail base
- To remove: use fine-tipped tweezers, grasp the tick close to the skin, pull straight out with steady pressure
- Save the tick in a sealed bag (the vet may want to test it)
- Contact SGA if you find a tick — we''ll want to note it in the dog''s file

NEVER use human insect repellent on dogs. DEET is toxic to them.'
WHERE title = 'Flea & Tick Prevention';

UPDATE library_resources SET content =
'Your first day helping with dog transport — here''s what to expect.

WHAT IS TRANSPORT?
SGA moves dogs between foster homes, vet clinics, and adoption events. Volunteer drivers make these runs possible. Most drives are 20-60 minutes within the Seattle/Eastside area.

BEFORE THE DRIVE:
- You''ll get a text or SignUpGenius notification with: pickup location, drop-off location, dog name, and any special notes
- Bring: a leash, towels (in case of car sickness), treats, and poop bags
- Make sure your car has a crate, barrier, or seatbelt harness. Dogs should NOT ride loose in the car.

DURING THE DRIVE:
- The dog may be anxious (panting, drooling, whining). This is normal.
- Drive calmly. No sudden stops or sharp turns.
- Talk softly or play quiet music. Some dogs find this calming.
- If the dog needs to go: find a quiet grassy spot, let them do their business, and clean up.

AT DROP-OFF:
- Text the foster coordinator when you arrive
- Hand the leash to the person meeting you (don''t just let the dog loose)
- Share any notes: "She was calm the whole ride" or "He threw up twice — heads up"

That''s it. You''ve just helped a dog get one step closer to their forever home.'
WHERE title = 'How Transport Days Work';

UPDATE library_resources SET content =
'Tips for setting up your home before your foster dog arrives.

THE DOG''S ROOM (start with one)
Pick a room that''s easy to clean and doesn''t have too many escape routes. A laundry room, spare bedroom, or a corner of the living room works well. This is where the crate and food/water bowls go.

DOG-PROOFING CHECKLIST:
- Pick up shoes, socks, and kids'' toys (dogs eat these)
- Secure trash cans (a flipped trash can at 2am is nobody''s favorite wake-up call)
- Move chemicals, medications, and cleaning supplies out of reach
- Cover or tuck away power cords
- Check for small gaps behind appliances where a scared dog could hide
- If you have a yard: walk the fence line and look for gaps, dig spots, or low sections

BABY GATES: Your best friend. Use them to control which rooms the dog has access to. Expand territory gradually as the dog proves they can handle it.

INTRODUCING YOUR HOME:
When the dog first arrives, bring them straight to their room. Let them sniff around with the leash still on. Offer water. Don''t overwhelm them with a tour of the whole house on day one.

IF YOU HAVE OTHER PETS:
Keep them separated initially. Let them sniff under a closed door for the first day. Then try a visual introduction through a baby gate. Full introduction on day 3-5, supervised and with leashes on the dogs. Cats should always have an escape route.

The goal is: your foster dog feels safe in one small area before they explore the rest.'
WHERE title = 'Setting Up Your Foster Space';


-- ============================================================
-- SAMPLE FORUM POSTS
-- These require real user IDs from auth.users + profiles.
-- Run these AFTER creating test users in Supabase Auth.
--
-- To create test users:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Create users with emails like:
--    lily@example.com, sarah@example.com, james@example.com,
--    maria@example.com, david@example.com
-- 3. Then INSERT matching profiles (see below)
-- 4. Then uncomment and run the forum posts section
-- ============================================================

-- INSTRUCTIONS: Replace the UUIDs below with the actual user IDs
-- from your Supabase Auth dashboard after creating test users.

/*
-- Step 1: Create profiles for your test users
-- Replace UUIDs with actual auth.users IDs from your Supabase dashboard

INSERT INTO profiles (id, full_name, role, location) VALUES
  ('REPLACE-WITH-UUID-1', 'Lily Piecora', 'staff', 'Seattle, WA'),
  ('REPLACE-WITH-UUID-2', 'Sarah Martinez', 'foster', 'Bellevue, WA'),
  ('REPLACE-WITH-UUID-3', 'James Chen', 'volunteer', 'Kirkland, WA'),
  ('REPLACE-WITH-UUID-4', 'Maria Torres', 'foster', 'Redmond, WA'),
  ('REPLACE-WITH-UUID-5', 'David Kim', 'adopter', 'Renton, WA');

-- Step 2: Insert sample forum posts

-- Urgent needs post
INSERT INTO forum_posts (author_id, category_id, title, body) VALUES
  ('REPLACE-WITH-UUID-1', 1,
   'Foster needed for Bella in Redmond — senior girl, very sweet',
   'Bella is a 9-year-old lab mix who was surrendered by her family last week. She''s been at the vet for her intake exam and is healthy but needs a quiet foster home ASAP.

She''s house-trained, low energy, loves to snuggle on the couch. Would do best in a home without young kids or high-energy dogs — she''s just looking for a calm spot to decompress.

If you can take her even for a few weeks while we find her a permanent foster or adopter, please reply here or text me directly. She''s such a good girl.'),

  -- Community chat post
  ('REPLACE-WITH-UUID-2', 2,
   'Rosie''s first walk on a leash! 🎉',
   'After 3 weeks of patient work, this girl finally walked a full block without pulling or freezing. She even sniffed another dog through a fence and just wagged her tail — no barking, no lunging!

For context: Rosie came to us from a hoarding situation. She''d never been on a leash before. The first week she just sat down and refused to move. We started with 30-second trips to the front yard and built up from there.

The stop-and-wait method from the Library really works — just takes time. So proud of her progress! 🐕'),

  -- Ask an expert post
  ('REPLACE-WITH-UUID-3', 3,
   'My foster is resource guarding his food bowl — help?',
   'Duke (2yo pittie mix, been with me for 10 days) has started growling when I walk near his food bowl during meals. He''s never snapped, but the growling is getting more intense.

He''s fine with everything else — loves belly rubs, great on walks, no issues with toys. It''s specifically the food bowl.

Should I:
a) Just give him space during meals and not worry about it?
b) Start the "trade up" technique from the Library?
c) Talk to SGA about a trainer referral?

First-time foster so I want to handle this right. Thanks!'),

  -- Events post
  ('REPLACE-WITH-UUID-1', 4,
   'Pack Walk — Saturday Feb 22nd at Robinswood Park',
   'Monthly pack walk is happening! All foster dogs and volunteers welcome.

📍 Robinswood Park, Bellevue (meet at the main parking lot)
🕐 10:00 AM — we''ll walk for about an hour
🐕 All skill levels welcome — we break into groups based on dog comfort level

Bring: water for you and your dog, poop bags, treats. SGA will have extra leashes and harnesses available.

If your foster dog is still in decompression mode or is reactive, this might not be the right event yet — but come without a dog if you want to meet other fosters!

RSVP in the thread so we know how many to expect.'),

  -- Another community chat post
  ('REPLACE-WITH-UUID-4', 2,
   'Moving on from my first foster — harder than I expected',
   'Cooper got adopted on Saturday. His new family is wonderful — two kids who were SO gentle with him, a big yard, and a dad who works from home. Honestly the perfect match.

But man, the house feels empty. His crate is still in the living room. I keep thinking I hear his nails on the kitchen floor.

I know this is the whole point — we foster so they find their person. And Cooper absolutely found his people. But I didn''t expect to feel this way.

Anyway. Taking a week off before the next one. Needed to write this down somewhere people would understand. 💙');

-- Step 3: Add some reactions to the posts (optional)
-- INSERT INTO forum_reactions (post_id, user_id) VALUES ...

*/
