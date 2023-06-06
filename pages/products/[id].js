import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ProduktId() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(
    id ? `/api/products/${id}` : null,
    fetcher
  );

  if (isLoading) {
    return <h1>Loading... Glub... Glub... </h1>;
  }

  console.log(data);

  if (!data) {
    return;
  }
  return (
    <StyledList>
      <StyledListItem key={data.id}>
        <h2>Product number: {data.id}</h2>
        <h3>{data.name}</h3>
        <h4>{data.category}</h4>
        <p>{data.description}</p>
        <p>
          {data.price} {data.currency}
        </p>
      </StyledListItem>
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
