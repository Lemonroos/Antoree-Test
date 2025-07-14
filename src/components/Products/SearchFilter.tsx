// import { Input, Select, Checkbox, Space } from 'antd';

// const { Option } = Select;

// interface FilterProps {
//   search: string;
//   onSearch: (val: string) => void;
//   priceFilter: string;
//   onPriceChange: (val: string) => void;
//   typeFilter: string[];
//   onTypeChange: (vals: string[]) => void;
// };

// export default function SearchFilter({ search, onSearch, priceFilter, onPriceChange, typeFilter, onTypeChange }: FilterProps) {
//   return (
//     <Space direction="vertical" className="w-full md:flex md:space-x-4 md:space-y-0">
//       <Input
//         placeholder="Search products..."
//         value={search}
//         onChange={e => onSearch(e.target.value)}
//         className="w-full md:w-1/3"
//       />
//       <Select
//         value={priceFilter}
//         onChange={onPriceChange}
//         className="w-full md:w-1/4"
//       >
//         <Option value="all">All Prices</Option>
//         <Option value="<500K">Below 500K</Option>
//         <Option value="500K-1M">500K - 1M</Option>
//         <Option value=">1M">Above 1M</Option>
//       </Select>
//       <Checkbox.Group
//         value={typeFilter}
//         onChange={vals => onTypeChange(vals as string[])}
//         className="flex space-x-4"
//       >
//         <Checkbox value="course">Courses</Checkbox>
//         <Checkbox value="book">Books</Checkbox>
//       </Checkbox.Group>
//     </Space>
//   );
// }


// src/components/SearchFilter.tsx
// import { Input, Select, Checkbox, Space, Slider, Rate } from 'antd';

// const { Option } = Select;

// interface FilterProps {
//   search: string;
//   onSearch: (val: string) => void;

//   priceFilter: string;
//   onPriceChange: (val: string) => void;

//   typeFilter: string[];
//   onTypeChange: (vals: string[]) => void;

//   categoryOptions: string[];
//   categoryFilter: string;
//   onCategoryChange: (val: string) => void;

//   tagOptions: string[];
//   tagFilter: string[];
//   onTagChange: (vals: string[]) => void;

//   ratingFilter: number;
//   onRatingChange: (val: number) => void;

//   reviewsFilter: number;
//   onReviewsChange: (val: number) => void;

//   sortBy: string;
//   onSortChange: (val: string) => void;

//   favoriteOnly: boolean;
//   onFavoriteChange: (val: boolean) => void;
// };

// export default function SearchFilter({
//   search,
//   onSearch,
//   priceFilter,
//   onPriceChange,
//   typeFilter,
//   onTypeChange,
//   categoryOptions,
//   categoryFilter,
//   onCategoryChange,
//   tagOptions,
//   tagFilter,
//   onTagChange,
//   ratingFilter,
//   onRatingChange,
//   reviewsFilter,
//   onReviewsChange,
//   sortBy,
//   onSortChange,
//   favoriteOnly,
//   onFavoriteChange,
// }: FilterProps) {
//   return (
//     <Space direction="vertical" size="middle" className="w-full">
//       {/* Search and Sort Row */}
//       <Space wrap className="w-full justify-between">
//         <Input
//           placeholder="Search products..."
//           value={search}
//           onChange={e => onSearch(e.target.value)}
//           className="w-full md:w-1/4"
//         />
//         <Select
//           value={sortBy}
//           onChange={onSortChange}
//           className="w-full md:w-1/4"
//           placeholder="Sort by"
//         >
//           <Option value="priceAsc">Price: Low to High</Option>
//           <Option value="priceDesc">Price: High to Low</Option>
//           <Option value="ratingDesc">Rating: High to Low</Option>
//           <Option value="ratingAsc">Rating: Low to High</Option>
//           <Option value="reviewsDesc">Reviews: Most</Option>
//           <Option value="createdDesc">Newest</Option>
//           <Option value="createdAsc">Oldest</Option>
//         </Select>
//         <Checkbox
//           checked={favoriteOnly}
//           onChange={e => onFavoriteChange(e.target.checked)}
//         >
//           Favorites Only
//         </Checkbox>
//       </Space>

//       {/* Filter Row */}
//       <Space wrap className="w-full justify-between">
//         <Select
//           value={priceFilter}
//           onChange={onPriceChange}
//           className="w-full md:w-1/5"
//           placeholder="Filter by price"
//         >
//           <Option value="all">All Prices</Option>
//           <Option value="<500K">Below 500K</Option>
//           <Option value="500K-1M">500K - 1M</Option>
//           <Option value=">1M">Above 1M</Option>
//         </Select>

//         <Checkbox.Group
//           value={typeFilter}
//           onChange={vals => onTypeChange(vals as string[])}
//           className="flex gap-4"
//         >
//           <Checkbox value="course">Courses</Checkbox>
//           <Checkbox value="book">Books</Checkbox>
//         </Checkbox.Group>

//         <Select
//           value={categoryFilter}
//           onChange={onCategoryChange}
//           className="w-full md:w-1/5"
//           placeholder="Category"
//         >
//           <Option value="all">All Categories</Option>
//           {categoryOptions.map(cat => (
//             <Option key={cat} value={cat}>{cat}</Option>
//           ))}
//         </Select>

//         <Select
//           mode="multiple"
//           value={tagFilter}
//           onChange={onTagChange}
//           className="w-full md:w-1/5"
//           placeholder="Tags"
//         >
//           {tagOptions.map(tag => (
//             <Option key={tag} value={tag}>{tag}</Option>
//           ))}
//         </Select>

