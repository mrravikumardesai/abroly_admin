import React from 'react'
import SubChapterAddEditTemplate from './SubChapterAddEditTemplate'
import { useParams } from 'react-router-dom'

const UpdateSubChapter = () => {
  const { id } = useParams()
  return (
    <div>
      <SubChapterAddEditTemplate isNew={false} uuid={id} chapter_uuid={""} />
    </div>
  )
}

export default UpdateSubChapter