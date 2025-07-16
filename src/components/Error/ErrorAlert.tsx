// src/components/UI/FetchErrorAlert.tsx
import { Alert, Button } from 'antd';
import type { ReactNode } from 'react';

interface FetchErrorAlertProps {
    error: string | null;
    onRetry: () => void;
    context?: ReactNode;  // nếu muốn show thêm thông tin
}

export default function ErrorAlert({
    error,
    onRetry,
    context,
}: FetchErrorAlertProps) {
    if (!error) return null;

    return (
        <Alert
            className="mb-4"
            type="error"
            showIcon
            message="Lỗi kết nối"
            description={
                <>
                    <p className="mb-2">{error}</p>
                    {context}
                    <Button size="small" onClick={onRetry}>
                        Thử lại
                    </Button>
                </>
            }
        />
    );
}
