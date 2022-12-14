import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";

import { Location } from "../../components/Location/Location";
import { Modal } from "../../components/Modal/Modal";
import { PostSection } from "../../components/PostSection/PostSection";
import { SearchBanner } from "../../components/SearchBanner/SearchBanner";
import { PostForm } from "../../components/forms/PostForm/PostForm";
import styles from "../../styles/Page.module.scss";
import { trpc } from "../../utils/trpc";

interface CategoryListingProps {
  categoryId: string;
}

const CategoryListing: NextPage<CategoryListingProps> = ({
  categoryId,
}: CategoryListingProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, refetch } = trpc.post.getAllForCategoryId.useQuery({
    categoryId: categoryId,
  });

  const addPostMutation = trpc.post.addPost.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => toast.error(`Something went wrong: ${error.message}`),
  });

  const { data: session } = useSession();

  const handlePostSubmit = (values: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    addPostMutation.mutate({
      content: values.content,
      title: values.title,
      tags: values.tags,
      categoryId: categoryId,
    });
    setModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal onClose={() => setModalOpen(false)} isOpen={modalOpen}>
        <PostForm onSubmit={handlePostSubmit} />
      </Modal>
      <SearchBanner />
      <Location paths={[{ label: data?.name ?? "", url: `/${categoryId}` }]} />
      <div className={styles.maxWidthContainer}>
        {session && (
          <button
            className={styles.transparentButton}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            + Add new post
          </button>
        )}
        <PostSection title={data?.name} posts={data?.posts ?? []} />
      </div>
    </>
  );
};

export default CategoryListing;

export const getServerSideProps: GetServerSideProps<
  CategoryListingProps
> = async (context) => {
  return {
    props: {
      categoryId: `${context.query.categoryId}`,
    },
  };
};
