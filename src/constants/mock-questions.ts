export type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject?: string;
  topic?: string;
};

// Biology - Cell Division
export const BIOLOGY_QUESTIONS: Question[] = [
  {
    question: 'What happens during metaphase of mitosis?',
    options: [
      'Chromosomes align at the cell equator',
      'DNA is replicated in the nucleus',
      'The cell membrane begins to pinch',
      'The nuclear envelope breaks down',
    ],
    correctAnswer: 0,
    explanation: 'During metaphase, chromosomes line up along the metaphase plate at the cell equator.',
    subject: 'Biology',
    topic: 'Cell Division',
  },
  {
    question: 'Which organelle is responsible for protein synthesis?',
    options: [
      'Mitochondria',
      'Ribosome',
      'Golgi apparatus',
      'Lysosome',
    ],
    correctAnswer: 1,
    explanation: 'Ribosomes are the cellular machinery responsible for synthesizing proteins.',
    subject: 'Biology',
    topic: 'Cell Division',
  },
  {
    question: 'What is the primary function of the mitochondria?',
    options: [
      'Photosynthesis',
      'Protein packaging',
      'ATP production',
      'Lipid synthesis',
    ],
    correctAnswer: 2,
    explanation: 'Mitochondria are the powerhouse of the cell, producing ATP through cellular respiration.',
    subject: 'Biology',
    topic: 'Cell Division',
  },
  {
    question: 'Which process occurs during interphase?',
    options: [
      'Chromosome separation',
      'DNA replication',
      'Cytokinesis',
      'Nuclear envelope reformation',
    ],
    correctAnswer: 1,
    explanation: 'During interphase, the cell grows and replicates its DNA in preparation for division.',
    subject: 'Biology',
    topic: 'Cell Division',
  },
  {
    question: 'What structure controls what enters and exits the cell?',
    options: [
      'Cell wall',
      'Cytoplasm',
      'Cell membrane',
      'Nucleus',
    ],
    correctAnswer: 2,
    explanation: 'The cell membrane is selectively permeable, controlling the movement of substances in and out of the cell.',
    subject: 'Biology',
    topic: 'Cell Division',
  },
];

// Mathematics - Algebra
export const MATH_QUESTIONS: Question[] = [
  {
    question: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 20'],
    correctAnswer: 0,
    explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5.',
    subject: 'Mathematics',
    topic: 'Algebra',
  },
  {
    question: 'Which of these is equivalent to (x + 3)²?',
    options: ['x² + 6', 'x² + 9', 'x² + 6x + 9', 'x² + 3x + 9'],
    correctAnswer: 2,
    explanation: 'Using FOIL: (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9.',
    subject: 'Mathematics',
    topic: 'Algebra',
  },
  {
    question: 'If f(x) = 3x - 2, what is f(4)?',
    options: ['10', '12', '14', '8'],
    correctAnswer: 0,
    explanation: 'Substitute x = 4: f(4) = 3(4) - 2 = 12 - 2 = 10.',
    subject: 'Mathematics',
    topic: 'Algebra',
  },
  {
    question: 'What is the slope of the line y = 4x + 7?',
    options: ['7', '4', '-4', '11'],
    correctAnswer: 1,
    explanation: 'In slope-intercept form y = mx + b, m is the slope. Here m = 4.',
    subject: 'Mathematics',
    topic: 'Algebra',
  },
  {
    question: 'Solve for y: 3y - 6 = 12',
    options: ['y = 2', 'y = 4', 'y = 6', 'y = 8'],
    correctAnswer: 2,
    explanation: 'Add 6 to both sides: 3y = 18, then divide by 3: y = 6.',
    subject: 'Mathematics',
    topic: 'Algebra',
  },
];

// English - Grammar
export const ENGLISH_QUESTIONS: Question[] = [
  {
    question: 'Which sentence is grammatically correct?',
    options: [
      'Me and John went to the store.',
      'John and I went to the store.',
      'John and me went to the store.',
      'I and John went to the store.',
    ],
    correctAnswer: 1,
    explanation: 'Use "I" as a subject pronoun, and put the other person first: "John and I".',
    subject: 'English',
    topic: 'Grammar',
  },
  {
    question: 'What is the past participle of "to write"?',
    options: ['wrote', 'writed', 'written', 'writing'],
    correctAnswer: 2,
    explanation: 'The past participle of "write" is "written" (have/had written).',
    subject: 'English',
    topic: 'Grammar',
  },
  {
    question: 'Which is the correct use of a semicolon?',
    options: [
      'I love pizza; it\'s delicious.',
      'I love; pizza.',
      'I; love pizza.',
      'I love pizza; and pasta.',
    ],
    correctAnswer: 0,
    explanation: 'A semicolon connects two independent clauses that are closely related.',
    subject: 'English',
    topic: 'Grammar',
  },
  {
    question: 'Identify the direct object: "She kicked the ball."',
    options: ['She', 'kicked', 'the ball', 'None'],
    correctAnswer: 2,
    explanation: 'The direct object receives the action of the verb. "The ball" is what was kicked.',
    subject: 'English',
    topic: 'Grammar',
  },
  {
    question: 'Which word is a preposition?',
    options: ['quickly', 'under', 'happy', 'runs'],
    correctAnswer: 1,
    explanation: '"Under" is a preposition showing position or relationship between words.',
    subject: 'English',
    topic: 'Grammar',
  },
];

