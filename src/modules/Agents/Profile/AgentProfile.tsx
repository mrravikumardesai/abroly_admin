import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Globe, MapPin, Mail, Phone, Info, Clock, Facebook, Instagram, Linkedin, Twitter, Youtube, MessageSquare } from "lucide-react";


const AgentProfile = ({ agentUuid }) => {

    // there will be two section 
    const [isLoading, setIsLoading] = useState(true)

    const [profile, setProfile] = useState<any>({})

    // agent_profile/admin/get_basic_profile
    useEffect(() => {
        findAgentProfile()
    }, [])

    const findAgentProfile = async () => {
        setIsLoading(true)
        const { success, data } = await commonPostAPICall({
            agentUuid: agentUuid
        }, "agent_profile/admin/get_basic_profile")

        if (success && success == true) {
            setProfile(data)
        }

        setIsLoading(false)
    }

    return (
        <div>
            {isLoading == true ? <div className='flex items-center justify-center my-5'><Spinner /></div> :
                <div>
                    <div className="container mx-auto p-8 space-y-8 ">
                        {/* Agent Basic Profile Card */}
                        <div className=" overflow-hidden">
                            <div className="p-6 border-b ">
                                <h2 className="text-2xl font-semibold">Agent Basic Profile</h2>
                                <p className="text-sm">UUID: {profile?.basic_profile?.uuid}</p>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Office Address Section */}
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                                        Office Address
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.officeStreetAddress}</p>
                                    <p className="text-gray-600">{profile?.basic_profile?.officeCity}, {profile?.basic_profile?.officeStateProvince}</p>
                                    <p className="text-gray-600">{profile?.basic_profile?.officeCountry}</p>
                                    <p className="text-gray-600">{profile?.basic_profile?.officePostalCode}</p>
                                </div>

                                {/* About Us Section */}
                                <div className="col-span-1 sm:col-span-2">
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Info className="h-5 w-5 mr-2 text-blue-600" />
                                        About Us
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.aboutUs}</p>
                                </div>

                                {/* Detailed Description */ }
                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Info className="h-5 w-5 mr-2 text-blue-600" />
                                        Detailed Description
                                    </h4>
                                    <div
                                        className="text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: profile?.basic_profile?.detailedDescription }}
                                    />
                                </div>

                                {/* Contact Information */}
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                                        Email
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.contactEmail}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Phone className="h-5 w-5 mr-2 text-blue-600" />
                                        Phone
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.contactPhoneNumber || "N/A"}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                                        WhatsApp
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.contactWhatsApp || "N/A"}</p>
                                </div>

                                {/* Social Media Links */}
                                <div className="col-span-1 sm:col-span-2">
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Globe className="h-5 w-5 mr-2 text-blue-600" />
                                        Website
                                    </h4>
                                    <a href={`https://${profile?.basic_profile?.website}`} className="text-blue-500 underline">
                                        {profile?.basic_profile?.website}
                                    </a>
                                </div>

                                <div className="col-span-full">
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Globe className="h-5 w-5 mr-2 text-blue-600" />
                                        Social Media Links
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {profile?.basic_profile?.socialFacebook && (
                                            <a href={`https://${profile?.basic_profile?.socialFacebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg">
                                                <Facebook className="h-5 w-5 text-blue-600" />
                                                <span className="text-blue-600 underline">{profile?.basic_profile?.socialFacebook}</span>
                                            </a>
                                        )}
                                        {profile?.basic_profile?.socialInstagram && (
                                            <a href={`https://${profile?.basic_profile?.socialInstagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-pink-50 hover:bg-pink-100 p-2 rounded-lg">
                                                <Instagram className="h-5 w-5 text-pink-500" />
                                                <span className="text-pink-500 underline">{profile?.basic_profile?.socialInstagram}</span>
                                            </a>
                                        )}
                                        {profile?.basic_profile?.socialLinkedIn && (
                                            <a href={`https://${profile?.basic_profile?.socialLinkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg">
                                                <Linkedin className="h-5 w-5 text-blue-700" />
                                                <span className="text-blue-700 underline">{profile?.basic_profile?.socialLinkedIn}</span>
                                            </a>
                                        )}
                                        {profile?.basic_profile?.socialTwitter && (
                                            <a href={`https://${profile?.basic_profile?.socialTwitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg">
                                                <Twitter className="h-5 w-5 text-blue-400" />
                                                <span className="text-blue-400 underline">{profile?.basic_profile?.socialTwitter}</span>
                                            </a>
                                        )}
                                        {profile?.basic_profile?.socialYouTube && (
                                            <a href={`https://${profile?.basic_profile?.socialYouTube}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 p-2 rounded-lg">
                                                <Youtube className="h-5 w-5 text-red-600" />
                                                <span className="text-red-600 underline">{profile?.basic_profile?.socialYouTube}</span>
                                            </a>
                                        )}
                                        {profile?.basic_profile?.socialOther && (
                                            <a href={`https://${profile?.basic_profile?.socialOther}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-lg">
                                                <Globe className="h-5 w-5 text-gray-600" />
                                                <span className="text-gray-600 underline">{profile?.basic_profile?.socialOther}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Operating Hours */}
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                                        Operating Hours (Weekdays)
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.operatingHoursWeekdays}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                                        Operating Hours (Weekends)
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.operatingHoursWeekends}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                                        Time Zone
                                    </h4>
                                    <p className="text-gray-600">{profile?.basic_profile?.operatingHoursTimeZone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Branch Office Address Section */}
                        <div className="rounded-lg overflow-hidden">
                            <div className="p-6 border-b ">
                                <h2 className="text-2xl font-semibold">Branch Offices</h2>
                            </div>
                            {profile?.branch_office_address?.length > 0 ? (
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile?.branch_office_address?.map((branch) => (
                                        <div key={branch.id} className="border p-4 rounded-lg">
                                            <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                                                {branch.city}, {branch.country}
                                            </h4>
                                            <p className="text-gray-600">{branch.streetAddress}</p>
                                            <p className="text-gray-600">{branch.stateProvince}</p>
                                            <p className="text-gray-600">{branch.postalCode}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-gray-600">No branch offices available.</div>
                            )}
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default AgentProfile