import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import "./ModelsPage.css";

const GET_MODELS_AND_BRANDS = gql`
  query GetModelsAndBrands($id: ID!, $sortBy: sortBy!) {
    findAllBrands {
      id
      name
      origin
    }
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;

export default function ModelsPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", order: "ASC" });
  const [visibleCount, setVisibleCount] = useState(6);

  const { loading, error, data } = useQuery(GET_MODELS_AND_BRANDS, {
    variables: { id: brandId, sortBy },
    skip: !brandId
  });

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
        setVisibleCount(prev => prev + 6);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p>Error loading models: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  const brand = data.findAllBrands.find(b => b.id === brandId);

  let models = data.findBrandModels;
  if (searchTerm) {
    models = models.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (filterType) {
    models = models.filter(m => m.type === filterType);
  }

  const types = [...new Set(data.findBrandModels.map(m => m.type))];
  const visibleModels = models.slice(0, visibleCount);

  return (
    <div className="container">
      {brand && (
        <div className="brandHeader">
    <button
      onClick={() => navigate("/")}
      style={{
        background: "none",
        border: "none",
        color: "#ff6f00",
        cursor: "pointer",
        padding: 0,
        fontSize: "14px",
        marginBottom: "8px",
        textDecoration: "underline"
      }}
    >
     Back to Brands
    </button>
    <h1 className="brandName">{brand.name}</h1>
    {brand.origin && <p className="brandOrigin">Origin: {brand.origin}</p>}
  </div>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search models"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setVisibleCount(6);
          }}
        />
        <select
          value={filterType}
          onChange={e => {
            setFilterType(e.target.value);
            setVisibleCount(6);
          }}
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={`${sortBy.field}_${sortBy.order}`}
          onChange={e => {
            const [field, order] = e.target.value.split("_");
            setSortBy({ field, order });
          }}
        >
          <option value="name_ASC">Name Asc</option>
          <option value="name_DESC">Name Desc</option>
          <option value="type_ASC">Type Asc</option>
          <option value="type_DESC">Type Desc</option>
          <option value="price_ASC">Price Asc</option>
          <option value="price_DESC">Price Desc</option>
        </select>
      </div>

      <div className="modelsGrid">
        {visibleModels.length === 0 ? (
          <p>No models match your search/filter.</p>
        ) : (
          visibleModels.map(model => (
            <div
              key={model.id}
              className="modelCard"
              onClick={() => navigate(`/models/${brandId}/guitar/${model.id}`)}
            >
              <img src={model.image} alt={model.name} className="modelImage" />
              <h3>{model.name}</h3>
              <p>Type: {model.type}</p>
              <p>Price: ${model.price}</p>
            </div>
          ))
        )}
      </div>

      {visibleCount < models.length && (
        <p className="loadHint">Scroll down to load more...</p>
      )}
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
