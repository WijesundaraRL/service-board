const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JobRequest = require('./src/models/JobRequest');

dotenv.config();

const sampleJobs = [
  {
    title: 'Leaking kitchen tap needs fixing',
    description: 'My kitchen tap has been leaking for about a week now. Water is dripping constantly even when fully closed. Need a plumber to come and fix or replace it as soon as possible.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'John Smith',
    contactEmail: 'john.smith@example.com',
    status: 'Open',
  },
  {
    title: 'Bathroom rewire needed',
    description: 'The electrics in my bathroom are outdated and I need a full rewire done to meet current safety standards. Had a sparky look at it and he said it needs replacing entirely.',
    category: 'Electrical',
    location: 'Edinburgh',
    contactName: 'Sarah Connor',
    contactEmail: 'sarah.c@example.com',
    status: 'Open',
  },
  {
    title: 'Living room and hallway painting',
    description: 'Looking for a painter to repaint my living room and hallway. Walls need a light sanding first as there are some rough patches. Prefer neutral tones, paint can be discussed.',
    category: 'Painting',
    location: 'Manchester',
    contactName: 'David Lee',
    contactEmail: 'davidlee@example.com',
    status: 'In Progress',
  },
  {
    title: 'Kitchen cabinet doors replacement',
    description: 'Several of my kitchen cabinet doors are warped and one has a broken hinge. Need a joiner to replace the doors and make sure everything is properly aligned and fitted.',
    category: 'Joinery',
    location: 'Birmingham',
    contactName: 'Emma Wilson',
    contactEmail: 'emma.w@example.com',
    status: 'Open',
  },
  {
    title: 'Boiler not producing hot water',
    description: 'My boiler is running but not heating the water properly. Radiators are fine but the hot water tap runs cold after about two minutes. Boiler is about 8 years old.',
    category: 'Plumbing',
    location: 'Leeds',
    contactName: 'Michael Brown',
    contactEmail: 'mbrown@example.com',
    status: 'Open',
  },
  {
    title: 'Garden shed electrical supply',
    description: 'I want to run a power supply out to my garden shed for lighting and a couple of plug sockets. Distance from the house is about 15 metres. Need a qualified electrician.',
    category: 'Electrical',
    location: 'Bristol',
    contactName: 'Olivia Taylor',
    contactEmail: 'olivia.t@example.com',
    status: 'Closed',
  },
  {
    title: 'Fence panels need replacing',
    description: 'Three fence panels at the back of my garden were damaged in the last storm. Need a joiner or handyman to replace them. The posts are still solid so just the panels need doing.',
    category: 'Joinery',
    location: 'Glasgow',
    contactName: 'James Anderson',
    contactEmail: 'james.a@example.com',
    status: 'Open',
  },
  {
    title: 'Full exterior house painting',
    description: 'Looking for a painter to paint the full exterior of my semi-detached house. Last painted about 7 years ago and the paint is starting to peel in places. Need a quote first.',
    category: 'Painting',
    location: 'Liverpool',
    contactName: 'Sophie Martin',
    contactEmail: 'sophiem@example.com',
    status: 'Open',
  },
  {
    title: 'Blocked outdoor drain',
    description: 'The drain at the side of my house is completely blocked and water is pooling when it rains. I have tried clearing it myself but cannot get to the blockage. Need a plumber.',
    category: 'Plumbing',
    location: 'Edinburgh',
    contactName: 'Robert Johnson',
    contactEmail: 'robert.j@example.com',
    status: 'In Progress',
  },
  {
    title: 'Loft conversion carpentry work',
    description: 'I am having a loft conversion done and need a joiner to fit the staircase, install two Velux window frames, and board out the floor. Looking for someone with loft experience.',
    category: 'Joinery',
    location: 'Manchester',
    contactName: 'Charlotte Davies',
    contactEmail: 'charlotte.d@example.com',
    status: 'Open',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await JobRequest.deleteMany({});
    console.log('Existing jobs cleared');

    await JobRequest.insertMany(sampleJobs);
    console.log(`${sampleJobs.length} jobs inserted successfully`);

  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  }
};

seedDatabase();