import { commonPostAPICall } from '@/utils/ApiCallUtils';
import { getAuthToken } from '@/utils/localstorage';
import { ErrorToast, SuccessToast } from '@/utils/Toaster';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import React, { useState } from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const LanguagePrepAdd = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState([])

  const navigate = useNavigate()


  const BaseUrl = import.meta.env.VITE_API_BASE_URL

  const addLanguage = async () => {

    const formData = new FormData()
    files.map((file)=>{
      formData.append("file", file)
    })
    formData.append("title", title)
    formData.append("description", description)

    await axios.post(`${BaseUrl}/v1/content_writing_response/add_files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getAuthToken()}`
        },
    }).then(() => {
        SuccessToast("Language Added")
        navigate(-1)
    }).catch((e) => {
        ErrorToast(e.message)
    })
  }
  return (
    <div className='container my-6 mx-auto space-y-4'>
      <p className='text-xl font-bold'>Add New Language</p>

      <p className='text-md font-bold'>Banner Images</p>
      <input
        type='file'
        multiple={true}
        onChange={(e) => {
          setFiles((files) => [...files, ...e.target.files])
        }}
      />

      <section className='flex flex-row gap-2 flex-wrap'>
        {
          files && files.length !== 0 &&
          files.map((file: any) => (
            <section className='relative'>
              <img className='w-[33vw]' src={URL.createObjectURL(file)} />
              <Button variant='solid' color='danger' className='absolute top-0 right-0 m-4' isIconOnly><IoMdRemoveCircleOutline /></Button>
            </section>
          ))

        }
      </section>


      <p className='text-md font-bold'>Basic Information</p>
      <section className='space-y-3'>
        <Input
          label="Title"
          value={title}
          variant='bordered'
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <ReactQuill theme="snow" value={description}
          onChange={(value) => {
            setDescription(value)
          }}
          className='h-[50vh] w-full'

        />

        <Button
          variant='shadow'
          color='primary'
          onPress={addLanguage}
        >Add Page</Button>

      </section>

    </div>
  )
}

export default LanguagePrepAdd