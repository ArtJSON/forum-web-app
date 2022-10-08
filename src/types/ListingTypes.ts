export interface CategoryListingType {
  imgUrl?: string;
  categoryId: string;
  categoryName: string;
  categoryDescription?: string;
  posts: number;
  lastPost: string;
}

export interface PostListingType {
  userImgUrl?: string;
  id: string;
  title: string;
  tags?: string[];
  lastResponse: string;
  likes: number;
  responses: number;
  views: number;
}
