// src/pages/ErrorPage.tsx
import { Button } from 'antd';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { motion } from 'framer-motion';

export default function Error() {
    const error = useRouteError();
    let title = 'Đã xảy ra lỗi';
    let description = 'Rất tiếc! Có gì đó không đúng.';
    let statusCode = 500;

    if (isRouteErrorResponse(error)) {
        statusCode = error.status;
        if (error.status === 404) {
            title = 'Không tìm thấy trang';
            description = 'Trang bạn đang tìm kiếm không tồn tại.';
        }
        // else if (error.status === 403) {
        //     title = 'Không được phép truy cập';
        //     description = 'Bạn không có quyền truy cập vào trang này.';
        // }
    }

    return (
        <motion.div
            className="min-h-[80vh] flex flex-col justify-center items-center text-center space-y-6 bg-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-6xl font-bold text-green-600">{statusCode}</h1>
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-500 max-w-md">{description}</p>
            <Link to="/">
                <Button type="primary" size="large">Quay về trang chủ</Button>
            </Link>
        </motion.div>
    );
}
