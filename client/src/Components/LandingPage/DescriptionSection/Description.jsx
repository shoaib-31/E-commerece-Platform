import React from "react";
import styled from "styled-components";

function Description() {
  return (
    <Container>
      <Head>Welcome to AtoZ: Your Ultimate Shopping Destination!</Head>
      <Info>
        Are you ready to embark on a shopping journey like no other? At AtoZ,
        we've crafted an online paradise where your every shopping desire comes
        to life. Step into a world of endless choices, impeccable quality, and
        personalized experiences that redefine the way you shop.
      </Info>
      <Head>Discover a World of Possibilities:</Head>
      <Info>
        Prepare to be amazed as you explore our vast collection of products
        spanning across various categories. From cutting-edge electronics that
        embrace innovation, to exquisite jewelry that adds a touch of elegance,
        and from the latest fashion trends to timeless classics, we have
        something for everyone. Our diverse range of categories ensures that
        you'll find exactly what you're looking for, and perhaps even stumble
        upon delightful surprises along the way.
      </Info>
      <Head>Quality That Sets Us Apart:</Head>
      <Info>
        We understand that when it comes to online shopping, quality matters.
        That's why we've handpicked each product in our collection to ensure
        that it meets the highest standards. Rest assured that every item you
        purchase from us is a testament to our commitment to excellence,
        durability, and value for your hard-earned money.
      </Info>
      <Head>Experience Convenience, Delight, and Unforgettable Shopping:</Head>
      <Info>
        Are you ready to transform the way you shop? Atoz invites you to
        explore, indulge, and immerse yourself in a world of convenience,
        delight, and unforgettable shopping experiences. Start your journey with
        us today and redefine the way you embrace the world of online shopping.
      </Info>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  height: fit-content;
  background-color: #ececec;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
`;
const Info = styled.div`
  width: 98%;
  font-size: 0.8rem;
  color: #676767;
  margin-bottom: 1rem;
`;
const Head = styled.div`
  width: 98%;
  font-size: 1rem;
  margin: 5px 0;
  font-weight: 600;
  color: #676760;
  margin-top: 1rem;
`;
export default Description;
