import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "./BrandsPage.css";

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      origin
      categories
      image
    }
  }
`;

export default function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Something went wrong while loading brands.</p>;

  const brands = data?.findAllBrands || [];

  return (
    <div className="brandsPage">
      <h1>Guitar Brands</h1>

      <div className="brandsGrid">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="brandCard"
            onClick={() => navigate(`/models/${brand.id}`)}
          >
            <img src={brand.image} alt={brand.name} />
            <h3>{brand.name}</h3>
            <p>Origin: {brand.origin}</p>
            <p>Categories: {brand.categories.join(", ")}</p>
          </div>
        ))}
      </div>
      <footer className="footer">
  <div className="footerSection">
    <a href="#">Store</a>
    <a href="#">Collections</a>
    <a href="#">Support</a>
  </div>
  <div className="footerSection">
    <a href="#">Terms</a>
    <a href="#">Privacy Policy</a>
    <a href="#">Copyright</a>
  </div>
  <div className="socialIcons">
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
</footer>
    </div>
  );
}
