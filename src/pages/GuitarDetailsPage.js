import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "./GuitarDetailsPage.css";

const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function GuitarDetailsPage() {
  const { brandId, modelId } = useParams();
  const [activeTab, setActiveTab] = useState("specs");
  const [musicianPage, setMusicianPage] = useState(0);

  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId
  });

  if (loading) return <p>Loading guitar details...</p>;
  if (error) return <p>Error loading guitar: {error.message}</p>;
  if (!data?.findUniqueModel) return <p>Guitar not found.</p>;

  const guitar = data.findUniqueModel;
  const specsList = Object.entries(guitar.specs).filter(
  ([key, val]) => key !== "__typename" && val && val.trim() !== ""
);

  const musiciansPerPage = 2;
  const totalPages = Math.ceil(guitar.musicians.length / musiciansPerPage);
  const start = musicianPage * musiciansPerPage;
  const musiciansToShow = guitar.musicians.slice(start, start + musiciansPerPage);

  const PaginationDots = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="musicianPagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setMusicianPage(i)}
            className={i === musicianPage ? "active" : ""}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <Link to={`/models/${brandId}`} className="backLink">
         Back To List
        </Link>
        <img src="/examplelogo(non existent).svg" alt="VibeStrings Logo" className="logo" />
      </div>

      <div className="titlePart">
        <h1 className="title">
          {guitar.name} <sup className="trademark">®</sup>
        </h1>
        <div className="imageWrapper">
          <img src={guitar.image} alt={guitar.name} />
        </div>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "specs" ? "active" : ""}`}
          onClick={() => setActiveTab("specs")}
        >
          Specification
        </div>
        <div
          className={`tab ${activeTab === "musicians" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("musicians");
            setMusicianPage(0);
          }}
        >
          Who plays it?
        </div>
      </div>

      <div className="content">
        {activeTab === "specs" && (
          <>
            {guitar.description && <p>{guitar.description}</p>}
            {specsList.length > 0 && (
              <ul className="specList">
                {specsList.map(([key, val]) => (
                  <li key={key}>
                    <strong>
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                    </strong>{" "}
                    {val}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeTab === "musicians" && (
          <>
            {guitar.musicians.length === 0 ? (
              <p>No musicians available.</p>
            ) : (
              <>
                <div className="musiciansContainer">
                  {musiciansToShow.map((m, i) => (
                    <div key={m.name + i} className="musicianCard">
                      <img
                        src={m.musicianImage}
                        alt={m.name}
                        
                      />
                      <strong>{m.name}</strong>
                      {m.bands?.length > 0 && (
                        <div className="musicianBands">
                          {m.bands.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <PaginationDots />
              </>
            )}
          </>
        )}
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