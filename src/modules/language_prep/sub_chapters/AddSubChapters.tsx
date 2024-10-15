import React from 'react'
import SubChapterAddEditTemplate from './SubChapterAddEditTemplate'
import { useParams } from 'react-router-dom'

const AddSubChapters = () => {
  const {id} = useParams()
  return (
    <div>
      <SubChapterAddEditTemplate isNew={true} uuid={""} chapter_uuid={id} />
    </div>
  )
}

export default AddSubChapters