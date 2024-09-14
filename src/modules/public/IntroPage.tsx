import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import React from 'react'
import { BiBadge } from 'react-icons/bi'
import { FaPlayCircle } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const IntroPage = () => {
    return (
        <div className='text-dark_primary dark:text-white'>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                    <div className="lg:col-span-3">
                        <h1 className="tracking-* text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">Abroly - Simplifying Visas</h1>
                        <p className="my-3 text-lg ">Find all visa-related solutions, tailored for students and travelers. From application guidance to expert advice, Abroly simplifies your journey abroad.</p>

                        <Button
                            as={"a"}
                            href='#services'
                            variant='flat'
                            color='primary'
                        >
                            Getting Started
                        </Button>

                    </div>

                    <div className="lg:col-span-4 mt-10 lg:mt-0">
                        <img className="w-full h-[70vh] object-cover rounded-xl" src="https://images.pexels.com/photos/4645982/pexels-photo-4645982.jpeg" alt="Hero Image" />
                    </div>
                </div>
            </div>

            {/* services */}

            <section className='container mx-auto my-36' id='services' >
                <h1 className='text-3xl text-center'>Everything you need for academics in one place</h1>


                <section className='flex flex-row items-center flex-wrap gap-5 justify-center my-10 p-10' >
                    {["a", "b", "c", "D"].map((item: any) =>

                        <a className="group flex gap-y-6 size-full md:size-1/3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                            <svg className="shrink-0 size-8 mt-0.5 me-6 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
                            <div>
                                <div>
                                    <h3 className="block font-bold ">Build your portfolio</h3>
                                    <p className="">The simplest way to keep your portfolio always up-to-date.</p>
                                </div>

                                <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold ">
                                    Learn more {">"}
                                </p>
                            </div>
                        </a>

                    )}
                </section>
            </section>

            {/* why choose abroly */}

            <div className="container p-10 mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl text-gray-800 lg:text-3xl dark:text-white">
                            Why Choose Abroly?
                        </h2>
                        <p className="mt-3 text-gray-800 dark:text-neutral-400">
                            Abroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.
                        </p>
                    </div>

                    <div className="space-y-6 lg:space-y-10">
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                            </span>
                            <div className="grow">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Industry-leading documentation
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Our documentation and extensive Client libraries contain everything a business needs to build a custom integration in a fraction of the time.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
                            </span>
                            <div className="grow">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Developer community support
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    We actively contribute to open-source projects—giving back to the community through development, patches, and sponsorships.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" /></svg>
                            </span>
                            <div className="grow">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Simple and affordable
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    From boarding passes to movie tickets, there's pretty much nothing you can't store with Preline.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* testimonails */}
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView={1}  // Show one slide at a time
                autoplay={{ delay: 3000 }}
                loop={true}
                autoHeight={true}  // Adjust the height based on the slide content
                navigation={true}  // Enable navigation buttons
                className="swiper-container"
            >
                {["", "", ""].map((item: any, index: number) =>
                    <SwiperSlide key={index} className="swiper-slide w-auto h-auto">  {/* Make sure the slides take auto width/height */}
                        <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            <blockquote className="text-center lg:mx-auto lg:w-3/5 space-y-5">
                                <div className="mt-6 lg:mt-10">
                                    <p className="relative text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium text-gray-800">
                                        <svg className="absolute top-0 start-0 transform -translate-x-8 -translate-y-8 size-16 text-gray-200 sm:h-24 sm:w-24 dark:text-neutral-700" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z" fill="currentColor" />
                                        </svg>
                                        <span className="relative z-10 italic text-gray-800 dark:text-neutral-200">I just wanted to say that I'm very happy with my purchase of Preline so far. The documentation is outstanding - clear and detailed.</span>
                                    </p>
                                </div>
                                <Button variant='flat' color='warning' isIconOnly><FaPlayCircle /></Button>
                                <footer className="mt-6">
                                    <div className="font-semibold text-gray-800 dark:text-neutral-200">Philip</div>
                                </footer>
                            </blockquote>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>


            <div className="container px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-2">
                        <div className="max-w-xs">
                            <h2 className="text-3xl md:text-4xl md:leading-tight dark:text-white">Frequently<br />asked questions</h2>
                            <p className="mt-1 hidden md:block text-gray-600 dark:text-neutral-400">Answers to the most frequently asked questions.</p>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <Accordion variant="light">
                            <AccordionItem key="1" aria-label="Question 1" title="Question1">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit aperiam voluptate pariatur minima error! Distinctio voluptates dolor vitae.</p>
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Question 2" title="Question 2">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit aperiam voluptate pariatur minima error! Distinctio voluptates dolor vitae.</p>
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Question 3" title="Question 3">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur reprehenderit aperiam voluptate pariatur minima error! Distinctio voluptates dolor vitae.</p>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>



        </div>
    )

}

export default IntroPage