import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils'
import { Avatar, Button, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, User, MapPin, Image, Clock, ClipboardCheck, IdCard, Search } from 'lucide-react';


const SideBannerAchievements = () => {
    const { status } = useParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")
    useEffect(() => {
        if (!["pending", "history"].includes(status)) {
            navigate("/side_banner_achievements/pending", { replace: true })
        } else {
            findRecords()
        }
    }, [status])

    const [achievementListing, setAchievementListing] = useState<any[]>([])

    const findRecords = async () => {
        setIsLoading(true)
        const { success, data } = await commonPostAPICall({ status, search }, `/side_banner/admin/list`)
        if (success && success == true) {
            setAchievementListing(data)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            findRecords()
        }, 500)
        return () => clearTimeout(timeout)
    }, [search])


    const actionApiCall = async (uuid: string, action: string) => {
        const { success } = await commonPostAPICall({ uuid, status: action }, "/side_banner/admin/action", true)
        if (success && success == true) {
            findRecords()
        }
    }

    return (
        <div className='space-y-2 container mx-auto'>
            <Input
                className='w-7xl'
                startContent={<Search className='h-4 text-gray-400' />}
                placeholder='Search name | id | title'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                isClearable
                onClear={() => {
                    setSearch("")
                }}
            />
            {isLoading ? (
                <div className="flex justify-center my-5">
                    <Spinner />
                </div>
            ) : (
                achievementListing?.length == 0 ? <p>No Records Found</p> :
                    <section className='grid lg:grid-cols-2 gap-2'>

                        {achievementListing?.map((record: any) => (
                            <div
                                key={record?.uuid}
                                className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Banner Image */}
                                <div className="relative w-full h-48">
                                    <img
                                        src={record?.access_image}
                                        alt={record?.campaign_title}
                                        className="w-full h-full object-scale-down transition duration-200"
                                    />
                                    <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                        Position: {record?.position}
                                    </div>
                                </div>

                                {/* Campaign Details */}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{record?.campaign_title}</h2>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <IdCard size={16} /> Agent Id: {record?.banner_of?.uuid}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <User size={16} /> Created by: {record?.banner_of?.username}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                        <Calendar size={16} /> From: {new Date(record?.start_date).toDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <Calendar size={16} /> To: {new Date(record?.end_date).toDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <ClipboardCheck size={16} /> Status:{" "}
                                        <span
                                            className={`font-medium ${record?.status === "pending"
                                                ? "text-yellow-500"
                                                : record?.status === "accept"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {record?.status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <MapPin size={16} /> Target: {record?.target_type.toUpperCase()}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="pb-4 pr-4 flex justify-end items-center gap-2 h-fit">
                                    {record?.status !== "reject" && <Button variant='flat' color='danger' onClick={() => {
                                        actionApiCall(record?.uuid, "reject")
                                    }}>Reject</Button>
                                    }
                                    {status !== "history" &&
                                        <Button variant='flat' color='success' onClick={() => {
                                            actionApiCall(record?.uuid, "accept")
                                        }}>Accept</Button>
                                    }
                                </div>
                            </div>
                        ))}
                    </section>
            )}
        </div>
    )
}

export default SideBannerAchievements