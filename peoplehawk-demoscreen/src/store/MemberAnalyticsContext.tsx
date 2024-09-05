import React, { createContext, ReactNode, useState, useContext} from 'react';

type MemberAnalyticsProviderProps = {
  children: ReactNode;
};

interface MemberAnalytics {   
  page: number;
  isInfographicResume: boolean;
  isMemberResume: boolean; 
  isPeopleHawkResume: boolean; 
  isAll: boolean;
  sortOrder: string;
  orderedBy: number; 
  isProfilePhoto: boolean; 
  searchTerm?: string; 
  countryId?: number;
  memberType?: string;
  sortBy : string;
  isOn : boolean;
}

const defaultState: MemberAnalytics = {
  page: 1,
  isInfographicResume: false,
  isMemberResume: false,
  isPeopleHawkResume: false,
  isAll: false,
  sortOrder: 'asc',
  orderedBy: 1,
  isProfilePhoto: false,
  sortBy : 'Last Updated',
  isOn : false
};

const MemberAnalyticsContext = createContext<{
  state: MemberAnalytics;

} | undefined>(undefined);

export const MemberAnalyticsProvider: React.FC<MemberAnalyticsProviderProps> = ({ children }) => {
  const [state] = useState<MemberAnalytics>(defaultState);

  return (
    <MemberAnalyticsContext.Provider value={{ state }}>
      {children}
    </MemberAnalyticsContext.Provider>
  );
};

export const useMemberAnalytics = () => {
  const context = useContext(MemberAnalyticsContext);
  if (!context) {
    throw new Error('useMemberAnalytics must be used within a MemberAnalyticsProvider');
  }
  return context;
};
