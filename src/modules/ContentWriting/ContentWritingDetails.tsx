import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { getAuthToken } from '@/utils/localstorage'
import { ErrorToast, SuccessToast } from '@/utils/Toaster'
import { Button, Card, CardBody, Chip, Select, SelectItem } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import FileSaver from 'file-saver'

const ContentWritingDetails = () => {

    const { id } = useParams()

    const [details, setDetails] = useState<any>()
    const [files, setFiles] = useState([])
    // status
    const [applicationStatus, setApplicationStatus] = useState<any>()

    useEffect(() => {
        initDetailsApiCall()
        initFilesDetailsAPICall()
    }, [])

    const initDetailsApiCall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: id }, "/content_writing_response/details")
        if (success && success == true) {
            setDetails(data)
            setApplicationStatus(data.application_status)
        }

    }
    const initFilesDetailsAPICall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: id }, "/content_writing_response/list_files")
        if (success && success == true) {
            setFiles(data)
            // setApplicationStatus(data.application_status)
        }


    }

    const BaseUrl = import.meta.env.VITE_API_BASE_URL

    // provide file

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        // Trigger the hidden input when button is clicked
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

            const formData = new FormData()

            formData.append("uuid", id)
            formData.append("file", file)

            await axios.post(`${BaseUrl}/v1/content_writing_response/add_files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getAuthToken()}`
                },
            }).then(() => {
                SuccessToast("File Uploaded")
                initFilesDetailsAPICall()
            }).catch((e) => {
                ErrorToast(e.message)
            })
        }
    };

    // change status
    const changeStatusApiCall = async () => {
        const { data, success } = await commonPostAPICall({ uuid: id,status:applicationStatus }, "/content_writing_response/change_status",true)
        if (success && success == true) {
            initDetailsApiCall()
        }
    }



    return (
        <div>
            <Card className='container mx-auto'>
                <CardBody>
                    <div className="p-4">
                        <h1 className='text-2xl'>Form Details</h1>
                        <hr className='my-2' />
                        <div className="flex justify-between items-center">

                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{details?.name}</h2>
                            {/* <p className="text-sm text-gray-500 dark:text-gray-400">ID: {details?.id}</p> */}
                        </div>
                        {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">UUID: {details?.uuid}</p> */}

                        <div className="mb-2">
                            <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email:</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{details?.email}</p>
                        </div>

                        <div className="mb-2">
                            <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number:</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{details?.number}</p>
                        </div>

                        <div className="mb-2">
                            <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Message:</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{details?.message}</p>
                        </div>

                        <div className="mb-2">
                            <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Selected Type:</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{details?.selected_type.replaceAll("_", " ").toUpperCase()}</p>
                        </div>

                        <div className="mb-2">
                            <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Status:</span>
                            <Chip
                                color={details?.payment_status === "pending" ? 'warning' : details?.payment_status === "paid" ? "success" : "danger"}
                                variant='flat'
                            >{details?.payment_status}</Chip>
                        </div>

                        <div className="mb-2">
                            <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Application Status:</span>
                            <Chip
                                color={details?.application_status === "pending" ? 'warning' : details?.application_status === "accept" || details?.application_status === "pdf_provided"? "success" : "warning" }
                                variant='flat'
                            >{details?.application_status}</Chip>
                        </div>

                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                            <p>Created: {new Date(details?.createdAt).toLocaleString()}</p>
                            <p>Updated: {new Date(details?.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className='container mx-auto mt-5'>
                <CardBody>
                    <div className="p-4 flex flex-col items-start gap-2">
                        <h1 className='text-2xl'>Application Status</h1>
                        <hr className='w-full' />
                        <p className='font-bold'>Current Status: {details?.application_status}</p>
                        <Select
                            label="Change Status"
                            variant="bordered"
                            placeholder="Select Status For Update"
                            value={applicationStatus}
                            className="max-w-xs"
                            onChange={(e) => {
                                setApplicationStatus(e.target.value)
                            }}
                        >
                            {["pending", "in_progress", "rejected", "accept", "pdf_provided"].map((item) => (
                                <SelectItem key={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </Select>
                        <p className='text-tiny'>Please Press Update Status after change the status</p>
                        <Button onPress={changeStatusApiCall} color='primary'>Update Status</Button>

                    </div>

                </CardBody>

            </Card>
            <Card className='container mx-auto mt-5'>
                <CardBody>
                    <div className="p-4 flex flex-col items-start gap-2">
                        <h1 className='text-2xl'>Provided Documents</h1>
                        <hr className='w-full' />

                        <Button onPress={handleButtonClick}>Add Document</Button>

                        <section className='flex flex-row flex-wrap gap-2 items-stretch justify-stretch'>
                            {files && files.length != 0 ? files.map((item) => (
                                <Card className="truncate hover:text-clip max-w-screen overflow-scroll">
                                    <CardBody>
                                            <div className="py-3 flex flex-col gap-2 items-start">
                                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                                    File Type: {item?.file_type}
                                                </div>
                                                <p className="text-balance text-tiny">
                                                    {item?.file_name}
                                                </p>
                                                <p className="text-gray-500 text-tiny">Uploaded On : {new Date(item?.createdAt).toLocaleString()}</p>
                                                <Button
                                                    className=""
                                                    onPress={() => {
                                                        FileSaver.saveAs(item.access_file, item.file_name);
                                                    }}
                                                >
                                                    Download File
                                                </Button>
                                            </div>
                                    </CardBody>
                                </Card>
                            )) : <p>No Documents Uploaded</p>}
                        </section>



                    </div>

                </CardBody>

            </Card>


            {/* hidden ref */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    )
}

export default ContentWritingDetails