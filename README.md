# SMIT - Saylani Mass IT Training

A modern web application for Saylani Mass IT Training (SMIT) - a free IT training program for students offered by Saylani Welfare International Trust.

## 🎯 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Course Management**: Display comprehensive course information
- **Interactive Navigation**: Tab-based navigation between sections
- **Mobile Responsive**: Works perfectly on all devices
- **Firebase Ready**: Configured for easy deployment on Firebase Hosting

## 🚀 Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Firebase Hosting
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Firebase CLI (for deployment)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smit-courses
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Builds and deploys to Firebase

## 🎨 Project Structure

```
smit-courses/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── firebase.json       # Firebase hosting configuration
└── README.md          # Project documentation
```

## 🔥 Firebase Deployment

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase (if not already done)
```bash
firebase init hosting
```

### 4. Deploy to Firebase
```bash
npm run deploy
```

## 📱 Features Overview

### Home Page
- Hero section with call-to-action buttons
- Statistics showcasing SMIT's achievements
- Course listings with detailed information

### Courses Section
- 6 comprehensive IT courses:
  - Web Development
  - Mobile App Development
  - Database Management
  - Cybersecurity
  - Cloud Computing
  - AI & Machine Learning

### About Section
- Information about Saylani Welfare International Trust
- Mission and values
- Why choose SMIT

### Contact Section
- Contact information
- Contact form
- Location details

## 🎨 Customization

### Colors
The project uses custom SMIT colors defined in `tailwind.config.js`:
- `smit-blue`: #1e40af
- `smit-green`: #059669
- `smit-orange`: #ea580c

### Adding New Courses
To add new courses, edit the `courses` array in `src/App.js`:

```javascript
const courses = [
  {
    id: 7,
    title: "New Course Title",
    description: "Course description...",
    duration: "X months",
    students: 100,
    rating: 4.5,
    icon: <YourIcon className="w-8 h-8 text-color" />,
    features: ["Feature 1", "Feature 2", "Feature 3"]
  }
];
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for Saylani Welfare International Trust and is intended for educational purposes.

## 📞 Contact

- **Organization**: Saylani Welfare International Trust
- **Department**: Saylani Mass IT Training (SMIT)
- **Location**: Faisalabad, Pakistan
- **Email**: info@smit.edu.pk

## 🙏 Acknowledgments

- Saylani Welfare International Trust for providing free education
- React.js community for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons

---

**Made with ❤️ for SMIT Students** 