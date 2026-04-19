export const cities = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    monument: '🏛️',
    landmark: 'Gateway of India',
    color: '#4f7dfd',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 'delhi',
    name: 'Delhi',
    monument: '🕌',
    landmark: 'India Gate',
    color: '#f34b5c',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    monument: '🏰',
    landmark: 'Vidhana Soudha',
    color: '#fbab7e',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
  },
  {
    id: 'pune',
    name: 'Pune',
    monument: '⛩️',
    landmark: 'Shaniwar Wada',
    color: '#fcd873',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    monument: '🕍',
    landmark: 'Charminar',
    color: '#43e97b',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    monument: '⛪',
    landmark: 'Marina Beach',
    color: '#a18cd1',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)'
  }
];

export const events = [
  {
    id: 'evt-1',
    cityId: 'mumbai',
    name: 'Designer Meetup 2026',
    category: 'Meetup',
    date: 'May 24, 2026',
    time: '10:00 AM – 6:00 PM',
    venue: 'Jio World Convention Centre, BKC',
    price: 'Free',
    priceNum: 0,
    color: '#4f7dfd',
    seats: { rows: 8, cols: 10 },
    description: 'Connect with 500+ designers from across India. Explore the latest trends in UI/UX, branding, and visual design through keynotes, workshops, and networking sessions.',
    highlights: ['Keynote by industry leaders', 'Hands-on Figma workshop', 'Portfolio review sessions', 'Networking dinner'],
    speakers: ['Rahul Verma', 'Priya Sharma', 'Amit Desai']
  },
  {
    id: 'evt-2',
    cityId: 'mumbai',
    name: 'UI/UX Workshop',
    category: 'Workshop',
    date: 'June 5, 2026',
    time: '9:00 AM – 1:00 PM',
    venue: 'WeWork BKC, Mumbai',
    price: '₹499',
    priceNum: 499,
    color: '#f34b5c',
    seats: { rows: 5, cols: 8 },
    description: 'A hands-on workshop covering Figma prototyping, user research methodologies, and building scalable design systems from scratch.',
    highlights: ['Figma masterclass', 'User research techniques', 'Design system workshop', 'Certificate included'],
    speakers: ['Sneha Patil', 'Kunal Mehta']
  },
  {
    id: 'evt-3',
    cityId: 'mumbai',
    name: 'Branding Masterclass',
    category: 'Masterclass',
    date: 'June 18, 2026',
    time: '2:00 PM – 5:00 PM',
    venue: 'Soho House, Juhu',
    price: '₹799',
    priceNum: 799,
    color: '#fbab7e',
    seats: { rows: 4, cols: 6 },
    description: 'Learn brand identity, colour theory, and typography from industry veterans who have built brands for Fortune 500 companies.',
    highlights: ['Brand strategy frameworks', 'Colour theory deep-dive', 'Typography workshop', 'Live brand audit'],
    speakers: ['Vikram Singh']
  },
  {
    id: 'evt-4',
    cityId: 'delhi',
    name: 'Tech & Design Summit',
    category: 'Summit',
    date: 'May 30, 2026',
    time: '9:00 AM – 7:00 PM',
    venue: 'Pragati Maidan, New Delhi',
    price: '₹999',
    priceNum: 999,
    color: '#6c63ff',
    seats: { rows: 10, cols: 12 },
    description: 'The largest tech-design crossover event in North India. Two stages, 20+ speakers, and immersive demo zones.',
    highlights: ['2 parallel tracks', '20+ speakers', 'Demo zone with startups', 'After-party included'],
    speakers: ['Arun Kumar', 'Neha Gupta', 'Rajesh Jain', 'Simran Kaur']
  },
  {
    id: 'evt-5',
    cityId: 'delhi',
    name: 'Product Design Bootcamp',
    category: 'Bootcamp',
    date: 'June 12, 2026',
    time: '10:00 AM – 4:00 PM',
    venue: '91springboard, Gurugram',
    price: '₹1,499',
    priceNum: 1499,
    color: '#f34b5c',
    seats: { rows: 6, cols: 8 },
    description: 'Intensive one-day bootcamp on end-to-end product design — from ideation and wireframing to high-fidelity prototypes.',
    highlights: ['End-to-end product design', 'Real project brief', 'Mentor feedback', 'Portfolio-ready project'],
    speakers: ['Ankita Sharma', 'Deepak Nair']
  },
  {
    id: 'evt-6',
    cityId: 'bangalore',
    name: 'Startup Design Night',
    category: 'Networking',
    date: 'May 28, 2026',
    time: '6:00 PM – 10:00 PM',
    venue: 'Church Street Social, Bangalore',
    price: 'Free',
    priceNum: 0,
    color: '#43e97b',
    seats: { rows: 6, cols: 10 },
    description: 'An evening of design talks, startup pitches, and networking with Bangalore\'s vibrant tech community.',
    highlights: ['Lightning talks', 'Startup design showcases', 'Open bar networking', 'Job board'],
    speakers: ['Karthik Raman', 'Divya Mohan']
  },
  {
    id: 'evt-7',
    cityId: 'bangalore',
    name: 'Motion Design Workshop',
    category: 'Workshop',
    date: 'June 8, 2026',
    time: '10:00 AM – 2:00 PM',
    venue: 'Thought Factory, Bangalore',
    price: '₹699',
    priceNum: 699,
    color: '#a18cd1',
    seats: { rows: 5, cols: 6 },
    description: 'Learn Lottie animations, micro-interactions, and motion principles for delightful user experiences.',
    highlights: ['After Effects basics', 'Lottie for developers', 'Motion principles', 'Plugin toolkit'],
    speakers: ['Varun Menon']
  },
  {
    id: 'evt-8',
    cityId: 'pune',
    name: 'Creative Coding Jam',
    category: 'Hackathon',
    date: 'June 1, 2026',
    time: '9:00 AM – 9:00 PM',
    venue: 'CoWrks, Pune',
    price: '₹299',
    priceNum: 299,
    color: '#fcd873',
    seats: { rows: 8, cols: 8 },
    description: '12-hour creative coding hackathon — build generative art, interactive installations, or creative web experiences.',
    highlights: ['12-hour hackathon', 'Prizes worth ₹50K', 'Free merch', 'Meals included'],
    speakers: ['Tanay Pratap', 'Ruchi Joshi']
  },
  {
    id: 'evt-9',
    cityId: 'hyderabad',
    name: 'Design Leadership Forum',
    category: 'Forum',
    date: 'June 15, 2026',
    time: '11:00 AM – 5:00 PM',
    venue: 'T-Hub, Hyderabad',
    price: '₹1,999',
    priceNum: 1999,
    color: '#f093fb',
    seats: { rows: 5, cols: 10 },
    description: 'Exclusive forum for design managers and leads — discuss hiring, team building, and scaling design orgs.',
    highlights: ['Invite-only roundtables', 'Executive networking', 'Case studies', 'Dinner included'],
    speakers: ['Suresh Reddy', 'Meera Iyer', 'Arjun Kapoor']
  },
  {
    id: 'evt-10',
    cityId: 'chennai',
    name: 'Illustration Festival',
    category: 'Festival',
    date: 'June 22, 2026',
    time: '10:00 AM – 8:00 PM',
    venue: 'IIT Madras Research Park',
    price: '₹399',
    priceNum: 399,
    color: '#fbc2eb',
    seats: { rows: 7, cols: 10 },
    description: 'A full-day illustration festival featuring live art, digital painting workshops, and an artist marketplace.',
    highlights: ['Live mural painting', 'Digital art workshops', 'Artist marketplace', 'Community gallery'],
    speakers: ['Lakshmi Narayan', 'Pradeep Kumar']
  }
];

export const getEventsByCity = (cityId) => events.filter(e => e.cityId === cityId);
export const getEventById = (eventId) => events.find(e => e.id === eventId);
export const getCityById = (cityId) => cities.find(c => c.id === cityId);
