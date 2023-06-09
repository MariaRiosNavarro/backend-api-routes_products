import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";

//fetcher muss hier sein
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ProductsList() {
  // fetcher muss auch in der const sein
  const { data, isLoading } = useSWR("/api/products", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(data);
  if (!data) {
    return;
  }

  return (
    <StyledList>
      {/* Richtig mapen!!! */}
      {data.map((product) => {
        return (
          <StyledListItem key={product.id}>
            <h3>{product.name}</h3>
            <h4>{product.category}</h4>
            <p>{product.description}</p>
            <p>
              {product.price} {product.currency}
            </p>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const StyledListItem = styled.li`
  list-style: none;
  text-decoration: none;
  border: 2px solid blue;
  border-radius: 10px;
  width: 300px;
  padding: 1rem;
  background-color: aliceblue;
  margin-top: 1rem;
`;
