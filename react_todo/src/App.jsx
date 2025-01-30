import { useState } from 'react'
import './App.css'

const App = () => {

  const [jobs, setJobs] = useState([{ id: 1, top: '買い物に行く'}])
  const [jobTop, setJobTop] = useState('')
  const [jobId, setJobId] = useState(jobs.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTop, setNewTop] = useState('')

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

  const handleOpenEditForm = (job) => {
    setIsEditable(true)
    setEditId(job.id)
    setNewTop(job.top)
  }

  const handleEditFormChange = (e) => {
    setNewTop(e.target.value)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId('')
  }

  const handleEditTodo = () => {
    const newArray = jobs.map((job) =>
      job.id === editId ? { ...job, top: newTop } : job
    )
    setJobs(newArray)
    setEditId('')
    setNewTop('')
    handleCloseEditForm()
  }

  return (
    <>
      {isEditable ? (
        <div>
          <input
            type="text"
            label="新しいタイトル"
            value={newTop}
            onChange={handleEditFormChange}
          />
        <button onClick={handleEditTodo}>編集を保存</button>
        <button onClick={handleCloseEditForm}>キャンセル</button>
      </div>
      ) : (
    <div>
      <input
        type='text' 
        label='タイトル'
        value={jobTop}
        onChange={handleInputChange}
        />
      <button onClick={handleAddJob}>Create</button>
    </div>
      )}
    <div>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <span>{job.top}</span>
            <button onClick={() => handleOpenEditForm(job)}>edit</button>
            <button onClick={() => handleDeleteJob(job)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
