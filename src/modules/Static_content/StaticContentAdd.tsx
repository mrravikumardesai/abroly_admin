import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, Input, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


import { useNavigate } from 'react-router-dom'

const StaticContentAdd = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")

  const navigate = useNavigate()

  const addStaticContentApiCall = async () => {
    const { data, success } = await commonPostAPICall({
      title,
      description,
      url
    },"/static/create")
    if (success && success == true) {
      navigate(-1)
    }
  }


  return (
    <div className='container my-6 mx-auto space-y-4'>
      <p className='text-xl font-bold'>Add Static Content</p>

      <section className='space-y-3'>
        <Input
          label="Title"
          value={title}
          variant='bordered'
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <Input
          label="End Point URL"
          value={url}
          variant='bordered'
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <ReactQuill theme="snow" value={description}
          onChange={(value) => {
            setDescription(value)
          }}
        />  

        <Button 
          variant='shadow' 
          color='primary'
          onPress={addStaticContentApiCall}
          >Add Page</Button>

      </section>

    </div>
  )
}

export default StaticContentAdd