

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeacher } from "../../store/slices/teachersSlice";

const AddTeacher = () => {
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    const [formData, setFormData] = useState({
        photo: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        subject: '',
        email: '',
        phone: '',
        address: '',
        university: '',
        degree: '',
        city: '',
        startDate: '',
        endDate: '',
    });

    const [addressLength, setAddressLength] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'address') {
            setAddressLength(value.length);
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                photo: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName.trim() || !formData.lastName.trim()) return;
        dispatch(addTeacher(formData));
        setSubmitted(true);
        setTimeout(() => navigate("/teachers"), 1200);
    };

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] px-[15px]">
            <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">Add New Teacher</h1>

            {submitted && (
                <div className="mx-[20px] mb-[10px] bg-[#E8F8F0] border border-[#4CAF79] text-[#4CAF79] px-[20px] py-[12px] rounded-[12px] font-[600]">
                    ✅ Teacher added successfully! Redirecting…
                </div>
            )}

            {/* Header */}
            <div className="bg-[#fff] rounded-[20px] mb-[20px]">
                <div className="bg-[#4D44B5] text-[#fff] px-[30px] py-[11px] rounded-t-[20px] mb-[30px]">
                    <h2 className="text-[24px] font-[700]">Personal Details</h2>
                </div>
                <div className="flex gap-[30px] px-[2rem] bg-[#fff]">
                    {/* Form Fields */}
                    <div className="w-[100%]">
                        {/* First Name and Last Name Row */}
                        <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Samantha"
                                    className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="William"
                                    className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                />
                            </div>
                        </div>

                        {/* Date & Place of Birth Row */}
                        <div className="mb-[20px]">
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div>
                                    <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="samantha.william@example.com"
                                        className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="081234567890"
                                        className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="flex justify-between mb-[20px]">
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <div>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                        rows="6"
                                        maxLength="1000"
                                        className="w-[40rem] px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE] resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    Photo <span className="text-red-500">*</span>
                                </label>
                                <div className="w-[140px] h-[140px] border-2 border-dashed border-[#C1BBEB] rounded-[12px] flex items-center justify-center cursor-pointer hover:border-[#4D44B5] transition-colors relative overflow-hidden">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {formData.photo ? (
                                        <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center px-[15px]">
                                            <p className="text-[#A098AE] text-[12px] leading-[16px]">
                                                Drag and drop or click here to select file
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    Date of Birth<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    placeholder="Date of Birth"
                                    className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    Place of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirth}
                                    onChange={handleInputChange}
                                    placeholder="Place of Birth"
                                    className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="bg-[#fff] rounded-[20px]">
                <div className="bg-[#4D44B5] text-[#fff] px-[30px] py-[11px] rounded-t-[20px] mb-[30px]">
                    <h2 className="text-[24px] font-[700]">Education</h2>
                </div>
                <div className="flex gap-[30px] px-[2rem] bg-[#fff]">
                    {/* Form Fields */}
                    <div className="w-[100%]">
                        <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    University<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleInputChange}
                                    placeholder="University Name"
                                    className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                    Degree<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Software Engineering"
                                    className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                />
                            </div>
                        </div>

                        {/* Date & Place of Birth Row */}
                        <div className="mb-[20px]">
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div>
                                    <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                        Start & End Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-[10px]">
                                    <input
                                        type="text"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        placeholder="Start Date"
                                        className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                    />
                                    <input
                                        type="text"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        placeholder="End Date"
                                        className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                    />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[100%] flex justify-end gap-[20px] bg-[#F5F5F5] py-[20px] px-[20px] rounded-b-[20px]" >
                <button type="button" className="px-[30px] py-[12px] border-[#4D44B5] rounded-full  text-[#4D44B5] text-[16px] font-[400] ">Save as Draft</button>
                <button type="button" onClick={handleSubmit} className="px-[30px] py-[12px] rounded-full bg-[#5B5BE0] text-[#fff] text-[16px] font-[400]">Submit</button>
            </div>
        </div>
    )
}
export default AddTeacher;