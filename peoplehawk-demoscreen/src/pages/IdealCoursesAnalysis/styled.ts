import {styled} from 'styled-components'

export const Heading = styled.div`
   font-family: obviously;
    font-size: 28px;
    display: flex;
    justify-content: start;
    color: #F96332;
`

export const MainContent = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    @media (max-width : 1409px) 
    {
    display: block;
    margin-top: 15px;
    }
`