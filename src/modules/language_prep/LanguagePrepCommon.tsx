import { QuillFormats, QuillModules } from '@/components/ReactQuillNavOptions'
import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { getAuthToken } from '@/utils/localstorage'
import { ErrorToast, SuccessToast } from '@/utils/Toaster'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'

const LanguagePrepCommon = ({ isNew, uuid = "" }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState()
    const [existFile, setExistFile] = useState()

    const navigate = useNavigate()

    const [details, setDetails] = useState([])

    useEffect(() => {
        if (isNew == false) {
            initDetailsApiCall()
        }
    }, [])

    const initDetailsApiCall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: uuid }, "/language_prep/details_basic")
        if (success && success == true) {
            // setDetails(data)
            setTitle(data?.title)
            setDescription(data?.description)
            setExistFile(data?.access_banner)
        }
    }

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
    const updateLanguage = async () => {

        const formData = new FormData()
        if (files) {
            formData.append("file", files)
        }
        formData.append("title", title)
        formData.append("uuid", uuid)
        formData.append("description", description)

        await axios.post(`${BaseUrl}/v1/language_prep/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getAuthToken()}`
            },
        }).then(() => {
            SuccessToast("Language Updated")
            initDetailsApiCall()
            // navigate(-1)
        }).catch((e) => {
            ErrorToast(e.message)
        })
    }
    return (
        <div className='container my-6 mx-auto space-y-4'>
            <p className='text-xl font-bold'>{isNew == true ? "Add New Language" : "Edit Language"} </p>

            <p className='text-md font-bold'>Banner Image</p>
            <input
                type='file'
                multiple={true}
                onChange={(e: any) => {
                    setFiles(e.target.files[0])
                }}
            />

            <section className='flex flex-row gap-2 flex-wrap'>
                {
                    files &&
                    <section className='relative'>
                        <img className='w-[33vw]' src={URL.createObjectURL(files)} />
                    </section>
                }
            </section>
            <section className='flex flex-row gap-2 flex-wrap'>
                {
                    existFile &&
                    <section className='relative'>
                        <img className='w-[33vw]' src={existFile} />
                    </section>
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
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    theme="snow" value={description}
                    onChange={(value) => {
                        setDescription(value)
                    }}
                    className=' w-full'

                />


            </section>

            <Button
                variant='shadow'
                color='primary'
                onPress={isNew ? addLanguage : updateLanguage}
            >{isNew == true ? "Add Language" : "Update Language"} </Button>

        </div>
    )
}

export default LanguagePrepCommon