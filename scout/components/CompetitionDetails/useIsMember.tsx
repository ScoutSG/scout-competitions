import { useSession } from "next-auth/react";
import useSWR from "swr";

function useIsMember(competitionId: number) {
  const fetcher = (arg: any, ...args: any[]) =>
    fetch(arg, ...args).then((res) => res.json());
  const { data: session } = useSession();
  if (session) {
    const { data, error } = useSWR(
      `/api/groups/competition/${competitionId}/user/${session.user.id}`,
      fetcher
    );
    return {
      isMember: data && data.length > 0,
      isLoading: !error && !data,
      isError: error,
    };
  } else {
    return {
      isMember: false
    }
  }
}

export default useIsMember;
