import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const JOB_ROLES = [
  "Frontend Developer", "Backend Developer", "Full Stack Engineer",
  "UI/UX Designer", "Data Analyst", "DevOps Engineer",
  "Mobile App Developer", "Software Tester", "Cloud Engineer",
  "AI/ML Engineer", "React Developer", "Node.js Engineer",
  "Data Engineer", "Product Designer", "Cybersecurity Analyst",
  "Site Reliability Engineer", "iOS Developer", "Android Developer",
  "Blockchain Developer", "ML Engineer",
];

const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Meta", "Apple",
  "Netflix", "Spotify", "Airbnb", "Uber", "Twitter",
  "Adobe", "Salesforce", "Intel", "IBM", "Oracle",
  "Shopify", "Stripe", "Figma", "Notion", "Slack",
];

const LOCATIONS = [
  "Remote", "On-site", "Hybrid", "Remote", "On-site",
  "Hybrid", "Remote", "On-site", "Remote", "Hybrid",
  "On-site", "Remote", "Hybrid", "Remote", "On-site",
  "Hybrid", "Remote", "On-site", "Hybrid", "Remote",
];

const SALARIES = [
  "$60k–$90k",  "$95k–$130k", "$80k–$115k", "$70k–$100k", "$110k–$150k",
  "$85k–$120k", "$75k–$105k", "$100k–$140k","$90k–$125k", "$120k–$160k",
  "$65k–$95k",  "$88k–$118k", "$105k–$145k","$72k–$102k", "$115k–$155k",
  "$78k–$108k", "$92k–$132k", "$68k–$98k",  "$98k–$138k", "$82k–$112k",
];

const POSTED_DAYS = [1, 2, 3, 5, 7, 10, 14, 1, 4, 6, 2, 8, 3, 9, 1, 5, 11, 2, 7, 4];

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewMode, setViewMode] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ useEffect for API call
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // ✅ map() — each index gets unique values
        const formattedJobs = data.slice(0, 20).map((post, index) => ({
          id: post.id,
          title: JOB_ROLES[index],
          description: post.body.replace(/\n/g, " ").slice(0, 100).trim() + "...",
          company: COMPANIES[index],
          location: LOCATIONS[index],
          salary: SALARIES[index],
          postedDays: POSTED_DAYS[index],
        }));
        setJobs(formattedJobs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ filter by search text
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ view mode: All vs Saved
  const displayedJobs =
    viewMode === "all"
      ? filteredJobs
      : filteredJobs.filter((job) =>
          savedJobs.some((saved) => saved.id === job.id)
        );

  // ✅ toggle save/unsave
  const toggleSaveJob = (job) => {
    const isSaved = savedJobs.some((item) => item.id === job.id);
    if (isSaved) {
      setSavedJobs(savedJobs.filter((item) => item.id !== job.id));
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-badge">HIRING NOW</div>
        <h1>Find Your Next<br /><span className="accent">Dream Role</span></h1>
        <p className="subtitle">
          {jobs.length} opportunities fetched live · {savedJobs.length} saved
        </p>
      </header>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      <div className="buttons">
        {/* ✅ Using className="toggle-btn" — separate from save-btn */}
        <button
          className={`toggle-btn ${viewMode === "all" ? "active" : ""}`}
          onClick={() => setViewMode("all")}
        >
          All Jobs <span className="count-pill">{filteredJobs.length}</span>
        </button>
        <button
          className={`toggle-btn ${viewMode === "saved" ? "active" : ""}`}
          onClick={() => setViewMode("saved")}
        >
          Saved Jobs <span className="count-pill">{savedJobs.length}</span>
        </button>
      </div>

      {/* ✅ Conditional rendering */}
      {loading ? (
        <div className="status-wrap">
          <div className="spinner" />
          <p className="status-text">Fetching jobs from API...</p>
        </div>
      ) : displayedJobs.length === 0 ? (
        <div className="status-wrap">
          <p className="empty-icon">🔍</p>
          <p className="status-text">
            {viewMode === "saved"
              ? "No saved jobs yet. Start saving!"
              : "No jobs match your search."}
          </p>
        </div>
      ) : (
        // ✅ map() with key prop
        <div className="jobs-grid">
          {displayedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          ))}
        </div>
      )}

      <footer className="footer">
        Data sourced from <code>jsonplaceholder.typicode.com/posts</code>
      </footer>
    </div>
  );
}

export default App;