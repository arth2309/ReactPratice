import { styled ,css} from "styled-components";

export const Container = styled.div({
    display: 'flex',
});

export const LeftContainer = styled.div`
     display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 30%;
    height: 100vh;

    @media (max-width :1298px)
    {
        width : 40%;
    }

    @media (max-width : 992px)
    {
       width : 100%;
    }
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 80%;
`

export const FormControl = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background-color: #F9F9F9;
`

export const FormSelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background-color: #F9F9F9;
`

