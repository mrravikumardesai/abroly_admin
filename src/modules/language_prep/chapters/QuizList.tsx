import React from 'react'
import { useParams } from 'react-router-dom'

const QuizList = () => {
    const { leval, course_uuid } = useParams()
    return (
        <div>{leval}, {course_uuid}</div>
    )
}

export default QuizList