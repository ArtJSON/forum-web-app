import { Post } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";

import { AppRouter } from "../server/trpc/router";

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

export type PostType = Post & { displayName?: string };

export type PostCommentsType = inferProcedureOutput<
  AppRouter["post"]["getPostById"]
>["comments"];

export type UserDataType = inferProcedureOutput<
  AppRouter["profile"]["getProfileById"]
>;
