const menuData = [
  // North Indian
  {
    id: 1,
    name: "Butter Chicken",
    category: "North Indian",
    price: 280,
    image: "/images/foods/butterchicken.jpg",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    category: "North Indian",
    price: 220,
    image: "/images/foods/paneer-butter-masala.jpg",
  },
  {
    id: 3,
    name: "Dal Makhani",
    category: "North Indian",
    price: 180,
    image: "/images/foods/dal-makhani.jpg",
  },
  {
    id: 4,
    name: "Rajma",
    category: "North Indian",
    price: 160,
    image: "/images/foods/rajma.jpg",
  },
  {
    id: 5,
    name: "Palak Paneer",
    category: "North Indian",
    price: 210,
    image: "/images/foods/palak-paneer.jpg",
  },
  {
    id: 6,
    name: "Malai Kofta",
    category: "North Indian",
    price: 230,
    image: "/images/foods/malai-kofta.jpg",
  },
  {
    id: 7,
    name: "Amritsari Kulcha",
    category: "North Indian",
    price: 150,
    image: "/images/foods/amritsari-kulcha.jpg",
  },
  {
    id: 8,
    name: "Naan",
    category: "North Indian",
    price: 60,
    image: "/images/foods/naan.jpg",
  },
  {
    id: 9,
    name: "Chole Bhature",
    category: "North Indian",
    price: 160,
    image: "/images/foods/chole-bhatura.jpg",
  },
  {
    id: 10,
    name: "Tandoori Chicken",
    category: "North Indian",
    price: 320,
    image: "/images/foods/tandoori-chicken.jpg",
  },

  // South Indian
  {
    id: 11,
    name: "Masala Dosa",
    category: "South Indian",
    price: 120,
    image: "/images/foods/masala-dosa.jpg",
  },
  {
    id: 12,
    name: "Idli",
    category: "South Indian",
    price: 80,
    image: "/images/foods/idli.jpg",
  },
  {
    id: 13,
    name: "Medu Vada",
    category: "South Indian",
    price: 90,
    image: "/images/foods/medu-vada.jpg",
  },
  {
    id: 14,
    name: "Pongal",
    category: "South Indian",
    price: 100,
    image: "/images/foods/pongal.jpg",
  },
  {
    id: 15,
    name: "Appam",
    category: "South Indian",
    price: 110,
    image: "/images/foods/appam.jpg",
  },
  {
    id: 16,
    name: "Kerala Parotta",
    category: "South Indian",
    price: 100,
    image: "/images/foods/kerala-parotta.jpg",
  },
  {
    id: 17,
    name: "Chicken Chettinad",
    category: "South Indian",
    price: 280,
    image: "/images/foods/chicken-chettinad.jpg",
  },
  {
    id: 18,
    name: "Lemon Rice",
    category: "South Indian",
    price: 90,
    image: "/images/foods/lemon-rice.jpg",
  },

  // Indian Street Food
  {
    id: 19,
    name: "Pani Puri",
    category: "Indian Street Food",
    price: 70,
  },
  {
    id: 20,
    name: "Pav Bhaji",
    category: "Indian Street Food",
    price: 120,
  },
  {
    id: 21,
    name: "Bhel",
    category: "Indian Street Food",
    price: 80,
  },
  {
    id: 22,
    name: "Kachori",
    category: "Indian Street Food",
    price: 60,
  },
  {
    id: 23,
    name: "Samosa",
    category: "Indian Street Food",
    price: 50,
  },
  {
    id: 24,
    name: "Dabeli",
    category: "Indian Street Food",
    price: 70,
  },

  // Biryani
  {
    id: 25,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 220,
  },
  {
    id: 26,
    name: "Mutton Biryani",
    category: "Biryani",
    price: 300,
  },
  {
    id: 27,
    name: "Veg Biryani",
    category: "Biryani",
    price: 180,
  },
  {
    id: 28,
    name: "Hyderabadi Biryani",
    category: "Biryani",
    price: 250,
  },
  {
    id: 29,
    name: "Lucknowi Biryani",
    category: "Biryani",
    price: 240,
  },
  {
    id: 30,
    name: "Ambur Biryani",
    category: "Biryani",
    price: 230,
  },

  // Asian
  {
    id: 31,
    name: "Hakka Noodles",
    category: "Asian",
    price: 180,
  },
  {
    id: 32,
    name: "Schezwan Noodles",
    category: "Asian",
    price: 190,
  },
  {
    id: 33,
    name: "Fried Rice",
    category: "Asian",
    price: 170,
  },
  {
    id: 34,
    name: "Ramen",
    category: "Asian",
    price: 280,
  },
  {
    id: 35,
    name: "Sushi",
    category: "Asian",
    price: 450,
  },
  {
    id: 36,
    name: "Dumplings",
    category: "Asian",
    price: 220,
  },

  // Italian
  {
    id: 37,
    name: "Alfredo Pasta",
    category: "Italian",
    price: 240,
  },
  {
    id: 38,
    name: "Arrabbiata",
    category: "Italian",
    price: 220,
  },
  {
    id: 39,
    name: "Lasagna",
    category: "Italian",
    price: 300,
  },
  {
    id: 40,
    name: "Ravioli",
    category: "Italian",
    price: 280,
  },

  // Continental
  {
    id: 41,
    name: "Grilled Chicken",
    category: "Continental",
    price: 320,
  },
  {
    id: 42,
    name: "Chicken Steak",
    category: "Continental",
    price: 350,
  },
  {
    id: 43,
    name: "Fish and Chips",
    category: "Continental",
    price: 300,
  },
  {
    id: 44,
    name: "Chicken Stroganoff",
    category: "Continental",
    price: 330,
  },
  {
    id: 45,
    name: "Grilled Sandwich",
    category: "Continental",
    price: 180,
  },
  {
    id: 46,
    name: "Creamy Mushroom Soup",
    category: "Continental",
    price: 160,
  },
  {
    id: 47,
    name: "Caesar Salad",
    category: "Continental",
    price: 190,
  },
  {
    id: 48,
    name: "Garlic Bread",
    category: "Continental",
    price: 120,
  },
  {
    id: 49,
    name: "Mac and Cheese",
    category: "Continental",
    price: 220,
  },
  {
    id: 50,
    name: "Chicken Wings",
    category: "Continental",
    price: 250,
  },

  // Fast Food
  {
    id: 51,
    name: "Burger",
    category: "Fast Food",
    price: 199,
  },
  {
    id: 52,
    name: "Wrap",
    category: "Fast Food",
    price: 160,
  },
  {
    id: 53,
    name: "Sandwich",
    category: "Fast Food",
    price: 140,
  },
  {
    id: 54,
    name: "Pizza",
    category: "Fast Food",
    price: 299,
  },
  {
    id: 55,
    name: "Fries",
    category: "Fast Food",
    price: 120,
  },

  // Desserts
  {
    id: 56,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 90,
  },
  {
    id: 57,
    name: "Rasmalai",
    category: "Desserts",
    price: 110,
  },
  {
    id: 58,
    name: "Brownie",
    category: "Desserts",
    price: 150,
  },
  {
    id: 59,
    name: "Cheesecake",
    category: "Desserts",
    price: 220,
  },
  {
    id: 60,
    name: "Ice Cream",
    category: "Desserts",
    price: 120,
  },

  // Drinks
  {
    id: 61,
    name: "Lassi",
    category: "Drinks",
    price: 90,
  },
  {
    id: 62,
    name: "Filter Coffee",
    category: "Drinks",
    price: 70,
  },
  {
    id: 63,
    name: "Tea",
    category: "Drinks",
    price: 50,
  },
  {
    id: 64,
    name: "Cold Coffee",
    category: "Drinks",
    price: 130,
  },
  {
    id: 65,
    name: "Juice",
    category: "Drinks",
    price: 100,
  },
  {
    id: 66,
    name: "Mojito",
    category: "Drinks",
    price: 150,
  },
];

export default menuData;