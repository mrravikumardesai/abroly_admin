import { commonPostAPICall } from '@/utils/ApiCallUtils'
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SideBannerResponses = () => {
    const { uuid } = useParams()
    const [loading, setIsLoading] = useState(false)
    const [applicants, setApplicantsData] = useState([])

    useEffect(() => {
        findResponses()
    }, [])

    const findResponses = async () => {
        setIsLoading(true)
        const { success, data } = await commonPostAPICall({ uuid: uuid }, "/side_banner/admin/get_responses")
        if (success && success == true) {
            setApplicantsData(data)
        }
        setIsLoading(false)
    }

    return (
        <div className='container mx-auto'>
            <Table
                aria-label="Job Post Listing"
                style={{
                    height: "auto",
                    minWidth: "100%",
                }}
                // topContent={
                //     <BackButton
                //         title={"Responses"}
                //     />
                // }
            >
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Phone</TableColumn>
                    <TableColumn>Submit At</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={
                        <p>No Rows to display</p>
                    }
                    loadingContent={<Spinner />}
                    isLoading={loading}
                >
                    {applicants.map((applicant) => (
                        <TableRow key={applicant?.uuid}>
                            <TableCell>{applicant?.name}</TableCell>
                            <TableCell>{applicant?.email}</TableCell>
                            <TableCell>{applicant?.phone_number}</TableCell>
                            <TableCell>{new Date(applicant?.createdAt).toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SideBannerResponses