import { useState } from 'react'
import './App.css'

const App = () => {

  const [jobs, setJobs] = useState([])
  const [jobTop, setJobTop] = useState('')
  const [jobId, setJobId] = useState(jobs.length + 1)

  const handleInputChange = (e) => {
    setJobTop(e.target.value)
  }

  const handleAddJob =() => {
    setJobs([...jobs, {id: jobId, top: jobTop}])
    setJobId(jobId + 1)
    setJobTop('')
  }

  const handleDeleteJob=(targetJob)=>{
    setJobs(jobs.filter((job) => job !== targetJob))
  }

  return (
    <>
    <div>
      <input
        type='text' 
        label='タイトル'
        value={jobTop}
        onChange={handleInputChange}
        />
      <button onClick={handleAddJob}>Create</button>
    </div>

    <div>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <span>{job.top}</span>
            <button onClick={() => handleDeleteJob(job)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
