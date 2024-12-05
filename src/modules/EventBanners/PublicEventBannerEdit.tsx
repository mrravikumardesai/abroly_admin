import { useEffect, useState } from 'react';
import { Form } from 'rsuite';
import { Button, Input } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '@/utils/localstorage';
import { Trash } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { commonGetAPICalls } from '@/utils/ApiCallUtils';

const PublicEventBannerEdit = () => {

    const { id } = useParams();

    useEffect(() => {
        getApiCall();
    }, [id]);

    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        heading: '',
        descriptive_text: '',
        images: []
    });

    const getApiCall = async () => {
        const { success, data } = await commonGetAPICalls("/event-banners/public-get/" + id);
        if (success && success == true) {
            setFormData({
                start_date: data?.start_date,
                end_date: data?.end_date,
                heading: data?.heading,
                descriptive_text: data?.descriptive_text,
                images: data?.images
            });
        }
    }


    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (files) => {
        setFormData({ ...formData, images: [...formData.images, ...files.target.files] });
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
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <div>
                    <label>Start Date</label>
                    <Input type="date" name="start_date" value={new Date(formData?.start_date).toISOString().split('T')[0]} onChange={handleChange} />
                </div>
                <div>
                    <label>End Date</label>
                    <Input type="date" name="end_date" value={new Date(formData?.end_date).toISOString().split('T')[0]} onChange={handleChange} />
                </div>
                <div>
                    <label>Heading</label>
                    <Input name="heading" value={formData?.heading} onChange={handleChange} />
                </div>
                <div>
                    <label>Descriptive Text</label>
                    <ReactQuill value={formData?.descriptive_text} onChange={(value) => handleChange({ target: { name: 'descriptive_text', value } })} />
                </div>
                <div className='flex flex-row gap-2 items-center justify-start my-2'>
                    <label>Upload Images</label>
                    <input type="file" onChange={handleFileChange} multiple />
                </div>
                <p className="text-gray-600 text-sm">
                    Please ensure to upload small amount of images. The event banner will be created as private by default. You can add more images later and change the status to public.
                </p>

                {formData.images && formData.images.length > 0 && (
                    <div>
                        <h2>Uploaded Images</h2>
                        <ul className='flex flex-col gap-2'>
                            {formData?.images?.map((image, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <img src={URL.createObjectURL(image)} alt={image.name} className="h-40 object-cover mr-2" />
                                    <span>{image.name}</span>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            const updatedImages = [...formData.images];
                                            updatedImages.splice(index, 1);
                                            setFormData({ ...formData, images: updatedImages });
                                        }}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button type="submit" className='w-fit' variant='shadow' color='primary' onClick={handleSubmit}>Create Banner</Button>
            </form>
        </div>
    );
};

export default PublicEventBannerEdit