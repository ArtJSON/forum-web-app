import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { PostSection } from "../../components/PostSection/PostSection";
import { UserInfo } from "../../components/UserInfo/UserInfo";
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
        <button>Edit your data</button>
        <PostSection title="Your posts" posts={data.posts} />
      </div>
    </>
  );
};

export default PersonalPage;
