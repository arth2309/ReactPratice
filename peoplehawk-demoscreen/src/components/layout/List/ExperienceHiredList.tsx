import {styled} from 'styled-components'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { Assignment,WorkExperience } from '../../../interface/Interface';
import moment from 'moment';

interface ExperienceHiredProps {
    openAssignment : () => void,
    openWorkExperience : () => void,
    assignmentList : Assignment[] | null,
    workExperienceList : WorkExperience[] | null,
    handleAssignmentDelete : (index : number,id : number) => void
    handleWorkExperienceDelete : (index : number,id : number) => void
    OpenAssignmentEditModal : (index : number) => void
    OpenWorkExperienceEditModal : (index : number) => void
}

const EducationCard = styled.div({
    backgroundColor : 'white',
    padding : '20px',
    borderRadius : '8px'
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
});

const ButtonDiv = styled.div({
    display : 'flex',
    gap : '10px'
})

const IconDiv = styled.div({
  cursor : 'pointer'
})

const PrimaryButton = styled.button({
    cursor: "pointer",
    backgroundColor: "#F96332",
   
    fontSize : '16px',
    fontWeight : '600',
    display: "flex",
    justifyContent: "center",
    borderRadius: "20px",
    marginTop: "10px",
  });

export const ExperiencedHiredList : React.FC<ExperienceHiredProps> = ({openAssignment,openWorkExperience,workExperienceList,assignmentList,handleAssignmentDelete,handleWorkExperienceDelete,OpenAssignmentEditModal,OpenWorkExperienceEditModal}) => {

    return(
    <EducationCard>
                <EducationCardHead>
                  <EducationCardHeadLeft>
                    <EducationTitle>
                      Experience
                    </EducationTitle>
                    <div>
                      List the Assignments and Experience 
                    </div>
                  </EducationCardHeadLeft>
                  <ButtonDiv>
                  <PrimaryButton onClick={openAssignment}>
                    Add Assignment
                  </PrimaryButton>
                  <PrimaryButton onClick={openWorkExperience}>
                    Add Work Experience
                  </PrimaryButton>
                  </ButtonDiv>
                </EducationCardHead>
                <h3>
                  Assignment
                </h3>
    
                {assignmentList && assignmentList.map((data, index) => (
          <EducationMainCard key={index}>
             <EducationMainSubCard>
             <div>Company</div>
              <div>{data.title}</div>
              <div>{data.organisation}</div>
             </EducationMainSubCard>
             <EducationMainSubCard>
             <div>IT</div>
             <div>{moment(data.startDate).format('ll')} - {data.isOngoing ? 'present' : moment(data.endDate).format('ll') }</div>
            </EducationMainSubCard>
            <EducationMainSubCard>
              <IconCard>
                <div onClick={() => handleAssignmentDelete(index,data.id)}><DeleteIcon /></div>
                <div onClick={() => OpenAssignmentEditModal(index)}><EditIcon /> </div>
              </IconCard>
            </EducationMainSubCard>
          </EducationMainCard>
                

        ))}
         <h3>
                  Work Experience
                </h3>
        {workExperienceList && workExperienceList.map((data, index) => (
          <EducationMainCard key={index}>
             <EducationMainSubCard>
              <div>Company</div>
              <div>{data.role}</div>
              <div>{data.organisation}</div>
             </EducationMainSubCard>
             <EducationMainSubCard>
            <div>IT</div>
            <div>{moment(data.startDate).format('ll') + '-' + moment(data.endDate).format('ll')}</div>
           
            </EducationMainSubCard>
            <EducationMainSubCard>
              <IconCard>
                <IconDiv onClick={() => handleWorkExperienceDelete(index,data.id)}><DeleteIcon /></IconDiv>
                <IconDiv onClick={() => OpenWorkExperienceEditModal(index)}><EditIcon /> </IconDiv>
              </IconCard>
            </EducationMainSubCard>
          </EducationMainCard>
                

        ))}
               </EducationCard>
    )
}