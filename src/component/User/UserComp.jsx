import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPhone, faEnvelope, faEllipsis, faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const UserComp = () => {
    const [showAllContacts, setShowAllContacts] = useState(false);
    const [showAllMessages, setShowAllMessages] = useState(false);

    const allContacts = [
        { id: 1, name: 'Samantha William', class: 'Class VII-A', hasMessage: false },
        { id: 2, name: 'Tony Soap', class: 'Class VII-A', hasMessage: true },
        { id: 3, name: 'Karen Hope', class: 'Class VII-A', hasMessage: false },
        { id: 4, name: 'Jordan Nico', class: 'Class VII-B', hasMessage: false },
        { id: 5, name: 'Nadila Adja', class: 'Class VII-C', hasMessage: false },
        { id: 6, name: 'Johnny Depp', class: 'Class VII-A', hasMessage: false },
        { id: 7, name: 'Sarah Connor', class: 'Class VII-B', hasMessage: true },
        { id: 8, name: 'Mike Johnson', class: 'Class VII-C', hasMessage: false },
    ];

    const allMessages = [
        { id: 1, name: 'Samantha William', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 2 },
        { id: 2, name: 'Tony Soap', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 2 },
        { id: 3, name: 'Karen Hope', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 0 },
        { id: 4, name: 'Jordan Nico', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 2 },
        { id: 5, name: 'Nadila Adja', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 0 },
        { id: 6, name: 'John Smith', message: 'Lorem ipsum dolor sit amet...', time: '11:30 AM', unread: 1 },
        { id: 7, name: 'Emma Wilson', message: 'Lorem ipsum dolor sit amet...', time: '10:15 AM', unread: 0 },
        { id: 8, name: 'Robert Brown', message: 'Lorem ipsum dolor sit amet...', time: '09:45 AM', unread: 3 },
    ];

    const displayedContacts = showAllContacts ? allContacts : allContacts.slice(0, 5);
    const displayedMessages = showAllMessages ? allMessages : allMessages.slice(0, 5);

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <div className="flex flex-wrap justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">User Dashboard</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>
            {/* User Profile Card */}
            <div className="bg-[#fff] rounded-[20px] overflow-hidden mt-[20px] w-[100%] shadow-sm">
                {/* Header Banner with Decorative Circles */}
                <div className="relative h-[120px] bg-[#4D44B5] overflow-hidden">

                    <button className="absolute top-[20px] bg-transparent border-none right-[20px] text-[#fff] cursor-pointer hover:text-[#A098AE] transition-colors">
                        <FontAwesomeIcon icon={faEllipsis} className="text-[24px]" />
                    </button>
                </div>
                {/* Profile Content */}
                <div className="relative w-[100%] px-[30px] pb-[30px]">
                    {/* Avatar - Overlapping Banner */}
                    <div className="absolute top-[-50px] left-[30px]">
                        <div className="w-[100px] h-[100px] rounded-full bg-[#C1BBEB] border-4 border-[#fff]"></div>
                    </div>

                    {/* User Info */}
                    <div className="pt-[60px]">
                        <h2 className="text-[#303972] text-[28px] font-[700] mb-[5px]">Nabila Azalea</h2>
                        <p className="text-[#4D44B5] text-[16px] font-[600] mb-[8px]">Admin</p>
                        <div className="flex flex-wrap justify-between items-center gap-[8px] text-[#A098AE] text-[14px] ">
                            <div>
                                <FontAwesomeIcon icon={faLocationDot} className="text-[14px]" />
                                <span>Jakarta, Indonesia</span>
                            </div>
                            <div>
                                <p className="text-[#A098AE] text-[14px] mb-[10px]">Phone</p>
                                <div className="flex items-center gap-[12px]">
                                    <div className="w-[40px] h-[40px] bg-[#FB7D5B] rounded-full flex items-center justify-center flex-shrink-0">
                                        <FontAwesomeIcon icon={faPhone} className="text-[#fff] text-[16px]" />
                                    </div>
                                    <span className="text-[#303972] text-[16px] font-[600]">+12 345 6789 0</span>
                                </div>
                            </div>
                            {/* Email */}
                            <div>
                                <p className="text-[#A098AE] text-[14px] mb-[10px]">Email</p>
                                <div className="flex items-center gap-[12px]">
                                    <div className="w-[40px] h-[40px] bg-[#FB7D5B] rounded-full flex items-center justify-center flex-shrink-0">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-[#fff] text-[16px]" />
                                    </div>
                                    <span className="text-[#303972] text-[16px] font-[600]">jordan@mail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contacts and Messages Section */}
            <div className="flex flex-col lg:flex-row gap-[20px] mt-[20px]">
                {/* Contacts Section */}
                <div className="bg-[#fff] rounded-[20px] p-[30px] flex-1 shadow-sm">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-[25px]">
                        <div>
                            <h2 className="text-[#303972] text-[24px] font-[700] mb-[5px]">Contacts</h2>
                            <p className="text-[#A098AE] text-[14px]">You have <span className="font-[600]">741</span> contacts</p>
                        </div>
                        <button className="w-[45px] h-[45px] bg-[#4D44B5] rounded-full flex items-center justify-center hover:bg-[#3d3691] transition-colors">
                            <FontAwesomeIcon icon={faPlus} className="text-white text-[18px]" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center border-1 overflow-hidden bg-[#fff] rounded-full py-[12px] mb-[25px]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                        <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                    </div>
                    {/* Contacts List */}
                    <div className={`flex flex-col gap-[20px] ${showAllContacts ? 'max-h-[400px] overflow-y-auto pr-[10px]' : ''}`}>
                        {displayedContacts.map((contact) => (
                            <div key={contact.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-[15px]">
                                    <div className="w-[50px] h-[50px] rounded-full bg-[#C1BBEB] flex-shrink-0"></div>
                                    <div>
                                        <h3 className="text-[#303972] text-[16px] font-[600] mb-[2px]">{contact.name}</h3>
                                        <p className="text-[#A098AE] text-[13px]">{contact.class}</p>
                                    </div>
                                </div>
                                <button className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors ${contact.hasMessage
                                        ? 'bg-[#4D44B5] text-[#fff]'
                                        : 'bg-transparent border-2 border-[#A098AE] text-[#A098AE] hover:border-[#4D44B5] hover:text-[#4D44B5]'
                                    }`}>
                                    <FontAwesomeIcon icon={faEnvelope} className="text-[16px]" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAllContacts(!showAllContacts)}
                        className="w-full bg-[#ced0e8] text-[#4D44B5] text-[15px] border-none font-[600] py-[17px] rounded-full mt-[25px] hover:bg-[#e8e9fd] transition-colors"
                    >
                        {showAllContacts ? 'Show Less' : 'View More'}
                    </button>
                </div>

                <div className="bg-[#fff] rounded-[20px] p-[30px] flex-1 shadow-sm">
                    {/* Header */}
                    <div className="mb-[25px]">
                        <h2 className="text-[#303972] text-[24px] font-[700]">Messages</h2>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center border-1 overflow-hidden bg-[#fff] rounded-full py-[12px] mb-[25px]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                        <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                    </div>

                    {/* Messages List */}
                    <div className={`flex flex-col  ${showAllMessages ? 'max-h-[400px] overflow-y-auto pr-[10px]' : ''}`}>
                        {displayedMessages.map((msg) => (
                            <div key={msg.id} className="flex items-center gap-[15px] cursor-pointer hover:bg-[#F3F4FF] p-[10px] rounded-[12px] transition-colors -ml-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full bg-[#C1BBEB] flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-[5px]">
                                        <h3 className="text-[#303972] text-[16px] font-[600]">{msg.name}</h3>
                                        <span className="text-[#A098AE] text-[12px] flex-shrink-0 ml-[10px]">{msg.time}</span>
                                    </div>
                                    <p className="text-[#A098AE] text-[13px] truncate">{msg.message}</p>
                                </div>
                                {msg.unread > 0 && (
                                    <div className="w-[24px] h-[24px] bg-[#FB7D5B] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#fff] text-[12px] font-[600]">{msg.unread}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAllMessages(!showAllMessages)}
                        className="w-full bg-[#ced0e8] text-[#4D44B5] text-[15px] border-none font-[600] py-[17px] rounded-full mt-[25px] hover:bg-[#e8e9fd] transition-colors"
                    >
                        {showAllMessages ? 'Show Less' : 'View More'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default UserComp;