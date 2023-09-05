import React from "react";
import { styled } from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addToCart, removeFromCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";

function CartItemComponent(props) {
  const dispatch = useDispatch();
  const { thumbnail, title, price, quantity } = props.item;
  return (
    <CompContainer>
      <Image src={thumbnail} />
      <Info>
        <Name>{title}</Name>
        <Price>₹ {price}</Price>
      </Info>
      <Third>
        <QuantityContainer>
          <AlterQuantity onClick={() => dispatch(addToCart(props.item))}>
            <FaPlus />
          </AlterQuantity>
          <Quantity>{quantity}</Quantity>
          <AlterQuantity onClick={() => dispatch(removeFromCart(props.item))}>
            <FaMinus />
          </AlterQuantity>
        </QuantityContainer>
        <TotalPrice>Total: ₹ {quantity * price}</TotalPrice>
      </Third>
    </CompContainer>
  );
}

const Third = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  gap: 1rem;
`;
const CompContainer = styled.div`
  width: 98%;
  height: 22%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  border: 1px solid transparent;
  &:hover {
    background-color: #f2f0f0;
    border: 1px solid #000;
  }
`;
const Image = styled.img`
  height: 90%;
  border-radius: 5px;
  aspect-ratio: 1;
`;
const Info = styled.div`
  display: flex;
  width: 65%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: black;
  font-family: "Fjalla One", sans-serif;
`;
const Price = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
`;
const QuantityContainer = styled.div`
  width: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AlterQuantity = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222222;
  cursor: pointer;
  &:active {
    background-color: #333333;
    transform: scale(0.99);
  }
`;
const Quantity = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;
const TotalPrice = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`;
export default CartItemComponent;