// Physics - Kinematics
export const PHYSICS_QUESTIONS: Question[] = [
  {
    question: 'What is the SI unit of acceleration?',
    options: ['m/s', 'kg·m/s', 'm/s²', 'N'],
    correctAnswer: 2,
    explanation: 'Acceleration is the rate of change of velocity, measured in meters per second squared (m/s²).',
    subject: 'Physics',
    topic: 'Kinematics',
  },
  {
    question: 'A car accelerates from rest to 20 m/s in 4 seconds. What is its acceleration?',
    options: ['5 m/s²', '80 m/s²', '10 m/s²', '4 m/s²'],
    correctAnswer: 0,
    explanation: 'Using a = (v - u)/t: a = (20 - 0)/4 = 5 m/s².',
    subject: 'Physics',
    topic: 'Kinematics',
  },
  {
    question: 'What does the slope of a velocity-time graph represent?',
    options: ['Distance', 'Displacement', 'Acceleration', 'Speed'],
    correctAnswer: 2,
    explanation: 'The slope of a velocity-time graph represents the acceleration of the object.',
    subject: 'Physics',
    topic: 'Kinematics',
  },
  {
    question: 'An object travels 100m in 20s at constant speed. What is its speed?',
    options: ['2 m/s', '5 m/s', '10 m/s', '20 m/s'],
    correctAnswer: 1,
    explanation: 'Speed = distance/time = 100m/20s = 5 m/s.',
    subject: 'Physics',
    topic: 'Kinematics',
  },
  {
    question: 'What is displacement?',
    options: [
      'Total distance traveled',
      'Change in position with direction',
      'Speed over time',
      'Final velocity minus initial velocity',
    ],
    correctAnswer: 1,
    explanation: 'Displacement is the change in position from start to end, including direction (a vector).',
    subject: 'Physics',
    topic: 'Kinematics',
  },
];

// Chemistry - Ionic Bonding
export const CHEMISTRY_QUESTIONS: Question[] = [
  {
    question: 'What type of bond forms when electrons are transferred?',
    options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'],
    correctAnswer: 1,
    explanation: 'Ionic bonds form when one atom transfers electrons to another, creating charged ions.',
    subject: 'Chemistry',
    topic: 'Ionic Bonding',
  },
  {
    question: 'What charge does a sodium ion (Na⁺) have?',
    options: ['-1', '+1', '-2', '+2'],
    correctAnswer: 1,
    explanation: 'Sodium loses one electron to achieve a stable configuration, forming Na⁺ with a +1 charge.',
    subject: 'Chemistry',
    topic: 'Ionic Bonding',
  },
  {
    question: 'Which compound is formed by ionic bonding?',
    options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'],
    correctAnswer: 2,
    explanation: 'NaCl (table salt) forms when sodium transfers an electron to chlorine, creating ionic bonds.',
    subject: 'Chemistry',
    topic: 'Ionic Bonding',
  },
  {
    question: 'Ionic compounds typically have:',
    options: [
      'Low melting points',
      'High melting points',
      'No electrical conductivity',
      'Soft, flexible structures',
    ],
    correctAnswer: 1,
    explanation: 'Ionic compounds have high melting points due to strong electrostatic forces between ions.',
    subject: 'Chemistry',
    topic: 'Ionic Bonding',
  },
  {
    question: 'What is formed when a metal reacts with a non-metal?',
    options: ['Covalent compound', 'Ionic compound', 'Metallic compound', 'Molecular compound'],
    correctAnswer: 1,
    explanation: 'Metals lose electrons and non-metals gain them, forming ionic compounds.',
    subject: 'Chemistry',
    topic: 'Ionic Bonding',
  },
];

// History - Cold War
export const HISTORY_QUESTIONS: Question[] = [
  {
    question: 'When did the Cold War begin?',
    options: ['1939', '1945', '1950', '1960'],
    correctAnswer: 1,
    explanation: 'The Cold War began shortly after World War II ended in 1945, as tensions between the US and USSR grew.',
    subject: 'History',
    topic: 'Cold War',
  },
  {
    question: 'What was the Berlin Wall built to do?',
    options: [
      'Protect West Berlin from invasion',
      'Prevent East Germans from fleeing to the West',
      'Mark the border of Germany',
      'Create jobs for construction workers',
    ],
    correctAnswer: 1,
    explanation: 'East Germany built the Berlin Wall in 1961 to prevent its citizens from defecting to West Berlin.',
    subject: 'History',
    topic: 'Cold War',
  },
  {
    question: 'Which crisis brought the world closest to nuclear war?',
    options: ['Berlin Blockade', 'Korean War', 'Cuban Missile Crisis', 'Vietnam War'],
    correctAnswer: 2,
    explanation: 'The 1962 Cuban Missile Crisis brought the US and USSR to the brink of nuclear war.',
    subject: 'History',
    topic: 'Cold War',
  },
  {
    question: 'What policy aimed to stop the spread of communism?',
    options: ['Détente', 'Containment', 'Isolationism', 'Imperialism'],
    correctAnswer: 1,
    explanation: 'Containment was the US policy to prevent the spread of communism to new countries.',
    subject: 'History',
    topic: 'Cold War',
  },
  {
    question: 'When did the Cold War officially end?',
    options: ['1985', '1989', '1991', '1995'],
    correctAnswer: 2,
    explanation: 'The Cold War ended in 1991 with the dissolution of the Soviet Union.',
    subject: 'History',
    topic: 'Cold War',
  },
];

// Default export for backward compatibility (Biology)
export const MOCK_QUESTIONS: Question[] = BIOLOGY_QUESTIONS;

// Get questions by subject
export function getQuestionsBySubject(subject: string): Question[] {
  const subjectMap: Record<string, Question[]> = {
    Biology: BIOLOGY_QUESTIONS,
    Mathematics: MATH_QUESTIONS,
    English: ENGLISH_QUESTIONS,
    Physics: PHYSICS_QUESTIONS,
    Chemistry: CHEMISTRY_QUESTIONS,
    History: HISTORY_QUESTIONS,
  };

  return subjectMap[subject] || BIOLOGY_QUESTIONS;
}
