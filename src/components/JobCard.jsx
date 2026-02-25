function JobCard({ job, savedJobs, toggleSaveJob }) {
  // ✅ Check if this job is saved
  const isSaved = savedJobs.some((item) => item.id === job.id);

  // Badge class based on location string
  const badgeClass =
    job.location === "Remote" ? "badge-remote"
    : job.location === "Hybrid" ? "badge-hybrid"
    : "badge-onsite";

  return (
    <div className={`job-card ${isSaved ? "is-saved" : ""}`}>

      {/* Title + Location badge */}
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className={`badge ${badgeClass}`}>{job.location}</span>
      </div>

      {/* Company logo initial + name + salary */}
      <div className="job-company">
        <div className="company-logo">{job.company[0]}</div>
        <div>
          <div className="company-name">{job.company}</div>
          <div className="company-salary">{job.salary}</div>
        </div>
      </div>

      {/* Description from API */}
      <p className="job-desc">{job.description}</p>

      {/* Footer: posted days + save toggle */}
      <div className="job-footer">
        <span className="posted-text">
          Posted {job.postedDays} day{job.postedDays !== 1 ? "s" : ""} ago
        </span>

        {/* ✅ save-btn is its own class, NOT inheriting global button styles */}
        <button
          className={`save-btn ${isSaved ? "saved" : ""}`}
          onClick={() => toggleSaveJob(job)}
        >
          {isSaved ? "✓ Saved" : "Save Job"}
        </button>
      </div>

    </div>
  );
}

export default JobCard;