import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Modal } from "../../components/Modal/Modal";
import { PostSection } from "../../components/PostSection/PostSection";
import { UserInfo } from "../../components/UserInfo/UserInfo";
import { UserDataForm } from "../../components/forms/UserDataForm/UserDataForm";
import styles from "../../styles/Page.module.scss";
import { trpc } from "../../utils/trpc";

const PersonalPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  const { data } = trpc.profile.getProfileById.useQuery(
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
      <div className={styles.maxWidthContainer}>
        <UserInfo {...data} />
        <Modal onClose={() => {}} isOpen={true}>
          <UserDataForm />
        </Modal>
        <button>Edit your data</button>
        <PostSection title="Your posts" posts={data.posts} />
      </div>
    </>
  );
};

export default PersonalPage;
