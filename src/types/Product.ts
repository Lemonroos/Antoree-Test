export type Product = {
    id: string;
    type: string;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    // tags: [];
    tags: string[]; 
    rating: number;
    reviewsCount: number;
    isFavorite: boolean;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
  };
  
