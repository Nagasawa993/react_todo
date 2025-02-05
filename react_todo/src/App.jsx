import { useState } from 'react'

const App = () => {

  const [jobs, setJobs] = useState([{ id: 1, top: '買い物に行く'}])
  const [jobTop, setJobTop] = useState('')
  const [jobId, setJobId] = useState(jobs.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTop, setNewTop] = useState('')
  const [isEmptyTop, setIsEmptyTop] = useState(false)

  // inputからの入力(e)を、変数に格納
  const handleInputChange = (e) => {
    setJobTop(e.target.value)
  }

  // 変数内の文字数を確認し、問題なければ配列に格納
  const handleAddJob =() => {
    // 変数内の文字数を確認
    if (jobTop.length === 0 || jobTop.length > 20){
      setIsEmptyTop(true)
      return
    }
    // 変数の値を配列に格納し、各種変数の更新と初期化
    setIsEmptyTop(false)
    setJobs([...jobs, {id: jobId, top: jobTop}])
    setJobId(jobId + 1)
    setJobTop('')
  }

  // 削除対象の引数(targetJob)を、配列から要素を削除
  const handleDeleteJob=(targetJob)=>{
    setJobs(jobs.filter((job) => job !== targetJob))
  }

  // 要素(job)を、編集するための画面を表示
  const handleOpenEditForm = (job) => {
    setIsEditable(true)
    setEditId(job.id)
    setNewTop(job.top)
    setIsEmptyTop(false)
  }

  // inputからの入力(e)を、変数に格納
  const handleEditFormChange = (e) => {
    setNewTop(e.target.value)
  }

  // 編集用の入力要素を非表示
  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId('')
    setIsEmptyTop(false)
  }

  // 変数内の文字数を確認し、問題なければ配列に上書きで格納
  const handleEditTodo = () => {
    // 変数内の文字数を確認
    if (newTop.length === 0 || newTop.length > 20){
      setIsEmptyTop(true)
      return
    }
    // 配列に上書きで格納し、各種変数の更新と初期化
    const newArray = jobs.map((job) =>
      job.id === editId ? { ...job, top: newTop } : job
    )
    setJobs(newArray)
    setEditId('')
    setNewTop('')
    handleCloseEditForm()
    setIsEmptyTop(false)
  }

  return (
    <>
    <div className="container">
      {isEditable ? (
        // jobの編集
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
          {isEmptyTop &&(
            <span style={{ color: '#FF0000' }}>文字数は1文字以上20文字以下です</span>
          )}
        </div>
      </div>
      ) : (
      // jobの追加
      <div>
        <input
          type='text' 
          label='タイトル'
          value={jobTop}
          onChange={handleInputChange}
          />
        <button onClick={handleAddJob}>Create</button>
        <div>
          {isEmptyTop &&(
            <span style={{ color: '#FF0000' }}>文字数は1文字以上20文字以下です</span>
          )}
        </div>
      </div>
        )}
      {/* jobを一覧で表示 */}
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
