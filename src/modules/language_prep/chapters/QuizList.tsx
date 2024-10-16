import CommonConfirmation from '@/components/CommonConfirmation';
import { commonPostAPICall } from '@/utils/ApiCallUtils';
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom'

const QuizList = () => {

    const { leval, course_uuid } = useParams()

    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({
        question_text: '',
        options: { a: '', b: '', c: '', d: '' },
        right_answer: 'a',
        editingId: null,
    });

    // Fetch questions from API
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const { data, success } = await commonPostAPICall({
            course_uuid,
            level: levels[+leval - 1]
        }, "/quiz/list")
        setQuestions(data);
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('option_')) {
            const optionKey = name.split('_')[1];
            setForm({
                ...form,
                options: { ...form.options, [optionKey]: value },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };
    const levels = [
        "level1",
        "level2",
        "level3",
    ]


    const { isOpen: isOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();


    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        const { question_text, options, right_answer, editingId } = form;
        const {
            data,
            success
        } = await commonPostAPICall({
            leval: levels[+leval - 1],
            question_text,
            options,
            right_answer,
            course_uuid,
            uuid: editingId ? editingId : undefined
        }, editingId ? "quiz/update" : "/quiz/add")
        if (success && success == true) {
            setForm({ question_text: '', options: { a: '', b: '', c: '', d: '' }, right_answer: 'a', editingId: null });
            fetchQuestions();
            onOpenChangeAdd()
        }
    }

    // Edit a question
    const handleEdit = (question) => {
        setForm({
            question_text: question.question_text,
            options: JSON.parse(question.options),
            right_answer: question.right_answer,
            editingId: question.uuid,
        });
        onOpenChangeAdd()
    };

    const { isOpen: isDeleteCnfOpen, onOpenChange: onDeleteCnfOpenChange } = useDisclosure();
    const [deleteId, setSetDeleteId] = useState("")
    // Delete a question
    const handleDelete = async () => {
        // await axios.delete(`/api/questions/${id}`);
        const { data, success } = await commonPostAPICall({ uuid: deleteId }, "/quiz/delete")
        if (success && success == true) {
            fetchQuestions();
            setSetDeleteId("")
            onDeleteCnfOpenChange()
        }
    };

    return (
        <div className="mx-auto p-6">
            <div className='flex flex-row justify-between items-center'>
                <p>Total Questions : {questions?.length}</p>
                <Button
                    variant='shadow'
                    color='primary'
                    onPress={() => {
                        onOpenChangeAdd()
                    }}
                >Add Question</Button>
            </div>

            <section className='py-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
                {questions?.map((question) => (
                    <Card key={question?.uuid} shadow='md'>
                        <CardBody>
                            <div className="flex flex-col justify-between items-start gap-2">
                                <section className='flex flex-row justify-around items-center w-full'>
                                    <h2 className="text-lg font-bold flex-grow">{question?.question_text}</h2>
                                    <section className='w-full flex flex-row gap-1 items-end justify-end flex-1 p-2'>
                                        <Button
                                            isIconOnly
                                            size='sm'
                                            onClick={() => handleEdit(question)}
                                            className="text-blue-600"
                                            variant='flat'
                                        >
                                            <MdEdit />
                                        </Button>
                                        <Button
                                            isIconOnly
                                            size='sm'
                                            onClick={() => {
                                                setSetDeleteId(question.uuid)
                                                onDeleteCnfOpenChange()
                                            }}
                                            color='danger'
                                            variant='flat'
                                        >
                                            <MdDelete />
                                        </Button>
                                    </section>
                                </section>


                            </div>
                            <div className="mt-2 text-gray-600">
                                {Object.entries(JSON.parse(question?.options)).map(([key, value]: any) => (
                                    <p key={key}>
                                        {key?.toUpperCase()}: {value}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-2">
                                <strong>Right Answer:</strong> {question?.right_answer.toUpperCase()}
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </section>

            {/* add edit */}
            <Modal
                isOpen={isOpenAdd}
                onOpenChange={onOpenChangeAdd}
                scrollBehavior="inside"
                backdrop='blur'
                size='3xl'
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Questions
                            </ModalHeader>
                            <ModalBody>
                                {/* Form for adding/updating questions */}
                                <form onSubmit={handleSubmitQuestion} className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-lg">Question:</label>
                                        <input
                                            type="text"
                                            name="question_text"
                                            value={form.question_text}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {['a', 'b', 'c', 'd'].map((option) => (
                                            <div key={option}>
                                                <label className="block text-lg">Option {option.toUpperCase()}:</label>
                                                <input
                                                    type="text"
                                                    name={`option_${option}`}
                                                    value={form.options[option]}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-lg">Right Answer:</label>
                                        <select
                                            name="right_answer"
                                            value={form.right_answer}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                        >
                                            {['a', 'b', 'c', 'd'].map((option) => (
                                                <option key={option} value={option}>
                                                    {option.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-4 rounded-md"
                                    >
                                        {form.editingId ? 'Update Question' : 'Add Question'}
                                    </button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <CommonConfirmation
                isOpen={isDeleteCnfOpen}
                onOpenChange={onDeleteCnfOpenChange}
                title={"Are you sure want to delete ?"}
                handleSubmit={() => {
                    handleDelete()
                }}
                nagativeTitle={"No"}
                positiveTitle={"Yes"}
            />
        </div>



    );
}

export default QuizList