import Link from "next/link";
import { useSWR } from "swr";

export default function ProductsList() {
  const { data, isLoading } = useSWR("/api/products");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ul>
      {data.map((product) => {
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.product}</Link>
        </li>;
      })}
    </ul>
  );
}
