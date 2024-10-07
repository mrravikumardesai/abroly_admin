import React from 'react'
import ChapterAddEditTemplate from './ChapterAddEditTemplate'
import { useParams } from 'react-router-dom'

const ChapterEdit = () => {
    const { id } = useParams()

    return (
        <div>
            <ChapterAddEditTemplate isNew={false} uuid={id}/>
        </div>
    )
}

export default ChapterEdit