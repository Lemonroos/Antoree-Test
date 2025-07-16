import { Button, Col, Flex, Input, Row, Select, Skeleton, Space } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';

const { Option } = Select;

interface FilterProps {
  loading: boolean;

  search: string;
  onSearch: (val: string) => void;

  aiLoading: boolean;
  showAI: boolean;
  onToggleAI: () => void;
  onAISubmit: (prompt: string) => void;

  sortBy: string;
  onSortChange: (val: string) => void;
  priceFilter: string;
  onPriceChange: (val: string) => void;
  tagOptions: string[];
  tagFilter: string[];
  onTagChange: (vals: string[]) => void;

  categoryOptions: string[];
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  onFavorite: boolean;
}

export default function SearchFilter({
  loading,

  search, onSearch,

  aiLoading, onAISubmit,

  sortBy, onSortChange,
  priceFilter, onPriceChange,
  tagOptions, tagFilter, onTagChange,

  categoryOptions, categoryFilter, onCategoryChange, onFavorite
}: FilterProps) {
  const [prompt, setPrompt] = useState('');

  return (
    <Skeleton active loading={loading} paragraph={false}>
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={24} md={24} lg={onFavorite ? 14 : 12}>

            <Input
              placeholder="Tìm theo tên khóa học..."
              value={search}
              onChange={e => onSearch(e.target.value)}
            />
          </Col>
          {!onFavorite && (

            <Col xs={24} sm={24} md={24} lg={12}>
              <Flex gap="small">
                <Input
                  placeholder="Nhập từ khóa AI..."
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  disabled={aiLoading}
                  onPressEnter={() => prompt.trim() && onAISubmit(prompt)}
                />
                <Button
                  type="primary"
                  onClick={() => prompt.trim() && onAISubmit(prompt)}
                  loading={aiLoading}
                  disabled={!prompt.trim()}
                >
                  Gửi AI
                </Button>
              </Flex>
            </Col>
          )}
        </Row>

        <Row gutter={[12, 12]} className="mt-4" align="middle">
          <Col xs={24} sm={8} md={6} lg={4}>
            <Select
              value={sortBy}
              onChange={onSortChange}
              className="w-full"
              placeholder="Sắp xếp"
            >
              <Option value="createdDesc">Mới nhất</Option>
              <Option value="createdAsc">Cũ nhất</Option>
              <Option value="startDesc">Bắt đầu ↓</Option>
              <Option value="startAsc">Bắt đầu ↑</Option>
              <Option value="alphaAsc">A → Z</Option>
              <Option value="alphaDesc">Z → A</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6} lg={4}>
            <Select
              value={priceFilter}
              onChange={onPriceChange}
              className="w-full"
              placeholder="Giá"
            >
              <Option value="all">Tất cả</Option>
              <Option value="<500K">Dưới 500K</Option>
              <Option value="500K-1M">500K–1M</Option>
              <Option value=">1M">Trên 1M</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={12} lg={onFavorite ? 6 : 16}>
            <Select
              mode="multiple"
              placeholder="Lọc theo tag"
              value={tagFilter}
              onChange={onTagChange}
              className="w-full"
            >
              {tagOptions.map(tag => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <div className="mt-4">
          <Space size="small" wrap>
            {['all', ...categoryOptions].map(cat => (
              <Button
                key={cat}
                size="middle"
                type={categoryFilter === cat ? 'primary' : 'default'}
                onClick={() => onCategoryChange(cat)}
                className={classNames('capitalize', {
                  'bg-green-600 text-white': categoryFilter === cat,
                })}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </Button>
            ))}
          </Space>
        </div>
      </div>
    </Skeleton>
  );
}
