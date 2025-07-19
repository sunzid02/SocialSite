// seedPosts.js
const mongoose = require('mongoose');
// Pull your Mongo URI from config/keys.js
const { mongoURI } = require('../config/keys');
// Import your Post model
const Post = require('../models/Post');

// ----- Dummy Data -----
const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    text: 'Just finished my first coding challenge! 🚀',
    name: 'Alice Smith',
    avatar: 'https://i.pravatar.cc/200?img=5',
    user: new mongoose.Types.ObjectId(),
    likes: [
      { user: new mongoose.Types.ObjectId() },
      { user: new mongoose.Types.ObjectId() }
    ],
    comments: [
      {
        _id: new mongoose.Types.ObjectId(),
        text: 'Congrats, well done!',
        name: 'Bob Jones',
        avatar: 'https://i.pravatar.cc/200?img=12',
        user: new mongoose.Types.ObjectId(),
        date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      }
    ],
    date: new Date(Date.now() - 5 * 60 * 60 * 1000)       // 5 hours ago
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: 'Does anyone know a good React tutorial?',
    name: 'Carol Danvers',
    avatar: 'https://i.pravatar.cc/200?img=22',
    user: new mongoose.Types.ObjectId(),
    likes: [],
    comments: [],
    date: new Date(Date.now() - 24 * 60 * 60 * 1000)      // 1 day ago
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: 'Loving the new features in ES2025!',
    name: 'Dave Lee',
    avatar: 'https://i.pravatar.cc/200?img=8',
    user: new mongoose.Types.ObjectId(),
    likes: [
      { user: new mongoose.Types.ObjectId() }
    ],
    comments: [
      {
        _id: new mongoose.Types.ObjectId(),
        text: 'Which feature is your favorite?',
        name: 'Alice Smith',
        avatar: 'https://i.pravatar.cc/200?img=5',
        user: new mongoose.Types.ObjectId(),
        date: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
      }
    ],
    date: new Date(Date.now() - 36 * 60 * 60 * 1000)      // 1.5 days ago
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: 'Built my first full-stack MERN app today!',
    name: 'Eve Torres',
    avatar: 'https://i.pravatar.cc/200?img=15',
    user: new mongoose.Types.ObjectId(),
    likes: [
      { user: new mongoose.Types.ObjectId() },
      { user: new mongoose.Types.ObjectId() },
      { user: new mongoose.Types.ObjectId() }
    ],
    comments: [],
    date: new Date(Date.now() - 72 * 60 * 60 * 1000)      // 3 days ago
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: 'Who’s up for a hackathon this weekend?',
    name: 'Frank Castle',
    avatar: 'https://i.pravatar.cc/200?img=30',
    user: new mongoose.Types.ObjectId(),
    likes: [],
    comments: [
      {
        _id: new mongoose.Types.ObjectId(),
        text: 'Count me in!',
        name: 'Carol Danvers',
        avatar: 'https://i.pravatar.cc/200?img=22',
        user: new mongoose.Types.ObjectId(),
        date: new Date(Date.now() - 20 * 60 * 1000)       // 20 minutes ago
      }
    ],
    date: new Date()                                      // now
  }
];

// ----- Seed Function -----
async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Existing posts removed');

    // Insert dummy posts
    await Post.insertMany(posts);
    console.log('Dummy posts inserted');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
