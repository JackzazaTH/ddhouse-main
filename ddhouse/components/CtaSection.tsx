'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const CtaSection = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/appointment');
    };

    return (
        <div className="bg-gray-100 rounded-lg p-8 md:p-12 mt-12 text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-primary mb-4">
                พร้อมสร้างบ้านในฝันของคุณแล้วหรือยัง?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                ติดต่อเราเพื่อรับคำปรึกษาจากทีมงานผู้เชี่ยวชาญของเราได้แล้ววันนี้
            </p>
            <button
                onClick={handleNavigate}
                className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
                นัดหมายปรึกษาสถาปนิก
            </button>
        </div>
    );
};

export default CtaSection;
