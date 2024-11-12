import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Spinner } from '@nextui-org/react'
import { Briefcase, FileText, Globe, ChevronDown, ChevronUp, User, CheckCircle, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StudentDetails = () => {
    const { id } = useParams()

    // loader state
    const [isLoading, setLoading] = useState(true)

    // profile state
    const [basic_profile, setBasicProfile] = useState<any>(null)
    const [student_info, setStudentInfo] = useState<any>(null)
    const [isStudyAbroadCollapsed, setIsStudyAbroadCollapsed] = useState(false)
    const [isEducationCollapsed, setIsEducationCollapsed] = useState(false)
    const [isAdditionalInfoCollapsed, setIsAdditionalInfoCollapsed] = useState(false)

    useEffect(() => {
        getStudentProfile()
    }, [])

    const getStudentProfile = async () => {
        setLoading(true)
        const { success, data } = await commonPostAPICall({
            student_uuid: id
        }, "/student/admin/getProfile")
        if (success && success === true) {
            setBasicProfile(data?.basic_profile)
            setStudentInfo(data?.student_information)
        }
        setLoading(false)
    }

    const toggleSection = (section: string) => {
        switch (section) {
            case 'studyAbroad':
                setIsStudyAbroadCollapsed(!isStudyAbroadCollapsed)
                break
            case 'education':
                setIsEducationCollapsed(!isEducationCollapsed)
                break
            case 'additionalInfo':
                setIsAdditionalInfoCollapsed(!isAdditionalInfoCollapsed)
                break
            default:
                break
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div className="flex justify-center my-5">
                    <Spinner />
                </div>
            ) : (
                <>
                    {/* profile */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                            <User className="h-6 w-6 text-blue-600 mr-2" />
                            Student Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Username */}
                            <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-700">Name</h4>
                                <span className="text-gray-500">{student_info?.username}</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-700">Email</h4>
                                <span className="text-gray-500">{student_info?.email}</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-700">Phone</h4>
                                <span className="text-gray-500">{student_info?.phone}</span>
                            </div>


                            {/* Account Status */}
                            <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-700">Account Status</h4>
                                <span className="text-gray-500 flex items-center">
                                    {student_info?.is_verified ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                    )}
                                    {student_info?.is_verified ? 'Verified' : 'Unverified'}
                                </span>
                            </div>

                           

                            {/* Account Created At */}
                            <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-700">Account Created</h4>
                                <span className="text-gray-500">
                                    {new Date(student_info?.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Last Updated */}
                            <div className="flex items-center space-x-4">
                                <h4 className="font-medium text-gray-700">Last Updated</h4>
                                <span className="text-gray-500">
                                    {new Date(student_info?.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>


                    {basic_profile ? (
                        <>
                            {/* Study Abroad Profile Section */}
                            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('studyAbroad')}>
                                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                                        <Globe className="h-6 w-6 text-blue-600 mr-2" />
                                        Study Abroad Profile
                                    </h3>
                                    {isStudyAbroadCollapsed ? (
                                        <ChevronDown className="text-gray-500" />
                                    ) : (
                                        <ChevronUp className="text-gray-500" />
                                    )}
                                </div>
                                {!isStudyAbroadCollapsed && (
                                    <div className="mt-4 space-y-4">
                                        {[
                                            { label: 'Study Abroad Intentions', value: basic_profile?.study_abroad_intentions },
                                            { label: 'Reason for Study Abroad', value: basic_profile?.study_abroad_reasons },
                                            { label: 'Field of Study', value: basic_profile?.field_of_study },
                                            { label: 'Degree Level', value: basic_profile?.degree_level },
                                            { label: 'Career Goals', value: basic_profile?.career_goals },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center space-x-4">
                                                <h4 className="font-medium text-gray-700">{item.label}</h4>
                                                <span className="text-gray-500">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Educational & Career Details Section */}
                            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('education')}>
                                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                                        <FileText className="h-6 w-6 text-green-600 mr-2" />
                                        Educational & Career Details
                                    </h3>
                                    {isEducationCollapsed ? (
                                        <ChevronDown className="text-gray-500" />
                                    ) : (
                                        <ChevronUp className="text-gray-500" />
                                    )}
                                </div>
                                {!isEducationCollapsed && (
                                    <div className="mt-4 space-y-4">
                                        {[
                                            { label: 'Course Selection', value: basic_profile?.course_selection },
                                            { label: 'Program Duration', value: basic_profile?.program_duration },
                                            { label: 'Test Scores', value: basic_profile?.test_scores ? 'Yes' : 'No' },
                                            { label: 'Preferred Country', value: basic_profile?.preferred_country },
                                            { label: 'Scholarship Requirements', value: basic_profile?.scholarship_requirements ? 'Yes' : 'No' },
                                            { label: 'Budget', value: basic_profile?.budget },
                                            { label: 'Academic Performance', value: basic_profile?.academic_performance },
                                            { label: 'Language Proficiency Scores', value: basic_profile?.language_proficiency_scores },
                                            { label: 'Work Experience', value: basic_profile?.work_experience },
                                            { label: 'Interested in Internships', value: basic_profile?.interested_in_internships ? 'Yes' : 'No' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center space-x-4">
                                                <h4 className="font-medium text-gray-700">{item.label}</h4>
                                                <span className="text-gray-500">{item.value || 'Not Provided'}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Additional Information Section */}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('additionalInfo')}>
                                    <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                                        <Briefcase className="h-6 w-6 text-blue-600 mr-2" />
                                        Additional Information
                                    </h3>
                                    {isAdditionalInfoCollapsed ? (
                                        <ChevronDown className="text-gray-500" />
                                    ) : (
                                        <ChevronUp className="text-gray-500" />
                                    )}
                                </div>
                                {!isAdditionalInfoCollapsed && (
                                    <div className="mt-4 space-y-4">
                                        {[
                                            { label: 'Visa Type', value: basic_profile?.visa_type },
                                            { label: 'Accommodation Needs', value: basic_profile?.accommodation_needs ? 'Yes' : 'No' },
                                            { label: 'Health Insurance Needs', value: basic_profile?.health_insurance_needs ? 'Yes' : 'No' },
                                            { label: 'Extracurricular Interests', value: basic_profile?.extracurricular_interests },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center space-x-4">
                                                <h4 className="font-medium text-gray-700">{item.label}</h4>
                                                <span className="text-gray-500">{item.value || 'Not Provided'}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 mt-6">Profile Not Updated Yet</p>
                    )}
                </>
            )}
        </div>
    )
}

export default StudentDetails
