export const color = [
  "white",
  "black",
  "red",
  "maroon",
  "beige",
  "pink",
  "green",
  "yellow",
  "blue",
  "purple",
  "gray",
  "brown",
  "orange",
  "navy",
  "olive",
  "teal"
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "red", label: "Red" },
      { value: "maroon", label: "Maroon" },
      { value: "beige", label: "Beige" },
      { value: "pink", label: "Pink" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "gray", label: "Gray" },
      { value: "brown", label: "Brown" },
      { value: "orange", label: "Orange" },
      { value: "navy", label: "Navy" },
      { value: "olive", label: "Olive" },
      { value: "teal", label: "Teal" }
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "XXL", label: "XXL" },
      { value: "3XL", label: "3XL" }
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "men_clothing", label: "Men's Clothing" },
      { value: "women_clothing", label: "Women's Clothing" },
      { value: "kids_clothing", label: "Kids' Clothing" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" }
    ]
  }
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-499", label: "Under ₹499" },
      { value: "500-999", label: "₹500 To ₹999" },
      { value: "1000-1999", label: "₹1000 To ₹1999" },
      { value: "2000-2999", label: "₹2000 To ₹2999" },
      { value: "3000-4999", label: "₹3000 To ₹4999" },
      { value: "5000-9999", label: "₹5000 To ₹9999" },
      { value: "10000-above", label: "₹10000 & Above" }
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% And Above" },
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" }
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" }
    ],
  },
  {
    id: "rating",
    name: "Rating",
    options: [
      { value: "4", label: "4★ & Above" },
      { value: "3", label: "3★ & Above" },
      { value: "2", label: "2★ & Above" },
      { value: "1", label: "1★ & Above" }
    ]
  }
];

export const sortOptions = [
  { name: "What's New", query: "new", current: false },
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
  { name: "Popularity", query: "popularity", current: false },
  { name: "Customer Rating", query: "rating", current: false },
  { name: "Discount", query: "discount", current: false }
];
