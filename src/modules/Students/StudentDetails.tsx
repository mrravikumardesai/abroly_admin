import React from 'react'
import { useParams } from 'react-router-dom'

const StudentDetails = () => {
    const { id } = useParams()
    return (
        <div>{id}</div>
    )
}

export default StudentDetails