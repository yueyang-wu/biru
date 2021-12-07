import React, { useState, useEffect } from "react";

import TopBar from "../Components/TopBar/TopBar";

import Banner from "../Components/HomePage/Banner";
import HomeHeader from "../Components/HomePage/HomeHeader";
import BeersContainer from "../Components/HomePage/BeersContainer";

export default function HomePage() {
  const [beers, setBeers] = useState([]);

  const fetchBeers = async (options) => {
    let params = "";
    for (const [key, value] of Object.entries(options)) {
      params += `${key}=${value}&`;
    }

    const url = "/beers?" + params.slice(0, -1);
    const res = await fetch(url);

    if (res.status === 200) {
      const allBeers = await res.json();
      setBeers(allBeers);
    } else {
      console.error("Can not get beers.");
    }
  };

  useEffect(() => {
    fetchBeers({
      styles: "all",
      countries: "all",
      flavors: "all",
      sortOption: "like-",
    });
  }, []);

  const handleSelectChanges = (selectedOptions) => {
    fetchBeers(selectedOptions);
  };

  return (
    <div>
      <div className="app">
        <TopBar />
        <Banner></Banner>
        <HomeHeader onChange={handleSelectChanges} />
        <BeersContainer beers={beers} />
      </div>
      <footer className="photo-credit">photos by Chuan Zhang</footer>
    </div>
  );
}
