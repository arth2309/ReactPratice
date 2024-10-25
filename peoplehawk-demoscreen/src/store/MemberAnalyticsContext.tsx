import React, { createContext, ReactNode, useState, useContext } from "react";
import { MemberAnalyticsFilter } from "../interface/Interface";

type MemberAnalyticsProviderProps = {
  children: ReactNode;
};

const defaultState: MemberAnalyticsFilter = {
  page: 1,
  isResume: false,
  isPersonalityTest: false,
  sortOrder: "asc",
  orderedBy: 1,
  isProfilePhoto: false,
  sortBy: "Last Updated",
  isOn: false,
  searchTerm: "",
  countryId: 0,
  memberType: "",
  clientId: 0,
};

const MemberAnalyticsContext = createContext<
  | {
      state: MemberAnalyticsFilter;
    }
  | undefined
>(undefined);

export const MemberAnalyticsProvider: React.FC<
  MemberAnalyticsProviderProps
> = ({ children }) => {
  const [state] = useState<MemberAnalyticsFilter>(defaultState);

  return (
    <MemberAnalyticsContext.Provider value={{ state }}>
      {children}
    </MemberAnalyticsContext.Provider>
  );
};

export const useMemberAnalytics = () => {
  const context = useContext(MemberAnalyticsContext);
  if (!context) {
    throw new Error(
      "useMemberAnalytics must be used within a MemberAnalyticsProvider"
    );
  }
  return context;
};
