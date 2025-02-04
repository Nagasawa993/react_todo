import { useState } from 'react'

const App = () => {

  const [jobs, setJobs] = useState([{ id: 1, top: '買い物に行く'}])
  const [jobTop, setJobTop] = useState('')
  const [jobId, setJobId] = useState(jobs.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTop, setNewTop] = useState('')
  const [isEnptyTop, setIsEnptyTop] = useState(false)

  const handleInputChange = (e) => {
    setJobTop(e.target.value)
    console.log(jobTop.length)
  }

  const handleAddJob =() => {
    if (jobTop.length === 0 || jobTop.length > 20){
      setIsEnptyTop(true)
      return
    }
    setIsEnptyTop(false)
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
    setIsEnptyTop(false)
  }

  const handleEditFormChange = (e) => {
    setNewTop(e.target.value)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId('')
    setIsEnptyTop(false)
  }

  const handleEditTodo = () => {
    if (newTop.length === 0 || newTop.length > 20){
      setIsEnptyTop(true)
      return
    }
    const newArray = jobs.map((job) =>
      job.id === editId ? { ...job, top: newTop } : job
    )
    setJobs(newArray)
    setEditId('')
    setNewTop('')
    handleCloseEditForm()
    setIsEnptyTop(false)
  }

  return (
    <>
    <div class="container">
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
        <div>
          {isEnptyTop &&(
            <span style={{ color: '#FF0000' }}>文字数は1文字以上20文字以下です</span>
          )}
        </div>
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
        <div>
          {isEnptyTop &&(
            <span style={{ color: '#FF0000' }}>文字数は1文字以上20文字以下です</span>
          )}
        </div>
      </div>
        )}
      <div>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <span>{job.top.includes("誕生日") ? "☆" + job.top : job.top}</span>
              <button onClick={() => handleOpenEditForm(job)}>edit</button>
              <button onClick={() => handleDeleteJob(job)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
