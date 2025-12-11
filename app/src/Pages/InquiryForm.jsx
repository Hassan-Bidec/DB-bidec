"use client";

import React, { useEffect, useState } from 'react';
import { PiCaretDownThin } from 'react-icons/pi';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomSeo from '../components/CustomSeo';
import axios from '../Utils/axios';
import { Image_Url } from '../const';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function InquiryForm() {
    const router = useRouter();

    const [productCategory, setProductCategory] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('Choose one product');
    const [selectedProductId, setSelectedProductId] = useState();

    // Form fields
    const [name, setName] = useState('');
    const [companyNumber, setCompanyNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);

    // Success/Error message state
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000, delay: 0 });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get('search/product');
                setProductCategory(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product.name);
        setSelectedProductId(product.id);
        setIsDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!name || !companyNumber || !contactNumber || !location || !email || !selectedProductId) {
            toast.error('Please fill all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('company_number', companyNumber);
        formData.append('contact_no', contactNumber);
        formData.append('location', location);
        formData.append('email', email);
        formData.append('product_id', selectedProductId);
        if (file) formData.append('logo_design', file);

        try {
            const response = await axios.public.post('inquiry_add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Form submitted successfully!');
            // Reset form fields
            setName('');
            setCompanyNumber('');
            setContactNumber('');
            setLocation('');
            setEmail('');
            setFile(null);
            setSelectedProduct('Choose one product');
            setSelectedProductId(null);
            const logoInput = document.getElementById('logo');
            if (logoInput) logoInput.value = '';

            setIsError(false);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            toast.error('Error submitting form. Please try again.');
            setIsError(true);
            console.log('Form submission error:', error);
        }
    };

    return (
        <div className="relative py-32 px-10 text-white overflow-hidden">
            <CustomSeo slug="inquiry" />
            <ToastContainer autoClose={500} />

            {/* Breadcrumb and Title */}
            <div className="flex flex-col py-5">
                <p>
                    <Link href="/">Home</Link> / <Link href="/customization/">Customization</Link> / Inquiry
                </p>
                <h1 className="py-10 font-bazaar md:text-6xl text-5xl">INQUIRY FORM</h1>
            </div>

            {/* Background Images */}
            <img
                data-aos="fade-left"
                className="absolute top-32 right-0 w-20"
                src={`${Image_Url}basket.svg`}
                alt="Basket"
            />
            <img
                data-aos="fade-right"
                className="absolute top-[52rem] left-0 w-20"
                src={`${Image_Url}plate.svg`}
                alt="Plate"
            />

            {/* Form */}
            <div className="flex justify-center items-center">
                <form className="w-full max-w-4xl relative" onSubmit={handleSubmit}>
                    {/* Success/Error Message */}
                    {message && (
                        <div className={`p-4 mb-4 rounded text-white`}>{message}</div>
                    )}

                    {/* Name */}
                  <div className="py-2 flex flex-col w-full">
    <label htmlFor="name" className="font-medium">
        Name <span className="text-red-500">*</span>
    </label>

    <input
        id="name"
        className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white placeholder-gray-400"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
            const value = e.target.value;

            // Allow only A–Z and space
            if (/^[A-Za-z ]*$/.test(value)) {
                setName(value);
            }
        }}
        required
    />
</div>


                    {/* Company Number */}
                    <div className="py-2 flex flex-col w-full">
                        <label htmlFor="company" className="font-medium">Company Number <span className="text-red-500">*</span></label>
                        <input
                            id="company"
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white placeholder-gray-400"
                            type="number"
                            placeholder="Enter your company number"
                            value={companyNumber}
                            onChange={(e) => setCompanyNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="py-2 flex flex-col lg:w-1/2 w-full">
                        <label htmlFor="number" className="font-medium">Contact Number <span className="text-red-500">*</span></label>
                        <input
                            id="number"
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white placeholder-gray-400"
                            type="number"
                            placeholder="Enter your contact number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="py-2 flex flex-col w-full">
                        <label htmlFor="location" className="font-medium">Location <span className="text-red-500">*</span></label>
                        <input
                            id="location"
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white placeholder-gray-400"
                            type="text"
                            placeholder="Enter your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="py-2 flex flex-col w-full">
                        <label htmlFor="email" className="font-medium">Email address <span className="text-red-500">*</span></label>
                        <input
                            id="email"
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white placeholder-gray-400"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Dropdown */}
                    <div className="py-2 flex flex-col w-full md:w-80">
                        <label htmlFor="dropdown" className="font-medium">Please choose the product <span className="text-red-500">*</span></label>
                        <div
                            onClick={() => setIsDropdown(!isDropdown)}
                            className="flex justify-between items-center p-2 rounded-md px-3 my-2 border border-white bg-transparent cursor-pointer text-white"
                        >
                            <p>{selectedProduct}</p>
                            <PiCaretDownThin size={20} />
                        </div>

                        {isDropdown && (
                            <div className="absolute z-10 w-full md:w-80 rounded-lg mt-1 overflow-y-auto h-96 bg-white border border-gray-200 shadow-lg">
                                {productCategory.map((product, index) => (
                                    <h4
                                        key={index}
                                        className="text-black p-2 px-4 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        {product.name}
                                    </h4>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="py-10 flex flex-col w-full">
                        <label htmlFor="upload" className="font-medium">Upload Your Artwork If Any (Logo/Designs)</label>
                        <div
                            id="upload"
                            className="flex flex-col my-2 relative w-full h-60 items-center justify-center border-2 border-dashed rounded-lg border-gray-300"
                        >
                            <button type="button" className="px-3 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-600">
                                Select Files...
                            </button>
                            <p className="text-gray-400 mt-2">or drag and drop files here</p>
                            <input
                                type="file"
                                id="logo"
                                name="thumbnail"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {file && <p className="text-green-400 mt-2">✓ {file.name}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-10 py-2 pt-3 my-5 bg-teal-700 text-xl font-bazaar rounded-md hover:bg-teal-600 duration-300"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InquiryForm;