import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../server/trpc/router";

export interface PostListingType {
  id: string;
  title: string;
  tags?: string[];
  lastResponse: string;
  likes: number;
  responses: number;
  views: number;
}

export type CategoriesListingResponseType = inferProcedureOutput<
  AppRouter["category"]["getAll"]
>;

export type CategoryDisplayResponseType = inferProcedureOutput<
  AppRouter["category"]["getCategoryById"]
>;

export type PostListingResponseType = inferProcedureOutput<
  AppRouter["post"]["getAllForCategoryId"]
>;

export type PostSectionType = PostListingResponseType["posts"];
