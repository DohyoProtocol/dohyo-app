import { Center, Container, Image } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Container width={"100%"}>
      <Center>
        <Image
          mt={52}
          boxSize={64}
          src="https://i.seadn.io/gcs/files/bb4cc8a1aca26bc552307e83d2d94e77.png?auto=format&w=1000"
          alt="gm"
        />
      </Center>
    </Container>
  );
};
