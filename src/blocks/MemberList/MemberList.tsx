import {
  MemberModelOrderBy,
  MemberListQuery,
  MemberListQueryVariables,
  MemberModelFilter,
} from "@lib/types/datocms";
import query from "./MemberList.query.graphql";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { withQueryClientProvider } from "@lib/react-query";
import { useSearchParams } from "@lib/hooks/use-search-params";
import { useUrl } from "@lib/hooks/use-url";
import debounce from "debounce";

import { datocmsRequest } from "@lib/datocms";

import { MemberCard } from "@blocks/MemberCard";
import { Column, Grid } from "@components/Grid";
import { MembersFilter } from "@components/MembersFilter";
import { Pagination } from "@components/Pagination";

import "./MemberList.css";
import type { Filter } from "@components/MembersFilter/MembersFilter";

const DEFAULT_PAGE_SIZE = 6;

export const loader = async (searchParams: Record<string, string>) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;
  const orderBy = searchParams.sorteren || undefined;

  const filter: MemberModelFilter = {};
  if (searchParams.zoek) {
    Object.assign(filter, {
      name: { matches: { pattern: searchParams.zoek } },
    });
  }
  if (searchParams.expertise) {
    Object.assign(filter, { expertises: { anyIn: searchParams.expertise } });
  }
  if (searchParams.omvang) {
    Object.assign(filter, { employees: { eq: searchParams.omvang } });
  }

  const { expertises, membersMeta, members } = await datocmsRequest<
    MemberListQuery,
    MemberListQueryVariables
  >({
    query: query,
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip,
      orderBy: orderBy as MemberModelOrderBy,
      filter,
    },
  });

  return {
    expertises,
    membersMeta,
    members,
  };
};

interface Props {
  initialData: Awaited<ReturnType<typeof loader>>;
  initialParams: Record<string, string>;
  initialUrl: string;
}

export const MemberList = withQueryClientProvider(
  ({ initialData, initialParams, initialUrl }: Props) => {
    const dataListRef = useRef<HTMLUListElement>(null);
    const [searchParams, updateSearchParams] = useSearchParams(initialParams);
    const url = useUrl(initialUrl);

    const { data } = useQuery({
      queryKey: ["members", searchParams],
      queryFn: () => loader(searchParams),
      initialData,
    });

    const updateFilter = debounce((filter) => {
      updateSearchParams({ ...filter, page: undefined });
    }, 300);

    const updatePage = (page: number) => {
      updateSearchParams({ ...searchParams, page: page.toString() });

      if (dataListRef.current) {
        dataListRef.current.scrollIntoView({
          behavior: "instant",
        });
      }
    };

    return (
      <>
        <MembersFilter
          filter={searchParams as Filter}
          options={{ expertise: data.expertises }}
          onChange={updateFilter}
        />
        <Grid ref={dataListRef} as="ul" border={true} className="member-list">
          {data.members.map((member) => (
            <Column
              key={member.id}
              as="li"
              span={{ mobile: 12, tablet: 6, desktop: 4 }}
            >
              <MemberCard member={member} />
            </Column>
          ))}
        </Grid>
        <Pagination
          url={url}
          currentPage={Number(searchParams.page)}
          totalPages={Math.ceil(data.membersMeta.count / DEFAULT_PAGE_SIZE)}
          onPageChange={updatePage}
        />
      </>
    );
  },
);
