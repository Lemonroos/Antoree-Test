// // src/components/Products/SuggestionSection.tsx
// import { Alert, Button, Input, Skeleton } from 'antd';
// import { motion } from 'framer-motion';
// import type { Product } from '../../types/Product';
// import ProductCard from './ProductCard';

// interface Props {
//     suggestions: Product[] | null;
//     loading: boolean;
//     error: string | null;
//     onFetch: (promt: string) => void;
//     onCardClick: (p: Product) => void;
//     onUpdateProduct: (u: Product) => void;
// }

// export default function SuggestionSection({
//     suggestions,
//     loading,
//     error,
//     onFetch,
//     onCardClick,
//     onUpdateProduct
// }: Props) {
//     if (loading) {
//         return <Skeleton active paragraph={{ rows: 2 }} />;
//     }
//     if (error) {
//         return (
//             <Alert
//                 message="Không thể lấy gợi ý"
//                 description={error}
//                 type="error"
//                 action={<Button size="small" onClick={onFetch}>Thử lại</Button>}
//                 showIcon
//             />
//         );
//     }
//     if (!suggestions || suggestions.length === 0) {
//         return null;
//     }

//     return (
//         <motion.section
//             className="mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//         >
//             <h3 className="text-xl font-semibold mb-4">Gợi ý cho bạn</h3>
//             {/* ==== CHAT PROMPT ==== */}
//             <div className="flex mb-4">
//                 <Input
//                     placeholder="Nhập từ khóa ví dụ: học tiếng Anh giao tiếp"
//                     value={prompt}
//                     onChange={e => setPrompt(e.target.value)}
//                     className="flex-1 mr-2"
//                 />
//                 <Button onClick={() => onFetch(prompt)} loading={loading}>
//                     AI Gợi ý
//                 </Button>
//             </div>

//             <p className="text-sm text-gray-500">
//                 Chỉ có {suggestions.length} gợi ý phù hợp với lựa chọn của bạn
//             </p>
//             <div className="flex space-x-4 overflow-x-auto pb-2">
//                 {suggestions.map(p => (
//                     <div key={p.id} className="flex-shrink-0 w-64">
//                         <ProductCard
//                             product={p}
//                             onClick={onCardClick}
//                             onUpdate={onUpdateProduct}
//                         />
//                     </div>
//                 ))}
//             </div>
//         </motion.section>
//     );
// }


// src/components/Products/SuggestionSection.tsx
import { Alert, Button, Input, Skeleton } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Product } from '../../types/Product';
import ProductCard from './ProductCard';

interface SuggestionSectionProps {
    suggestions: Product[] | null;
    loading: boolean;
    error: string | null;
    onFetch: (prompt: string) => void;
    onCardClick: (p: Product) => void;
    onUpdateProduct: (u: Product) => void;
}

export default function SuggestionSection({
    suggestions,
    loading,
    error,
    onFetch,
    onCardClick,
    onUpdateProduct,
}: SuggestionSectionProps) {
    const [prompt, setPrompt] = useState('');

    return (
        <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-xl font-semibold mb-4">Gợi ý cho bạn</h3>

            {/* Input + Button luôn hiện */}
            <div className="flex mb-4">
                <Input
                    placeholder="Nhập từ khóa ví dụ: 'Học tiếng Anh giao tiếp'"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    className="flex-1 mr-2"
                    onPressEnter={() => onFetch(prompt)}
                />
                <Button
                    type="primary"
                    onClick={() => onFetch(prompt)}
                    disabled={!prompt.trim()}
                    loading={loading}
                >
                    AI Gợi ý
                </Button>
            </div>

            {/* Nếu đang loading, show Skeleton */}
            {loading && <Skeleton active paragraph={{ rows: 1 }} />}

            {/* Nếu có lỗi, show Alert */}
            {error && (
                <Alert
                    className="mb-4"
                    message="Không thể lấy gợi ý"
                    description={error}
                    type="error"
                    action={
                        <Button size="small" onClick={() => onFetch(prompt)}>
                            Thử lại
                        </Button>
                    }
                    showIcon
                />
            )}

            {/* Nếu đã có suggestions, show số lượng + cards */}
            {suggestions && suggestions.length > 0 && (
                <>
                    <p className="text-sm text-gray-500 mb-2">
                        Có {suggestions.length} gợi ý phù hợp
                    </p>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {suggestions.map(p => (
                            <div key={p.id} className="flex-shrink-0 w-64">
                                <ProductCard
                                    product={p}
                                    onClick={onCardClick}
                                    onUpdate={onUpdateProduct}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </motion.section>
    );
}
