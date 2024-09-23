"use client";

import kyInstance from "@/lib/ky";
import { STATUS_CODE_NOT_FOUND } from "@/lib/response";
import { UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";

interface useQueryGetUserDataProps {
  username: string;
}

const useQueryGetUserData = ({ username }: useQueryGetUserDataProps) => {
  return useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
    retry(failureCount, error) {
      if (
        error instanceof HTTPError &&
        error.response.status === STATUS_CODE_NOT_FOUND
      ) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: Infinity,
  });
};

export default useQueryGetUserData;