//         <div className="w-full md:w-1/5">
//           <span className="block mb-1">Min Rating</span>
//           <Rate
//             allowClear={false}
//             value={ratingFilter}
//             onChange={onRatingChange}
//           />
//         </div>

//         <div className="w-full md:w-1/5">
//           <span className="block mb-1">Min Reviews</span>
//           <Slider
//             min={0}
//             max={1000}
//             step={10}
//             value={reviewsFilter}
//             onChange={onReviewsChange}
//           />
//         </div>
//       </Space>
//     </Space>
//   );
// }


// import { Input, Select, Button, Space } from 'antd';
// import classNames from 'classnames';

// const { Option } = Select;

// interface FilterProps {
//   search: string;
//   onSearch: (val: string) => void;

//   sortBy: string;
//   onSortChange: (val: string) => void;

//   categoryOptions: string[];
//   categoryFilter: string;
//   onCategoryChange: (val: string) => void;

//   tagOptions: string[];
//   tagFilter: string[];
//   onTagChange: (vals: string[]) => void;
// };

// export default function SearchFilter({
//   search,
//   onSearch,
//   sortBy,
//   onSortChange,
//   categoryOptions,
//   categoryFilter,
//   onCategoryChange,
//   tagOptions,
//   tagFilter,
//   onTagChange,
// }: FilterProps) {
//   return (
//     <div className="space-y-4">
//       {/* Row: Search, Sort, Tags */}
//       <Space wrap className="w-full justify-between">
//         <Input
//           placeholder="Search by title..."
//           value={search}
//           onChange={e => onSearch(e.target.value)}
//           className="flex-1 min-w-[200px]"
//         />
//         <Select
//           value={sortBy}
//           onChange={onSortChange}
//           className="min-w-[200px]"
//         >
//           <Option value="createdDesc">Newest</Option>
//           <Option value="createdAsc">Oldest</Option>
//           <Option value="startDesc">Start Date ↓</Option>
//           <Option value="startAsc">Start Date ↑</Option>
//           <Option value="alphaAsc">A - Z</Option>
//           <Option value="alphaDesc">Z - A</Option>
//         </Select>
//         <Select
//           mode="multiple"
//           placeholder="Filter tags"
//           value={tagFilter}
//           onChange={onTagChange}
//           className="flex-1 min-w-[200px]"
//         >
//           {tagOptions.map(tag => (
//             <Option key={tag} value={tag}>{tag}</Option>
//           ))}
//         </Select>
//       </Space>

//       {/* Row: Category buttons */}
//       <Space size="middle" wrap>
//         {['all', ...categoryOptions].map(cat => (
//           <Button
//             key={cat}
//             type={categoryFilter === cat ? 'primary' : 'default'}
//             onClick={() => onCategoryChange(cat)}
//             className={classNames('capitalize', { 'bg-green-600 text-white': categoryFilter === cat })}
//           >
//             {cat === 'all' ? 'All' : cat}
//           </Button>
//         ))}
//       </Space>
//     </div>
//   );
// }


import { Input, Select, Button, Space } from 'antd';
import classNames from 'classnames';

const { Option } = Select;

interface FilterProps {
  search: string;
  onSearch: (val: string) => void;

  sortBy: string;
  onSortChange: (val: string) => void;

  priceFilter: string;
  onPriceChange: (val: string) => void;

  categoryOptions: string[];
  categoryFilter: string;
  onCategoryChange: (val: string) => void;

  tagOptions: string[];
  tagFilter: string[];
  onTagChange: (vals: string[]) => void;
};

export default function SearchFilter({
  search,
  onSearch,
  sortBy,
  onSortChange,
  priceFilter,
  onPriceChange,
  categoryOptions,
  categoryFilter,
  onCategoryChange,
  tagOptions,
  tagFilter,
  onTagChange,
}: FilterProps) {
  return (
    <div className="space-y-4">
      {/* Row: Search, Sort, Price, Tags */}
      <Space wrap className="w-full justify-between">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="flex-1 min-w-[150px]"
        />

        <Select
          value={sortBy}
          onChange={onSortChange}
          className="min-w-[150px]"
        >
          <Option value="createdDesc">Newest</Option>
          <Option value="createdAsc">Oldest</Option>
          <Option value="startDesc">Start Date ↓</Option>
          <Option value="startAsc">Start Date ↑</Option>
          <Option value="alphaAsc">A - Z</Option>
          <Option value="alphaDesc">Z - A</Option>
        </Select>

        {/* NEW: Price Filter */}
        <Select
          value={priceFilter}
          onChange={onPriceChange}
          className="min-w-[150px]"
        >
          <Option value="all">All Prices</Option>
          <Option value="<500K">Below 500K</Option>
          <Option value="500K-1M">500K - 1M</Option>
          <Option value=">1M">Above 1M</Option>
        </Select>

        <Select
          mode="multiple"
          placeholder="Filter tags"
          value={tagFilter}
          onChange={onTagChange}
          className="flex-1 min-w-[150px]"
        >
          {tagOptions.map(tag => (
            <Option key={tag} value={tag}>{tag}</Option>
          ))}
        </Select>
      </Space>

      {/* Row: Category buttons */}
      <Space size="middle" wrap>
        {['all', ...categoryOptions].map(cat => (
          <Button
            key={cat}
            type={categoryFilter === cat ? 'primary' : 'default'}
            onClick={() => onCategoryChange(cat)}
            className={classNames('capitalize', {
              'bg-green-600 text-white': categoryFilter === cat
            })}
          >
            {cat === 'all' ? 'All' : cat}
          </Button>
        ))}
      </Space>
    </div>
  );
}
