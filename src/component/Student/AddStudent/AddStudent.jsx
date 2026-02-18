import { useState } from "react";

const AddStudent = () => {
    const [formData, setFormData] = useState({
        photo: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        parentName: '',
        email: '',
        phone: '',
        address: ''
    });

    const [addressLength, setAddressLength] = useState(0);

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

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-[#4D44B5] text-white px-[30px] py-[20px] rounded-t-[20px] -mx-[30px] -mt-[30px] mb-[30px]">
                <h2 className="text-[24px] font-[700]">Student Details</h2>
            </div>

            {/* Form Content */}
            <div className="flex gap-[30px]">
                {/* Photo Upload Section */}
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

                {/* Form Fields */}
                <div className="flex-1">
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
                        <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                            Date & Place of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-[20px]">
                            <input
                                type="text"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                placeholder="24 Februari 1997"
                                className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                            />
                            <input
                                type="text"
                                name="placeOfBirth"
                                value={formData.placeOfBirth}
                                onChange={handleInputChange}
                                placeholder="Jakarta"
                                className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                            />
                        </div>
                    </div>

                    {/* Parent Name Field */}
                    <div className="mb-[20px]">
                        <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                            Parent Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            placeholder="Mona William"
                            className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                        />
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                        <div>
                            <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="william@mail.com"
                                className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                            />
                        </div>
                        <div>
                            <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1234567890"
                                className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE]"
                            />
                        </div>
                    </div>

                    {/* Address Field */}
                    <div className="mb-[20px]">
                        <label className="block text-[#303972] text-[14px] font-[600] mb-[10px]">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                rows="5"
                                maxLength="1000"
                                className="w-full px-[20px] py-[12px] border border-[#E0E0E0] rounded-[8px] outline-none focus:border-[#4D44B5] transition-colors text-[14px] text-[#303972] placeholder-[#A098AE] resize-none"
                            />
                            <div className="absolute bottom-[12px] right-[20px] text-[#A098AE] text-[12px]">
                                {addressLength}/1000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddStudent;
