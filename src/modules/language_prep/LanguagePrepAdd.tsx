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
import LanguagePrepCommon from './LanguagePrepCommon';

const LanguagePrepAdd = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState()

  const navigate = useNavigate()


  const BaseUrl = import.meta.env.VITE_API_BASE_URL

  const addLanguage = async () => {

    const formData = new FormData()
    formData.append("file", files)
    formData.append("title", title)
    formData.append("description", description)

    await axios.post(`${BaseUrl}/v1/language_prep/add`, formData, {
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
    <LanguagePrepCommon isNew={true}/>
  )
}

export default LanguagePrepAdd