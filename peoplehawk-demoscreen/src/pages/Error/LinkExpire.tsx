import styled from "styled-components";

const Container = styled.div({
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ContainerBody = styled.div({
  display: "flex",
  alignItems: "center",
});

const Title = styled.div({
  color: "#394456",
  fontSize: "24px",
  fontWeight: 900,
});

const LinkExpire = () => {
  return (
    <Container>
      <ContainerBody>
        <Title>Link is not Valid any more</Title>
      </ContainerBody>
    </Container>
  );
};
export default LinkExpire;
