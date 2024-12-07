
import React, { useEffect, useState } from 'react';
import { Table, Spinner, TableColumn, TableRow, TableCell, TableHeader, TableBody, Pagination } from '@nextui-org/react';
import { commonGetAPICalls, commonPostAPICall } from '@/utils/ApiCallUtils';

import BackButton from '@/components/BackButton';
import { useParams } from 'react-router-dom';

const PublicEventBannerInquiries = () => {
    const { id } = useParams();
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const inquiriesPerPage = 10; // Adjust the number of inquiries per page as needed

    const fetchInquiries = async (page = 1) => {
        setIsLoading(true);
        const { data, success } = await commonGetAPICalls(`/event-banners/public-response-list/${id}?page=${page}&limit=${inquiriesPerPage}`);
        if (success) {
            setInquiries(data?.data); // Update to use the 'data' array from the response
            setTotalPages(data?.total); // Update to use 'total' for total pages
            setTotalCount(data?.totalCount); // Set the total count from the response
            setCurrentPage(data?.currentPage); // Set the current page from the response
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchInquiries(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className='container mx-auto'>
            <p className='my-4 font-bold flex flex-row items-center gap-2'><BackButton />Public Event Banner Inquiries</p>
            {isLoading ? (
                <div className='flex items-center justify-center h-screen'>
                    <Spinner />
                </div>
            ) : (
                <Table aria-label="Inquiries Table"
                    bottomContent={<div className='flex flex-row items-center justify-center w-full'>
                        <Pagination
                            size='sm'
                            total={totalPages}
                            onChange={handlePageChange}
                            color="primary"
                            initialPage={currentPage}
                        />

                    </div>}
                >
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Number</TableColumn>
                        <TableColumn>Inquiry Date</TableColumn>
                    </TableHeader>
                    <TableBody
                        emptyContent={<div>No data found</div>}
                    >
                        {inquiries.map((inquiry, index) => (
                            <TableRow key={index}>
                                <TableCell>{inquiry.name}</TableCell>
                                <TableCell>{inquiry.email}</TableCell>
                                <TableCell>{inquiry.phone_number}</TableCell>
                                <TableCell>{new Date(inquiry?.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default PublicEventBannerInquiries