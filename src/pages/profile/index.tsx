import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Modal } from "../../components/Modal/Modal";
import { PostSection } from "../../components/PostSection/PostSection";
import { UserInfo } from "../../components/UserInfo/UserInfo";
import { UserDataForm } from "../../components/forms/UserDataForm/UserDataForm";
import styles from "../../styles/Page.module.scss";
import { trpc } from "../../utils/trpc";

const PersonalPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const updateProfileMutation = trpc.profile.updateProfileData.useMutation({
    onError: (error) => toast.error(`Something went wrong: ${error.message}`),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  const { data, refetch } = trpc.profile.getProfileById.useQuery(
    {
      id: session?.user?.id ?? "",
      page: 0,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!session || !data) {
    return <></>;
  }

  return (
    <>
      <div className={styles.centeredContainer}>
        <UserInfo {...data} />
        <Modal
          onClose={() => {
            setModalOpen(false);
          }}
          isOpen={modalOpen}
        >
          <UserDataForm
            onSubmit={({ displayName }) => {
              setModalOpen(false);
              updateProfileMutation.mutate({ displayName });
            }}
          />
        </Modal>
        <button
          className={styles.primaryButton}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Edit your data
        </button>
        <PostSection title="Your posts" posts={data.posts} />
      </div>
    </>
  );
};

export default PersonalPage;
