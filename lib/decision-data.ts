import type { DecisionNode } from "@/types/decision-tree";

export const decisionTrees: { id: string; title: string; description: string; trigger: string; rootNode: DecisionNode }[] = [
  {
    id: "poor-sleep",
    title: "Poor Sleep",
    description: "What to do when you slept poorly but training is scheduled.",
    trigger: "I slept poorly last night. Should I train today?",
    rootNode: {
      id: "sleep-quality",
      question: "How poor was your sleep?",
      options: [
        {
          label: "Slightly less than usual (5–6 hours, felt okay)",
          outcome: {
            recommendation: "Train normally. Reduce intensity slightly if needed.",
            reason: "One night of slightly reduced sleep has minimal impact on performance for most sessions. The body can compensate for occasional sleep deficit without significant performance degradation.",
            coachNotes: "If training feels unusually hard during warm-up, consider reducing intensity, but do not pre-emptively skip the session. Many athletes perform well on less-than-ideal sleep once the session begins.",
          },
        },
        {
          label: "Significantly less than usual (3–5 hours, feel tired)",
          outcome: {
            recommendation: "Train but reduce intensity and volume. Prioritise easy work.",
            reason: "Significant sleep restriction impairs reaction time, coordination, and perceived effort. Training can still be productive, but high-intensity work carries increased injury risk and reduced adaptation quality.",
            coachNotes: "If today is a hard run day (Tuesday intervals/4×4/threshold), swap it for an easy Zone 2 run and move the hard run to Thursday if you feel recovered. Gym: reduce load by 10–20% and focus on movement quality over load.",
            scientificNotes: "Sleep restriction to 4–5 hours impairs cognitive and physical performance comparably to a blood alcohol concentration of 0.05%. Motor coordination, reaction time, and decision-making are all affected, making high-intensity or technically demanding training riskier.",
          },
        },
        {
          label: "Severely sleep-deprived (under 3 hours, deeply fatigued)",
          outcome: {
            recommendation: "Skip training. Prioritise recovery and sleep tonight.",
            reason: "Severe sleep deprivation significantly impairs immune function, increases injury risk, and reduces training adaptation quality. The recovery cost of training in this state exceeds any potential benefit.",
            coachNotes: "Do not try to 'make up' the missed session. One missed session is negligible over a training year. Resume normal programming tomorrow. If severe sleep deprivation occurs frequently (more than once per week), the training programme or lifestyle factors need adjustment, not more discipline.",
          },
        },
      ],
    },
  },
  {
    id: "missed-workout",
    title: "Missed Workout",
    description: "What to do when you miss a scheduled training session.",
    trigger: "I missed a scheduled session. What now?",
    rootNode: {
      id: "miss-type",
      question: "What type of session did you miss?",
      options: [
        {
          label: "Zone 2 run or easy gym session",
          outcome: {
            recommendation: "Continue the schedule as normal. Do not attempt to make up the session.",
            reason: "Easy sessions are low-stress and missing one has negligible impact on long-term adaptation. The disruption of adding an extra session to 'make up' for it is more damaging than the missed session itself.",
            coachNotes: "Missing an easy run occasionally is normal. The athletes who succeed long-term are not the ones who never miss sessions; they are the ones who miss a session and calmly resume the programme without overcompensating.",
          },
        },
        {
          label: "Hard run (Tuesday intervals, 4×4, or threshold)",
          outcome: {
            recommendation: "Move it to Thursday (swap the easy Zone 2) if fresh. Otherwise, skip it.",
            reason: "Hard runs drive the most important running adaptations. If you can do it on Thursday without compromising the following week's training, it is worth rescheduling. If you do not feel fresh, skip it rather than forcing a low-quality session.",
            coachNotes: "Thursday is an easy Zone 2 day, so it is the natural place to reschedule a missed hard run: swap the hard run into Thursday and drop the easy Zone 2. Do not stack it onto a gym day or double up hard sessions. One missed hard run per month is acceptable. Two or more: review schedule adherence.",
          },
        },
        {
          label: "Gym session",
          outcome: {
            recommendation: "Continue the schedule. Do not make up the gym session.",
            reason: "Gym sessions are supportive, not primary. Missing one gym session has minimal impact. Attempting to make it up by adding a session on a rest day or doubling up compromises recovery and running performance.",
            coachNotes: "Gym attendance should be high (>90%) but does not need to be perfect. Three missed gym sessions per year is negligible. Three missed gym sessions per month requires attention to scheduling or motivation.",
          },
        },
        {
          label: "Long run",
          outcome: {
            recommendation: "Do a shorter run (5–7 km) if possible. Otherwise, skip and resume next Saturday.",
            reason: "The long run provides unique endurance adaptations. If you can fit a shorter version, it preserves some of that stimulus. If not, one missed long run has minimal impact; the adaptations from long runs accumulate over months, not individual sessions.",
          },
        },
      ],
    },
  },
  {
    id: "minor-injury",
    title: "Minor Injury",
    description: "How to respond to pain, tightness, or suspected minor injury.",
    trigger: "Something hurts. Should I train through it?",
    rootNode: {
      id: "pain-type",
      question: "What type of pain is it?",
      description: "Honest self-assessment is critical. Err on the side of caution.",
      options: [
        {
          label: "General muscle soreness or stiffness, no sharp or localised pain",
          outcome: {
            recommendation: "Train normally. Warm up thoroughly and monitor during the session.",
            reason: "General muscle soreness is a normal response to training and does not indicate tissue damage. Movement and light loading often reduce soreness and stiffness. If soreness persists or worsens during warm-up, reduce intensity.",
          },
        },
        {
          label: "Sharp, localised pain that worsens with specific movements",
          outcome: {
            recommendation: "Do not train the affected area. Modify exercises around the pain. If pain persists, seek assessment.",
            reason: "Sharp, localised pain is a warning signal. Training through it risks converting a minor issue into a significant injury. The affected area should be rested or trained around, not pushed through.",
            coachNotes: "For gym: substitute exercises that do not provoke the pain. For running: if pain affects gait, do not run. Cross-train (cycling, swimming) if available. If pain persists for more than 2 weeks or affects daily activities, see a physiotherapist.",
            scientificNotes: "The 'no pain, no gain' philosophy is not supported by evidence for injury management. Pain during movement indicates tissue stress. Continuing to load painful tissues can convert tendinopathy, stress reactions, and minor tears into chronic or severe injuries requiring extended time away from training.",
          },
        },
        {
          label: "Joint pain (knee, ankle, hip, shoulder), not muscle soreness",
          outcome: {
            recommendation: "Stop the provocative movement. Rest the joint for 48–72 hours. Resume with reduced load if pain-free.",
            reason: "Joint pain is distinct from muscle soreness and warrants greater caution. Joint structures (cartilage, ligaments, menisci) heal slowly and are poorly vascularised. Pushing through joint pain risks structural damage.",
            coachNotes: "If joint pain persists beyond 72 hours, recurs with specific movements, or is accompanied by swelling, seek physiotherapy assessment. Do not self-diagnose joint issues as 'just tightness', the cost of being wrong is high.",
          },
        },
      ],
    },
  },
  {
    id: "travel",
    title: "Travel",
    description: "How to manage training when travelling for work or personal reasons.",
    trigger: "I'm travelling. How should I adjust training?",
    rootNode: {
      id: "travel-duration",
      question: "How long are you travelling for?",
      options: [
        {
          label: "1–2 days",
          outcome: {
            recommendation: "Train before departure and resume upon return. Do not stress about missed sessions.",
            reason: "Two missed days have zero long-term impact. The stress of trying to fit training into a tight travel schedule is more harmful than the missed sessions. Resume normal programming on return.",
            coachNotes: "If you genuinely have time and access and want to train, do an easy session. Do not force it. Travel is stressful enough without adding training guilt.",
          },
        },
        {
          label: "3–5 days",
          outcome: {
            recommendation: "Prioritise easy runs. Accept that gym training may be limited. Maintain protein and hydration.",
            reason: "Short trips disrupt routine but do not cause detraining. One or two easy runs maintain the running habit and provide some aerobic stimulus. Gym training can be deprioritised, strength detraining begins after approximately 7–10 days.",
            coachNotes: "Pack running shoes and shorts, the smallest possible commitment that makes running easy. A 20-minute easy run from a hotel maintains the habit. Do not aim for quality sessions unless genuinely fresh and motivated.",
          },
        },
        {
          label: "1–2 weeks",
          outcome: {
            recommendation: "Train as practically as possible. Prioritise running over gym. Accept reduced volume and intensity.",
            reason: "Two weeks without training begins to produce measurable detraining. One to two runs and one gym session per week during travel significantly blunts this effect. The goal is maintenance, not progression.",
            coachNotes: "Hotel gyms are limited. A bodyweight session (push-ups, lunges, split squats, planks) in 20 minutes maintains neuromuscular patterns. Running is easier to maintain, a 30-minute easy run requires only shoes and a safe route. See the Travel Nutrition page for eating strategies.",
          },
        },
      ],
    },
  },
  {
    id: "busy-week",
    title: "Busy Work Week",
    description: "How to adjust training when work demands are temporarily high.",
    trigger: "Work is extremely busy this week. How do I manage training?",
    rootNode: {
      id: "time-available",
      question: "How many sessions can you realistically complete this week?",
      options: [
        {
          label: "4–5 sessions (some reduction)",
          outcome: {
            recommendation: "Keep: 1 quality run, 1 long run, 2 gym sessions. Drop: 1 gym, 1 Zone 2.",
            reason: "When time is limited, preserve the highest-value sessions. Quality runs and long runs drive the most important adaptations. Gym maintenance requires fewer sessions than progression. Zone 2 is valuable but has the lowest immediate ROI per session.",
            coachNotes: "Two gym sessions (instead of three) for one week has zero long-term impact. Two runs (quality + long) preserves the critical running stimulus. This is a temporary adjustment, not a new programme.",
          },
        },
        {
          label: "2–3 sessions (significant reduction)",
          outcome: {
            recommendation: "Keep: 1 quality run, 1 gym session, 1 long run if possible. Drop: everything else.",
            reason: "At very low session counts, preserve variety. One run, one gym session, and one long run maintain stimulus across all domains. Training quality is more important than duration, a focused 25-minute session is better than a distracted 45-minute session.",
            coachNotes: "Accept that this week is about maintenance, not progress. Do not attempt to compensate by making sessions harder, this increases fatigue without proportionate benefit when recovery is already compromised by work stress.",
          },
        },
        {
          label: "0–1 sessions (barely any time)",
          outcome: {
            recommendation: "Do what you can. A single 20-minute run or 15-minute bodyweight session. Accept the week for what it is.",
            reason: "One week of minimal training causes negligible detraining. The stress of worrying about missed training often exceeds the stress of the training itself. Return to normal programming next week.",
            coachNotes: "If you can do literally one session: make it a run. Running detraining occurs slightly faster than strength detraining. A single 20–30 minute run at any intensity maintains the habit and provides some stimulus. Resume normal programming next Monday.",
          },
        },
      ],
    },
  },
  {
    id: "race-week",
    title: "Race Week",
    description: "Final preparations for IPPT or other target events.",
    trigger: "It's race week. What should I do?",
    rootNode: {
      id: "days-until-race",
      question: "How many days until the race?",
      options: [
        {
          label: "6–7 days out",
          outcome: {
            recommendation: "Normal training this week. Begin reducing volume next week.",
            reason: "A full week out, normal training is still appropriate. The adaptations from this week's sessions will still be available on race day. Volume reduction (taper) begins 5–7 days before the event.",
            coachNotes: "This is the last week of normal training. Do not do anything new or unusual, no new exercises, no new supplements, no dramatically different nutrition. Keep everything familiar.",
          },
        },
        {
          label: "3–5 days out",
          outcome: {
            recommendation: "Reduce gym volume by 50%. Maintain running intensity but reduce volume. Prioritise sleep and hydration.",
            reason: "The taper has begun. Gym volume reduction preserves strength while dissipating fatigue. Running intensity is maintained (to preserve neuromuscular patterns) but volume is reduced (to clear fatigue). Sleep and hydration are the highest training priorities this week.",
            coachNotes: "Do one short quality session (e.g., 3 × 400 m at race pace, not maximal) 3–4 days before the race to maintain sharpness. Do not do a hard session within 48 hours of the race, it will not improve fitness and may leave residual fatigue.",
          },
        },
        {
          label: "1–2 days out",
          outcome: {
            recommendation: "Rest or very light movement. Walk, stretch gently, do a 10-minute shakeout jog if desired. Prioritise sleep, hydration, and familiar food.",
            reason: "No training in the final 48 hours can improve race performance. Training can only create fatigue that degrades it. Rest, sleep, hydrate, eat familiar food. The physiological work is done, the remaining task is to arrive fresh.",
            coachNotes: "The hardest discipline of race week: doing nothing. After months of consistent training, the impulse to 'do one more session' is strong. Resist it. Trust your preparation. You cannot get fitter in 48 hours; you can only get tired.",
            scientificNotes: "Tapering research consistently shows that training volume reductions of 40–60% for 7–14 days before competition improve performance by 2–5% in endurance events. The mechanism is fatigue dissipation without fitness loss, fitness decays slowly, fatigue dissipates quickly. The taper exploits this temporal asymmetry.",
          },
        },
      ],
    },
  },
  {
    id: "sick-day",
    title: "Sick Day",
    description: "Whether to train when feeling unwell, distinguishing between minor illness and genuine sickness.",
    trigger: "I feel unwell. Should I train?",
    rootNode: {
      id: "symptom-location",
      question: "Where are your symptoms?",
      description: "The 'neck check' is a simple rule of thumb for training while unwell.",
      options: [
        {
          label: "Above the neck only (runny nose, mild sore throat, sneezing)",
          outcome: {
            recommendation: "Light training at reduced intensity is acceptable. Do not do high-intensity work.",
            reason: "Above-the-neck symptoms with normal energy levels generally do not worsen with light-to-moderate exercise. Easy Zone 2 running or light gym work is acceptable. Avoid high-intensity training; the immune system is already under stress.",
            coachNotes: "If symptoms worsen during the session, stop immediately. The 'neck check' is a guideline, not a rule, if you feel genuinely unwell, rest regardless of where symptoms are located.",
          },
        },
        {
          label: "Below the neck (chest congestion, cough, body aches, fever, stomach issues)",
          outcome: {
            recommendation: "Do not train. Rest completely until symptoms resolve plus one additional day.",
            reason: "Below-the-neck symptoms indicate systemic illness. Training during systemic illness stresses the immune system further, prolongs recovery, and in rare cases can lead to myocarditis (heart muscle inflammation), a potentially serious condition.",
            coachNotes: "Return to training gradually: first day back, do an easy session at 50% normal volume. If that feels normal, resume regular training the following day. Do not jump straight back into high-intensity work after illness.",
            scientificNotes: "Exercise causes temporary immune suppression (the 'open window' hypothesis). Training while systemically ill compounds this suppression, potentially prolonging illness and increasing risk of secondary infection. The risk of viral myocarditis (while rare) is elevated when high-intensity exercise is performed during or shortly after systemic viral illness. This risk, though small, has severe consequences, making rest during below-the-neck illness the only prudent choice.",
          },
        },
      ],
    },
  },
];
