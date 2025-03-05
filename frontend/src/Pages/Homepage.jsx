import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { findProducts } from "../Redux/Customers/Product/Action";

const Homepage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.customersProduct || {});
  const [categoryProducts, setCategoryProducts] = useState({
    // Men's Categories
    menShirts: [],
    menTshirts: [],
    menKurtas: [],
    menJeans: [],
    menTrousers: [],
    menShoes: [],
    menBags: [],
    menWatches: [],
    menSunglasses: [],

    // Women's Categories
    womenDresses: [],
    womenTops: [],
    womenTshirts: [],
    womenSarees: [],
    womenLenghaCholi: [],
    womenGowns: [],
    womenKurtas: [],
    womenJeans: [],
    womenShoes: [],
    womenBags: [],
    womenWatches: [],
    womenSunglasses: [],

    // Kids Categories
    kidsDresses: [],
    kidsTshirts: [],
    kidsJeans: [],
    kidsShoes: [],
    kidsBags: [],
    kidsWatches: [],
    kidsSunglasses: []
  });

  useEffect(() => {
    // Fetch products for each category
    const fetchProducts = async () => {
      const categories = [
        // Men's Categories
        "men_shirt",
        "men_t-shirts",
        "men_kurtas",
        "men_jeans",
        "men_trouser",
        "men_shoes",
        "men_bags",
        "men_watches",
        "men_sunglasses",

        // Women's Categories
        "women_dress",
        "women_tops",
        "women_t-shirts",
        "women_saree",
        "women_lengha_choli",
        "women_gowns",
        "women_kurtas",
        "women_jeans",
        "women_shoes",
        "women_bags",
        "women_watches",
        "women_sunglasses",

        // Kids Categories
        "kids_dress",
        "kids_t-shirts",
        "kids_jeans",
        "kids_shoes",
        "kids_bags",
        "kids_watches",
        "kids_sunglasses"
      ];

      for (const category of categories) {
        await dispatch(findProducts({ category }));
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (products?.content?.length > 0) {
      const category = products.content[0].thirdLevelCategory;
      const categoryKey = getCategoryKey(category);
      if (categoryKey) {
        setCategoryProducts(prev => ({
          ...prev,
          [categoryKey]: products.content
        }));
      }
    }
  }, [products]);

  // Helper function to convert category values to state keys
  const getCategoryKey = (category) => {
    const mapping = {
      'men_shirt': 'menShirts',
      'men_t-shirts': 'menTshirts',
      'men_kurtas': 'menKurtas',
      'men_jeans': 'menJeans',
      'men_trouser': 'menTrousers',
      'men_shoes': 'menShoes',
      'men_bags': 'menBags',
      'men_watches': 'menWatches',
      'men_sunglasses': 'menSunglasses',
      'women_dress': 'womenDresses',
      'women_tops': 'womenTops',
      'women_t-shirts': 'womenTshirts',
      'women_saree': 'womenSarees',
      'women_lengha_choli': 'womenLenghaCholi',
      'women_gowns': 'womenGowns',
      'women_kurtas': 'womenKurtas',
      'women_jeans': 'womenJeans',
      'women_shoes': 'womenShoes',
      'women_bags': 'womenBags',
      'women_watches': 'womenWatches',
      'women_sunglasses': 'womenSunglasses',
      'kids_dress': 'kidsDresses',
      'kids_t-shirts': 'kidsTshirts',
      'kids_jeans': 'kidsJeans',
      'kids_shoes': 'kidsShoes',
      'kids_bags': 'kidsBags',
      'kids_watches': 'kidsWatches',
      'kids_sunglasses': 'kidsSunglasses'
    };
    return mapping[category];
  };

  // Helper function to get display name for section
  const getSectionDisplayName = (key) => {
    const displayNames = {
      menShirts: "Men's Shirts",
      menTshirts: "Men's T-Shirts",
      menKurtas: "Men's Kurtas",
      menJeans: "Men's Jeans",
      menTrousers: "Men's Trousers",
      menShoes: "Men's Shoes",
      menBags: "Men's Bags",
      menWatches: "Men's Watches",
      menSunglasses: "Men's Sunglasses",
      womenDresses: "Women's Dresses",
      womenTops: "Women's Tops",
      womenTshirts: "Women's T-Shirts",
      womenSarees: "Women's Sarees",
      womenLenghaCholi: "Women's Lengha Choli",
      womenGowns: "Women's Gowns",
      womenKurtas: "Women's Kurtas",
      womenJeans: "Women's Jeans",
      womenShoes: "Women's Shoes",
      womenBags: "Women's Bags",
      womenWatches: "Women's Watches",
      womenSunglasses: "Women's Sunglasses",
      kidsDresses: "Kids' Dresses",
      kidsTshirts: "Kids' T-Shirts",
      kidsJeans: "Kids' Jeans",
      kidsShoes: "Kids' Shoes",
      kidsBags: "Kids' Bags",
      kidsWatches: "Kids' Watches",
      kidsSunglasses: "Kids' Sunglasses"
    };
    return displayNames[key];
  };

  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        {/* Men's Section */}
        <div className="space-y-10">
          <h2 className="text-2xl font-bold text-center mb-8">Men's Collection</h2>
          {Object.entries(categoryProducts)
            .filter(([key]) => key.startsWith('men'))
            .map(([key, products]) => (
              products.length > 0 && (
                <HomeProductSection 
                  key={key} 
                  data={products} 
                  section={getSectionDisplayName(key)} 
                />
              )
            ))}
        </div>

        {/* Women's Section */}
        <div className="space-y-10">
          <h2 className="text-2xl font-bold text-center mb-8">Women's Collection</h2>
          {Object.entries(categoryProducts)
            .filter(([key]) => key.startsWith('women'))
            .map(([key, products]) => (
              products.length > 0 && (
                <HomeProductSection 
                  key={key} 
                  data={products} 
                  section={getSectionDisplayName(key)} 
                />
              )
            ))}
        </div>

        {/* Kids' Section */}
        <div className="space-y-10">
          <h2 className="text-2xl font-bold text-center mb-8">Kids' Collection</h2>
          {Object.entries(categoryProducts)
            .filter(([key]) => key.startsWith('kids'))
            .map(([key, products]) => (
              products.length > 0 && (
                <HomeProductSection 
                  key={key} 
                  data={products} 
                  section={getSectionDisplayName(key)} 
                />
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
