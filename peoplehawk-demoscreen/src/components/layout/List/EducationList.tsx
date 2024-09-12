import {styled} from 'styled-components'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { EducationDetail } from '../../../interface/Interface';

interface EducationListProps {
    openProfile : () => void,
    dataList : EducationDetail[] | null,
    HandleDelete : (index : number,id : number) => void
    OpenEditModal : (index : number) => void
}

const EducationCard = styled.div({
    backgroundColor : 'white',
    padding : '20px',
    borderRadius : '8px'
});

const IconDiv = styled.div({
  cursor : 'pointer'
});

const EducationCardHead = styled.div({
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
    marginBottom : '25px'
});

const EducationCardHeadLeft = styled.div({
     display : 'flex',
     flexDirection : 'column',
     gap : '5px'
});

const EducationTitle = styled.div({
    fontSize : '24px',
    color : '#F96332'
});

const EducationMainCard = styled.div({
   display : 'flex',
   justifyContent : 'space-between',
   borderBottom : '1px solid black'
});

const EducationMainSubCard = styled.div({
   display : 'flex',
   flexDirection : 'column',
   gap : '5px',
   alignItems : 'start',
   margin : '5px 0px 10px 0px'
});

const IconCard = styled.div({
  display : 'flex',
  gap : '10px',
  justifyContent : 'center'
})

const PrimaryButton = styled.button({
    cursor: "pointer",
    backgroundColor: "#F96332",
    width: "300px",
    fontSize : '16px',
    fontWeight : '600',
    display: "flex",
    justifyContent: "center",
    borderRadius: "20px",
    marginTop: "10px",
  });

export const EducationList : React.FC<EducationListProps> = ({openProfile,dataList,HandleDelete,OpenEditModal}) => {

    return(
    <EducationCard>
                <EducationCardHead>
                  <EducationCardHeadLeft>
                    <EducationTitle>
                      Education
                    </EducationTitle>
                    <div>
                      List the education and achievements you have attained to help demonstrate your successes in life and your career
                    </div>
                  </EducationCardHeadLeft>
                  <PrimaryButton onClick={openProfile}>
                    Add Education
                  </PrimaryButton>
                </EducationCardHead>
                {dataList && dataList.map((data, index) => (
          <EducationMainCard key={index}>
             <EducationMainSubCard>
              <div>Foundation Degree</div>
              <div>{data.subject}</div>
             </EducationMainSubCard>
             <EducationMainSubCard>
            <div>IT</div>
            <div>{data.subject}</div>
            <div>{data.grade}</div>
            </EducationMainSubCard>
            <EducationMainSubCard>
              <IconCard>
                <IconDiv onClick={() => HandleDelete(index,data.id)}><DeleteIcon /></IconDiv>
                <IconDiv onClick={() => OpenEditModal(index)}><EditIcon /> </IconDiv>
              </IconCard>
            </EducationMainSubCard>
          </EducationMainCard>
                

        ))}
               </EducationCard>
    )
}