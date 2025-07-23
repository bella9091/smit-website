import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, BookOpen, Code, Shield, Users, Database, Zap, 
  GraduationCap, Clock, MapPin, Star, ArrowRight, Phone
} from 'lucide-react';
import { courses as coursesData } from './coursesData';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showZoom, setShowZoom] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // SMIT News/Update text (edit here for any length of news)
  const smitNews =
    "📢 Exciting News for All Aspiring Students! Admissions for Web & Mobile App Development and AI & Data Science courses will be opening in the coming days! This is a golden opportunity for you to learn the latest technologies in the field of Web and Artificial Intelligence. Saylani Mass IT Training (SMIT) is proud to offer these highly in-demand courses to help you build a successful career — and the best part is, you can apply from the comfort of your home! Don’t miss out on this chance to upskill and grow in the tech industry. Stay connected with SMIT and take the first step toward your future!";

  const marqueeRef = useRef(null);
  const [marqueeDuration, setMarqueeDuration] = useState(36); // default duration

  useEffect(() => {
    if (marqueeRef.current) {
      const textWidth = marqueeRef.current.scrollWidth;
      const containerWidth = marqueeRef.current.parentElement.offsetWidth;
      // Set duration proportional to text length (longer = slower)
      const pxPerSecond = 100; // speed: 100px/sec
      const duration = (textWidth + containerWidth) / pxPerSecond;
      setMarqueeDuration(duration);
      marqueeRef.current.style.setProperty('--marquee-width', `-${textWidth}px`);
    }
  }, [smitNews]);

  // Map icon string to actual component for each course
  const iconMap = {
    Globe: <Globe className="w-8 h-8 text-blue-600" />,
    BookOpen: <BookOpen className="w-8 h-8 text-green-600" />,
    Code: <Code className="w-8 h-8 text-purple-600" />,
    Shield: <Shield className="w-8 h-8 text-red-600" />,
    Users: <Users className="w-8 h-8 text-indigo-600" />,
    Database: <Database className="w-8 h-8 text-pink-600" />,
    Zap: <Zap className="w-8 h-8 text-yellow-600" />,
    GraduationCap: <GraduationCap className="w-8 h-8 text-teal-600" />,
    Star: <Star className="w-8 h-8 text-orange-600" />,
  };
  const courses = coursesData.map(course => ({
    ...course,
    icon: iconMap[course.icon] || null
  }));

  // Add closed courses at the end
  const closedCourses = [
    // IT Professional (already in courses, so filter it out below)
    // Certified Computer Operator
    {
      id: 12,
      title: "Certified Computer Operator",
      description: "Learn essential computer operation skills for the workplace.",
      duration: "3 months",
      students: 0,
      rating: 0,
      icon: <Database className="w-8 h-8 text-gray-600" />, // Use a suitable icon
      features: ["MS Office", "Windows", "Internet", "Typing"],
      schedule: "",
      instructor: "Sir M. Bilal",
      level: "Beginner",
      closed: true,
      closedStatus: "Closed",
      lastBatch: "Apr to Jun",
      mergedNote: "Merged into Web Crash Course"
    }
  ];

  // Filter out IT Professional from main courses and add it to closedCourses with extra info
  // Expand 'both' genderType courses into two: one for male, one for female
  const expandedCourses = [];
  courses.forEach(c => {
    if (c.title !== 'IT Professional') {
      if (c.genderType === 'both') {
        // Male card
        expandedCourses.push({
          ...c,
          genderType: 'male',
          gender: ['Male'],
          schedule: undefined,
          scheduleMale: c.scheduleMale,
          scheduleFemale: undefined,
          cardLabel: 'Male'
        });
        // Female card
        expandedCourses.push({
          ...c,
          genderType: 'female',
          gender: ['Female'],
          schedule: undefined,
          scheduleMale: undefined,
          scheduleFemale: c.scheduleFemale,
          cardLabel: 'Female'
        });
      } else {
        expandedCourses.push(c);
      }
    }
  });
  // Sort so open courses first
  const mainCourses = [
    ...expandedCourses.filter(c => c.admissionStatus === 'Open'),
    ...expandedCourses.filter(c => c.admissionStatus !== 'Open')
  ];
  const itProfessional = courses.find(c => c.title === 'IT Professional');
  if (itProfessional) {
    closedCourses.unshift({
      ...itProfessional,
      closed: true,
      closedStatus: "Closed",
      lastBatch: "Jan to Mar",
      instructor: "Muhmmad Umair Ahmad",
      duration: "3 months",
      schedule: "",
      nameChangedNote: "Name changed into IT Support Engineer"
    });
  }
  const allCourses = [...mainCourses, ...closedCourses];

  // Footer courses list (unique titles, no IT Professional, only 5)
  const footerCourses = Array.from(
    new Set(coursesData.map(c => c.title))
  ).filter(title => title !== 'IT Professional').slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img src={process.env.PUBLIC_URL + "/smitlogo.png"} alt="SMIT Logo" className="h-12 w-auto" />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Saylani Mass IT Training Faisalabad</h1>
                <p className="text-sm text-gray-600">Free IT Education for All</p>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="https://student.saylaniwelfare.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors mr-4"
              >
                Student Portal
              </a>
              <a
                href="https://forms.saylaniwelfare.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-7 py-3 rounded-xl font-extrabold shadow-2xl border-2 border-green-700 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 overflow-hidden apply-now-fancy"
              >
                <span className="z-10">Apply Now</span>
                <ArrowRight className="w-5 h-5 ml-1 z-10 animate-bounce-x" />
                <span className="absolute inset-0 rounded-xl pointer-events-none apply-now-glow"></span>
              </a>
              <button
                onClick={() => setActiveTab('social')}
                className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Social Media
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'home'
                  ? 'border-smit-blue text-smit-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-smit-blue text-smit-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'social'
                  ? 'border-smit-blue text-smit-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Social Media
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-smit-blue text-smit-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-smit-blue text-smit-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </nav>
      {/* News Ticker */}
      <div className="relative bg-smit-blue overflow-hidden h-10 flex items-center">
        <div className="flex items-center h-full">
          <span className="bg-white text-smit-blue font-bold px-4 py-1 rounded-r-lg shadow mr-2 text-sm flex items-center h-7 ml-4">SMIT Update</span>
        </div>
        <div className="flex-1 h-full flex items-center overflow-hidden relative">
          <span
            ref={marqueeRef}
            className="absolute left-full whitespace-nowrap animate-marquee text-white font-semibold text-sm"
            style={{
              animation: `marquee-move ${marqueeDuration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            {smitNews}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes marquee-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--marquee-width, -100vw)); }
        }
        .animate-marquee {
          display: inline-block;
        }
        /* Fancy Apply Now Button Animations */
        .apply-now-fancy {
          box-shadow: 0 4px 24px 0 rgba(34,197,94,0.25), 0 1.5px 6px 0 rgba(34,197,94,0.15);
          animation: apply-now-pulse 2.5s infinite;
        }
        .apply-now-fancy:hover .apply-now-glow {
          box-shadow: 0 0 0 4px #22c55e55, 0 0 16px 4px #22c55e99;
          transition: box-shadow 0.3s;
        }
        .apply-now-glow {
          transition: box-shadow 0.3s;
        }
        @keyframes apply-now-pulse {
          0%, 100% { box-shadow: 0 4px 24px 0 rgba(34,197,94,0.25), 0 1.5px 6px 0 rgba(34,197,94,0.15); }
          50% { box-shadow: 0 8px 32px 0 rgba(34,197,94,0.35), 0 3px 12px 0 rgba(34,197,94,0.25); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.2s infinite;
        }
      `}</style>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-smit-blue mb-6">Saylani Mass IT Training Faisalabad</h2>
            <p className="text-lg text-gray-700 mb-8">
              Saylani Mass IT Training (SMIT) is a leading initiative by Saylani Welfare International Trust, dedicated to providing free, high-quality IT education to students across Pakistan. Our mission is to empower youth with the latest technology skills, enabling them to build successful careers and contribute to the digital economy.
            </p>
            {/* Green Card Heading */}
            <h3 className="text-2xl font-bold text-green-700 mb-2 mt-6 tracking-wide uppercase text-center">SMIT Green Card</h3>
            <span className="text-gray-500 text-sm block text-center mb-2">Updated on <b>12 Jul 2025</b></span>
            {/* Green Card Image */}
            <img
              src={process.env.PUBLIC_URL + "/green-card.jpg"}
              alt="Saylani Green Card"
              className="w-full max-w-2xl mx-auto mb-6 rounded shadow border-2 border-green-600 cursor-zoom-in"
              style={{ border: "2px solid #4CAF50" }}
              onClick={() => setShowZoom(true)}
            />
            {showZoom && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                onClick={() => setShowZoom(false)}
              >
                <div className="relative" onClick={e => e.stopPropagation()}>
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200"
                    onClick={() => setShowZoom(false)}
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <img
                    src={process.env.PUBLIC_URL + "/green-card.jpg"}
                    alt="Saylani Green Card Zoomed"
                    className="max-w-full max-h-[80vh] rounded shadow-lg border-4 border-green-600 bg-white"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}
            {/* Classes Schedule Table */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-x-auto w-full">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-smit-blue mb-2 text-center">Classes Schedule</h3>
                <span className="text-gray-500 text-sm block text-center">Updated on <b>12 Jul 2025</b></span>
              </div>
              <div className="flex justify-center w-full">
                <table className="min-w-full max-w-4xl border border-gray-300 text-xs md:text-sm">
                  <thead>
                    <tr className="bg-smit-blue text-white">
                      <th className="border border-gray-300 px-2 py-2">Days and Time</th>
                      <th className="border border-gray-300 px-2 py-2">9am to 11am</th>
                      <th className="border border-gray-300 px-2 py-2">11am to 1pm</th>
                      <th className="border border-gray-300 px-2 py-2">2pm to 4pm</th>
                      <th className="border border-gray-300 px-2 py-2">4pm to 6pm</th>
                      <th className="border border-gray-300 px-2 py-2">6pm to 8pm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Monday</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2">
                        Digital Marketing Batch 1<br/>Sir Hamza Tariq<br/>May 2025 - Oct 2025<br/><span className="text-xs">1st class on 12-May</span>
                      </td>
                      <td className="border px-2 py-2">
                        English Lang Course Batch 1<br/>Sir Waqas Sohail<br/>July 2025 - Oct 2025<br/><span className="text-xs">1st class - 30 Jun</span>
                      </td>
                      <td className="border px-2 py-2">
                        Web and Mobile Batch 8<br/>Sir Umair Ahmad<br/>Oct 2024 - Sep 2025<br/><span className="text-xs">1st Class - 7 Oct</span>
                      </td>
                      <td className="border px-2 py-2">
                        IT Professional Batch 3<br/>Sir Umair Ahmad<br/>May 2025 - July 2025<br/><span className="text-xs">1st class - 28 April</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Tuesday</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2">
                        Digital Marketing Batch 1<br/>Sir Hamza Tariq<br/>May 2025 - Oct 2025<br/><span className="text-xs">1st class on 12-May</span>
                      </td>
                      <td className="border px-2 py-2">
                        English Lang Course Batch 1<br/>Sir Waqas Sohail<br/>July 2025 - Oct 2025<br/><span className="text-xs">1st class - 30 Jun</span>
                      </td>
                      <td className="border px-2 py-2">
                        Web and Mobile Batch 8<br/>Sir Umair Ahmad<br/>Oct 2024 - Sep 2025<br/><span className="text-xs">1st Class - 7 Oct</span>
                      </td>
                      <td className="border px-2 py-2">
                        IT Professional Batch 3<br/>Sir Umair Ahmad<br/>May 2025 - July 2025<br/><span className="text-xs">1st class - 28 April</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Wednesday</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2" colSpan="1">
                        <span className="font-bold">2 PM to 5 PM</span><br/>
                        Web Designing Course Batch 5<br/>Miss Noor Fatima<br/>May 2025 - Aug 2025<br/><span className="text-xs">1st class - 07 May</span>
                      </td>
                      <td className="border px-2 py-2"></td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">5 PM to 8 PM</span><br/>
                        Oracle APEX Develop Batch 4<br/>Sir Farhan Younas<br/>Jul 2025 - Dec 2025<br/><span className="text-xs">1st class - 9 Jul</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Thursday</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">2 PM to 4 PM</span><br/>
                        3D Animation Batch 3<br/>Sir Mudasir Iqbal<br/>May 2025 - Jul 2025<br/><span className="text-xs">1st class - 2 May</span>
                      </td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">4 PM to 6 PM</span><br/>
                        Video Animation Batch 12<br/>Sir Mudasir Iqbal<br/>Jul 2025 - Sep 2025<br/><span className="text-xs">1st Class - 4 Jul</span>
                      </td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">6 PM to 8 PM</span><br/>
                        Graphic Designing Batch 12<br/>Sir Mudasir Iqbal<br/>Jul 2025 - Sep 2025<br/><span className="text-xs">1st Class - 4 Jul</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Friday</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2 font-bold text-smit-blue">Free Slot</td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">2 PM to 4 PM</span><br/>
                        3D Animation Batch 3<br/>Sir Mudasir Iqbal<br/>May 2025 - Jul 2025<br/><span className="text-xs">1st class - 2 May</span>
                      </td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">4 PM to 6 PM</span><br/>
                        Video Animation Batch 12<br/>Sir Mudasir Iqbal<br/>Jul 2025 - Sep 2025<br/><span className="text-xs">1st Class - 4 Jul</span>
                      </td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">6 PM to 8 PM</span><br/>
                        Graphic Designing Batch 12<br/>Sir Mudasir Iqbal<br/>Jul 2025 - Sep 2025<br/><span className="text-xs">1st Class - 4 Jul</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Second table for Saturday/Sunday */}
              <div className="flex justify-center w-full mt-8">
                <table className="min-w-full max-w-4xl border border-gray-300 text-xs md:text-sm">
                  <thead>
                    <tr className="bg-smit-blue text-white">
                      <th className="border border-gray-300 px-2 py-2">Days and Time</th>
                      <th className="border border-gray-300 px-2 py-2">9:30 AM to 12:30 PM</th>
                      <th className="border border-gray-300 px-2 py-2">1 PM to 3 PM</th>
                      <th className="border border-gray-300 px-2 py-2">3 PM to 5 PM</th>
                      <th className="border border-gray-300 px-2 py-2">5 PM to 7 PM</th>
                      <th className="border border-gray-300 px-2 py-2">7 PM to 9 PM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Saturday</td>
                      <td className="border px-2 py-2">
                        WDC Batch 4<br/>Sir Mudasir Iqbal<br/>Jun 2025 - Sep 2025
                      </td>
                      <td className="border px-2 py-2">
                        Web and Mobile Batch 8<br/>Miss Noor Fatima<br/>Jan 2025 - Dec 2025
                      </td>
                      <td className="border px-2 py-2">
                        Graphic Designing Batch 12<br/>Miss Irzam<br/>Jul 2025 - Oct 2025<br/><span className="text-xs">1st Class - 19 Jul</span>
                      </td>
                      <td className="border px-2 py-2">
                        AI & Data Science Batch 1<br/>Sir Naveed Sarwar<br/>Oct 2024 - Sep 2025
                      </td>
                      <td className="border px-2 py-2">
                        Web and Mobile Batch 8<br/>Sir Naveed Sarwar<br/>Oct 2024 - Sep 2025
                      </td>
                    </tr>
                    <tr>
                      <td className="border font-semibold bg-gray-100 px-2 py-2">Sunday</td>
                      <td className="border px-2 py-2">
                        <span className="font-bold">10 AM to 1 PM</span><br/>DM Batch 1<br/>Miss Aroma<br/>Jun 2025 - Nov 2025
                      </td>
                      <td className="border px-2 py-2">
                        Web and Mobile Batch 8<br/>Miss Aroma<br/>Jan 2025 - Dec 2026
                      </td>
                      <td className="border px-2 py-2">
                        Graphic Designing Batch 12<br/>Miss Irzam<br/>Jul 2025 - Oct 2025<br/><span className="text-xs">1st Class - 19 Jul</span>
                      </td>
                      <td className="border px-2 py-2">
                        AI & Data Science Batch 1<br/>Sir Naveed Sarwar<br/>Oct 2024 - Sep 2025
                      </td>
                      <td className="border px-2 py-2">
                        Web and Mobile Batch 8<br/>Sir Naveed Sarwar<br/>Oct 2024 - Sep 2025
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              Join thousands of students who have transformed their lives with SMIT. Start your IT journey today!
            </p>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Courses</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of IT courses designed to help you build a successful career in technology.
              </p>
            </div>
            
            {/* Male Courses Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Male Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainCourses.filter(c => c.genderType === 'male').map((course, idx) => {
                  const gradients = [
                    'from-blue-500 via-blue-400 to-blue-300',
                    'from-green-500 via-green-400 to-green-300',
                    'from-purple-500 via-purple-400 to-purple-300',
                    'from-yellow-500 via-yellow-400 to-yellow-300',
                    'from-pink-500 via-pink-400 to-pink-300',
                    'from-indigo-500 via-indigo-400 to-indigo-300',
                    'from-red-500 via-red-400 to-red-300',
                    'from-teal-500 via-teal-400 to-teal-300',
                    'from-orange-500 via-orange-400 to-orange-300',
                    'from-cyan-500 via-cyan-400 to-cyan-300',
                    'from-lime-500 via-lime-400 to-lime-300',
                  ];
                  const gradient = gradients[idx % gradients.length];
                  return (
                    <div
                      key={course.id + (course.cardLabel || '')}
                      id={`course-card-${course.id}`}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 relative${selectedCourseId === course.id ? ' ring-4 ring-smit-blue' : ''}`}
                    >
                      <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold shadow bg-gray-200 text-gray-800 border border-gray-300">
                        {idx + 1}
                      </div>
                      <div className={`absolute left-0 top-0 w-full h-2 rounded-t-xl bg-gradient-to-r ${gradient}`}></div>
                      <div className="flex items-center mb-4">
                        {course.icon}
                        <div className="ml-3">
                          <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                          {course.minEducation && (
                            <p className="text-sm text-gray-600">Min req: {course.minEducation}</p>
                          )}
                        </div>
                      </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-smit-blue rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 text-smit-green mr-2" />
                        <span className="font-semibold text-gray-900 mr-2">Gender:</span>
                        <span className="text-gray-600">Male</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-smit-blue mr-2" />
                        <span className="text-gray-600"><strong>Duration:</strong> {course.duration}</span>
                      </div>
                      {Array.isArray(course.scheduleMale)
                        ? course.scheduleMale.map((timing, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-gray-600"><strong>Class {i + 1}:</strong> {timing}</span>
                            </div>
                          ))
                        : course.scheduleMale && (
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-gray-600"><strong>Class 1:</strong> {course.scheduleMale}</span>
                            </div>
                          )
                      }
                      {!course.scheduleMale && course.schedule && (
                        Array.isArray(course.schedule)
                          ? course.schedule.map((timing, i) => (
                              <div key={i} className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                                <span className="text-gray-600"><strong>Class {i + 1}:</strong> {timing}</span>
                              </div>
                            ))
                          : (
                              <div className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                                <span className="text-gray-600"><strong>Class 1:</strong> {course.schedule}</span>
                              </div>
                            )
                      )}
                      <div className="flex items-center text-sm">
                        {course.admissionStatus === 'Open' && (
                          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs border border-green-400">
                            Admission Open
                            {course.admissionTill && (
                              <span className="ml-2 text-green-700 font-semibold">(till {course.admissionTill})</span>
                            )}
                          </span>
                        )}
                        {course.admissionStatus === 'Close' && (
                          <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs border border-red-400">Admission Closed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );})}
              </div>
            </div>

            {/* Female Courses Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-pink-700 mb-6">Female Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainCourses.filter(c => c.genderType === 'female').map((course, idx) => {
                  const gradients = [
                    'from-blue-500 via-blue-400 to-blue-300',
                    'from-green-500 via-green-400 to-green-300',
                    'from-purple-500 via-purple-400 to-purple-300',
                    'from-yellow-500 via-yellow-400 to-yellow-300',
                    'from-pink-500 via-pink-400 to-pink-300',
                    'from-indigo-500 via-indigo-400 to-indigo-300',
                    'from-red-500 via-red-400 to-red-300',
                    'from-teal-500 via-teal-400 to-teal-300',
                    'from-orange-500 via-orange-400 to-orange-300',
                    'from-cyan-500 via-cyan-400 to-cyan-300',
                    'from-lime-500 via-lime-400 to-lime-300',
                  ];
                  const gradient = gradients[idx % gradients.length];
                  return (
                    <div
                      key={course.id + (course.cardLabel || '')}
                      id={`course-card-${course.id}`}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 relative${selectedCourseId === course.id ? ' ring-4 ring-pink-500' : ''}`}
                    >
                      <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold shadow bg-gray-200 text-gray-800 border border-gray-300">
                        {idx + 1}
                      </div>
                      <div className={`absolute left-0 top-0 w-full h-2 rounded-t-xl bg-gradient-to-r ${gradient}`}></div>
                      <div className="flex items-center mb-4">
                        {course.icon}
                        <div className="ml-3">
                          <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                          {course.minEducation && (
                            <p className="text-sm text-gray-600">Min req: {course.minEducation}</p>
                          )}
                        </div>
                      </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-smit-blue rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 text-smit-green mr-2" />
                        <span className="font-semibold text-gray-900 mr-2">Gender:</span>
                        <span className="text-gray-600">Female</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-smit-blue mr-2" />
                        <span className="text-gray-600"><strong>Duration:</strong> {course.duration}</span>
                      </div>
                      {Array.isArray(course.scheduleFemale)
                        ? course.scheduleFemale.map((timing, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 text-pink-600 mr-2" />
                              <span className="text-gray-600"><strong>Class {i + 1}:</strong> {timing}</span>
                            </div>
                          ))
                        : course.scheduleFemale && (
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 text-pink-600 mr-2" />
                              <span className="text-gray-600"><strong>Class 1:</strong> {course.scheduleFemale}</span>
                            </div>
                          )
                      }
                      {!course.scheduleFemale && course.schedule && (
                        Array.isArray(course.schedule)
                          ? course.schedule.map((timing, i) => (
                              <div key={i} className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                                <span className="text-gray-600"><strong>Class {i + 1}:</strong> {timing}</span>
                              </div>
                            ))
                          : (
                              <div className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                                <span className="text-gray-600"><strong>Class 1:</strong> {course.schedule}</span>
                              </div>
                            )
                      )}
                      <div className="flex items-center text-sm">
                        {course.admissionStatus === 'Open' && (
                          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs border border-green-400">
                            Admission Open
                            {course.admissionTill && (
                              <span className="ml-2 text-green-700 font-semibold">(till {course.admissionTill})</span>
                            )}
                          </span>
                        )}
                        {course.admissionStatus === 'Close' && (
                          <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs border border-red-400">Admission Closed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );})}
              </div>
            </div>

            {/* Closed Courses Section */}
            <div>
              <h3 className="text-2xl font-bold text-red-700 mb-6">Closed Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {closedCourses.map((course, idx) => {
                  const gradient = 'from-gray-700 via-gray-600 to-gray-500';
                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 pt-10 relative border-2 border-red-600"
                    >
                      <div className={`absolute left-0 top-0 w-full h-2 rounded-t-xl bg-gradient-to-r ${gradient}`}></div>
                      {/* Centered status badge above card content */}
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          {course.closedStatus}
                        </span>
                      </div>
                      <div className="flex items-center mb-4">
                        {course.icon}
                        <div className="ml-3">
                          <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.level}</p>
                        </div>
                      </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-smit-blue rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-smit-blue mr-2" />
                        <span className="text-gray-600"><strong>Duration:</strong> {course.duration}</span>
                      </div>
                      {course.lastBatch && (
                        <div className="flex items-center text-sm">
                          <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded font-semibold mr-2">Last Batch</span>
                          <span className="text-gray-600">{course.lastBatch}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <GraduationCap className="w-4 h-4 text-indigo-600 mr-2" />
                        <span className="text-gray-600"><strong>Instructor:</strong> {course.instructor}</span>
                      </div>
                      {/* Show any notes for closed courses below instructor */}
                      {course.nameChangedNote && (
                        <div className="mt-1 text-xs font-semibold text-red-600">{course.nameChangedNote}</div>
                      )}
                      {course.mergedNote && (
                        <div className="mt-1 text-xs font-semibold text-red-600">{course.mergedNote}</div>
                      )}
                    </div>
                  </div>
                );})}
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About SMIT</h2>
              <p className="text-lg text-gray-600">
                Saylani Mass IT Training (SMIT) is a leading institution providing free IT education to students.
              </p>
              <div className="mt-10 mb-8 text-left">
                <h3 className="text-2xl font-bold text-smit-blue mb-4">Chairman Message</h3>
                <div className="bg-gray-50 border-l-4 border-smit-blue p-6 rounded shadow flex flex-col items-center">
                  <img src={process.env.PUBLIC_URL + "/chairman.jpeg"} alt="Bashir Ahmad Farooqi" className="w-40 h-40 object-cover rounded-lg shadow-md border-2 border-smit-blue mb-6" />
                  <div className="w-full max-w-2xl">
                    <p className="text-gray-700 mb-4 text-center">
                      "Saylani Welfare International Trust was established with the aim of serving humanity without any discrimination of caste, color, or creed. Our mission is to provide food, education, healthcare, and other basic necessities to the underprivileged and needy people of society. We believe that serving humanity is the greatest form of worship and strive to bring positive change in the lives of those who are less fortunate.<br/><br/>
                      Over the years, Saylani Welfare has expanded its services to include a wide range of welfare activities, including mass IT training, free medical camps, food distribution, and more. Our vision is to create a society where everyone has access to basic necessities and opportunities for a better life.<br/><br/>
                      We are grateful to all our supporters, donors, and volunteers who have joined hands with us in this noble cause. Together, we can make a difference and bring hope to those in need."
                    </p>
                    <p className="text-gray-900 font-semibold text-center">— Bashir Ahmad Farooqi (Chairman, Saylani Welfare International Trust)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide quality IT education to students from all backgrounds, helping them build successful careers in technology.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose SMIT?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-smit-blue bg-opacity-10 p-3 rounded-lg mr-4">
                    <GraduationCap className="w-6 h-6 text-smit-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Free Education</h4>
                    <p className="text-gray-600">All courses are completely free for students</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-smit-green bg-opacity-10 p-3 rounded-lg mr-4">
                    <Users className="w-6 h-6 text-smit-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Instructors</h4>
                    <p className="text-gray-600">Learn from industry professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Code className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Practical Training</h4>
                    <p className="text-gray-600">Hands-on experience with real projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Career Support</h4>
                    <p className="text-gray-600">Job placement assistance and career guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600">
                Get in touch with us for any questions or inquiries about our courses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-smit-blue mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">Saylani House, Lal Mil Chowk, 3rd Floor, Factory Area</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-smit-green mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+92 41-2417281</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Website</p>
                      <p className="text-gray-600">www.saylaniwelfare.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Apply Now</h3>
                <p className="text-gray-600 mb-6">
                  Ready to start your IT journey? Apply for our courses today!
                </p>
                <a
                  href="https://forms.saylaniwelfare.com/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-green-600 hover:to-green-800 hover:scale-105 transform transition-all duration-200 border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Apply Online
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Section */}
        {activeTab === 'social' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect with SMIT</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay connected with Saylani Mass IT Training on all our official social media platforms and groups.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Karachi" className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SMIT Facebook Karachi Page</h3>
                  <a href="https://www.facebook.com/saylani.smit/" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">facebook.com/saylani.smit</a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="FB FSD Group" className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SMIT Faisalabad Facebook Group</h3>
                  <a href="https://www.facebook.com/groups/smitfsd" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">facebook.com/groups/smitfsd</a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Channel" className="w-10 h-10" />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">SMIT WhatsApp Channel</h3>
                  <a href="https://www.whatsapp.com/channel/0029VaDiTSSFXUuhnyd4uz3W" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline break-words block">
                    whatsapp.com/channel/0029VaDiTSSFXUuhnyd4uz3W
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="FB FSD Page" className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SMIT Faisalabad Facebook Page</h3>
                  <a href="https://www.facebook.com/share/1AQg9isQ5g/" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">facebook.com/share/1AQg9isQ5g</a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SMIT Instagram</h3>
                  <a href="https://www.instagram.com/smitfsd" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">instagram.com/smitfsd</a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" alt="X (Twitter)" className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SMIT X (Twitter)</h3>
                  <a href="https://x.com/smitfsd" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">x.com/smitfsd</a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">SMIT LinkedIn</h3>
                  <a href="https://www.linkedin.com/company/smitfsd" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">linkedin.com/company/smitfsd</a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">WhatsApp Num & PTCL Num</h3>
                  <div className="flex flex-col space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                      <a href="https://wa.me/923378659969" target="_blank" rel="noopener noreferrer" className="text-smit-blue hover:underline">+92-337-8659969</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-smit-blue" />
                      <a href="tel:+92412417281" className="text-smit-blue hover:underline">041-2417281</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src={process.env.PUBLIC_URL + "/smitlogo.png"} alt="SMIT Logo" className="h-8 w-auto" />
                <span className="ml-3 text-lg font-semibold">Saylani Mass IT Training</span>
              </div>
              <p className="text-gray-400 mb-4">
                Free IT education for all students. Empowering youth with technology skills.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('home')} className="text-gray-400 hover:text-white transition-colors focus:outline-none">Home</button></li>
                <li><button onClick={() => setActiveTab('about')} className="text-gray-400 hover:text-white transition-colors focus:outline-none">About Us</button></li>
                <li><button onClick={() => setActiveTab('courses')} className="text-gray-400 hover:text-white transition-colors focus:outline-none">Courses</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="text-gray-400 hover:text-white transition-colors focus:outline-none">Contact</button></li>
                <li><a href="https://forms.saylaniwelfare.com/en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Apply Now</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Courses</h3>
              <ul className="space-y-2">
                {footerCourses.map(title => (
                  <li key={title}>
                    <button
                      className="text-gray-400 hover:text-white transition-colors focus:outline-none text-left w-full"
                      onClick={() => {
                        setActiveTab('courses');
                        // Find first course with this title
                        const found = coursesData.find(c => c.title === title);
                        if (found) setSelectedCourseId(found.id);
                        // Optionally, scroll to course card after render
                        setTimeout(() => {
                          const el = document.getElementById(`course-card-${found?.id}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }}
                    >
                      {title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  Saylani House, Lal Mil Chowk, 3rd Floor, Factory Area
                </p>
                <p className="text-gray-400">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  info@saylaniwelfare.com
                </p>
                <p className="text-gray-400">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  +92 41-2417281
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2024 Saylani Mass IT Training. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 