import React from 'react'

function CategoryForm({handleSubmit,value,setValue}) {
   
  return (
    <div>CategoryForm
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Category</label>
    <input type="text" className="form-control" placeholder='enter new category'
    value={value} onChange={(e)=>setValue(e.target.value)}  />
  
  </div>
 

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        
    </div>
  )
}

export default CategoryForm