import { useState } from 'react';
import { Form } from 'rsuite';
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '@/utils/localstorage';

const PublicEventBannerCreate = () => {
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        heading: '',
        descriptive_text: '',
        images: []
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (files) => {
        setFormData({ ...formData, images:[...files.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { start_date, end_date, heading, descriptive_text, images } = formData;

        if (!start_date || !end_date || !heading || !descriptive_text || images.length === 0) {
            setError('All fields are required, and at least one image must be uploaded.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('start_date', start_date);
        formDataToSend.append('end_date', end_date);
        formDataToSend.append('heading', heading);
        formDataToSend.append('descriptive_text', descriptive_text);
        console.log(formData.images);
        formData?.images?.forEach((image) => {
            formDataToSend.append('images', image);
        });

        try {
            const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/v1/event-banners/public-create', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                navigate('/public_event_banners'); // Redirect to the banners list
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('An error occurred while creating the event banner.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Create Public Event Banner</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Start Date</label>
                    <Input type="date" name="start_date" onChange={handleChange} />
                </div>
                <div>
                    <label>End Date</label>
                    <Input type="date" name="end_date" onChange={handleChange} />
                </div>
                <div>
                    <label>Heading</label>
                    <Input name="heading" onChange={handleChange} />
                </div>
                <div>
                    <label>Descriptive Text</label>
                    <Input name="descriptive_text" onChange={handleChange} />
                </div>
                <div>
                    <label>Upload Images</label>
                    <input type="file" onChange={handleFileChange} multiple />
                </div>
                <Button type="submit" onClick={handleSubmit}>Create Banner</Button>
            </form>
        </div>
    );
};

export default PublicEventBannerCreate