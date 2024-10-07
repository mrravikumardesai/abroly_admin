import React from 'react'
import ChapterAddEditTemplate from './ChapterAddEditTemplate'
import { useParams } from 'react-router-dom'

const ChapterAdd = () => {
    const {leval,course_uuid} = useParams()
  return (
    <div>
        <ChapterAddEditTemplate isNew={true} level={leval} course_uuid={course_uuid}/>
    </div>
  )
}

export default ChapterAdd