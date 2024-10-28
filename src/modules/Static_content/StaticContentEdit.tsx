import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Button, Input, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import { QuillFormats, QuillModules } from '@/components/ReactQuillNavOptions'

const StaticContentEdit = () => {

    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")

    useEffect(()=>{
        fetchStaticContent()
    },[])

    const navigate = useNavigate()

    const updateStaticContentApiCall = async () => {
        const { data, success } = await commonPostAPICall({
            title,
            description,
            url
        }, "/static/update")
        if (success && success == true) {
            navigate(-1)
        }
    }
    const fetchStaticContent = async () => {
        const { data, success } = await commonPostAPICall({
            url: id
        }, "/static/detail")
        if (success && success == true) {
            setTitle(data.title)
            setDescription(data.description)
            setUrl(data.url)
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
                    disabled
                    label="End Point URL"
                    value={url}
                    variant='bordered'
                    onChange={(e) => {
                        // setUrl(e.target.value)
                    }}
                />
                <ReactQuill 
                    theme="snow" 
                    value={description}
                    modules={QuillModules}
                    formats={QuillFormats}
                    onChange={(value) => {
                        setDescription(value)
                    }}
                />

                <Button
                    variant='shadow'
                    color='primary'
                    onPress={updateStaticContentApiCall}
                >Update Page</Button>

            </section>

        </div>
    )
}

export default StaticContentEdit