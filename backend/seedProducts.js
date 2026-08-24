const mongoose = require("mongoose");
const dns = require("dns");
const dotenv = require("dotenv");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const Product = require("./models/Product");

dotenv.config();

const products = [
  // North Indian
  {
    name: "Butter Chicken",
    category: "North Indian",
    price: 280,
    image: "/images/foods/butterchicken.jpg",
  },
  {
    name: "Paneer Butter Masala",
    category: "North Indian",
    price: 220,
    image: "/images/foods/paneer-butter-masala.jpg",
  },
  {
    name: "Dal Makhani",
    category: "North Indian",
    price: 180,
    image: "/images/foods/dal-makhani.jpg",
  },
  {
    name: "Rajma",
    category: "North Indian",
    price: 160,
    image: "/images/foods/rajma.jpg",
  },
  {
    name: "Palak Paneer",
    category: "North Indian",
    price: 210,
    image: "/images/foods/palak-paneer.jpg",
  },
  {
    name: "Malai Kofta",
    category: "North Indian",
    price: 230,
    image: "/images/foods/malai-kofta.jpg",
  },
  {
    name: "Amritsari Kulcha",
    category: "North Indian",
    price: 150,
    image: "/images/foods/amritsari-kulcha.jpg",
  },
  {
    name: "Naan",
    category: "North Indian",
    price: 60,
    image: "/images/foods/naan.jpg",
  },
  {
    name: "Chole Bhature",
    category: "North Indian",
    price: 160,
    image: "/images/foods/chole-bhatura.jpg",
  },
  {
    name: "Tandoori Chicken",
    category: "North Indian",
    price: 320,
    image: "/images/foods/tandoori-chicken.jpg",
  },

  // South Indian
  {
    name: "Masala Dosa",
    category: "South Indian",
    price: 120,
    image: "/images/foods/masala-dosa.jpg",
  },
  {
    name: "Idli",
    category: "South Indian",
    price: 80,
    image: "/images/foods/idli.jpg",
  },
  {
    name: "Medu Vada",
    category: "South Indian",
    price: 90,
    image: "/images/foods/medu-vada.jpg",
  },
  {
    name: "Pongal",
    category: "South Indian",
    price: 100,
    image: "/images/foods/pongal.jpg",
  },
  {
    name: "Appam",
    category: "South Indian",
    price: 110,
    image: "/images/foods/appam.jpg",
  },
  {
    name: "Kerala Parotta",
    category: "South Indian",
    price: 100,
    image: "/images/foods/kerala-parotta.jpg",
  },
  {
    name: "Chicken Chettinad",
    category: "South Indian",
    price: 280,
    image: "/images/foods/chicken-chettinad.jpg",
  },
  {
    name: "Lemon Rice",
    category: "South Indian",
    price: 90,
    image: "/images/foods/lemon-rice.jpg",
  },

  // Indian Street Food
  {
    name: "Pani Puri",
    category: "Indian Street Food",
    price: 70,
    image: "/images/foods/pani-puri.jpg",
  },
  {
    name: "Pav Bhaji",
    category: "Indian Street Food",
    price: 120,
    image: "/images/foods/pav-bhaji.jpg",
  },
  {
    name: "Bhel",
    category: "Indian Street Food",
    price: 80,
    image: "/images/foods/bhel.jpg",
  },
  {
    name: "Kachori",
    category: "Indian Street Food",
    price: 60,
    image: "/images/foods/kachori.jpg",
  },
  {
    name: "Samosa",
    category: "Indian Street Food",
    price: 50,
    image: "/images/foods/samosa.jpg",
  },
  {
    name: "Dabeli",
    category: "Indian Street Food",
    price: 70,
    image: "/images/foods/dabeli.jpg",
  },

  // Biryani
  {
    name: "Chicken Biryani",
    category: "Biryani",
    price: 220,
    image: "/images/foods/chicken-briyani.jpg",
  },
  {
    name: "Mutton Biryani",
    category: "Biryani",
    price: 300,
    image: "/images/foods/mutton-briyani.jpg",
  },
  {
    name: "Veg Biryani",
    category: "Biryani",
    price: 180,
    image: "/images/foods/veg-briyani.jpg",
  },
  {
    name: "Hyderabadi Biryani",
    category: "Biryani",
    price: 250,
    image: "/images/foods/hyderabadi-briyani.jpg",
  },
  {
    name: "Lucknowi Biryani",
    category: "Biryani",
    price: 240,
    image: "/images/foods/lucknowi-briyani.jpg",
  },
  {
    name: "Ambur Biryani",
    category: "Biryani",
    price: 230,
    image: "/images/foods/ambur-briyani.jpg",
  },

  // Asian
  {
    name: "Hakka Noodles",
    category: "Asian",
    price: 180,
    image: "/images/foods/hakka-noodles.jpg",
  },
  {
    name: "Schezwan Noodles",
    category: "Asian",
    price: 190,
    image: "/images/foods/schezwan-noodles.jpg",
  },
  {
    name: "Fried Rice",
    category: "Asian",
    price: 170,
    image: "/images/foods/fried-rice.jpg",
  },
  {
    name: "Ramen",
    category: "Asian",
    price: 280,
    image: "/images/foods/ramen.jpg",
  },
  {
    name: "Sushi",
    category: "Asian",
    price: 450,
    image: "/images/foods/sushi.jpg",
  },
  {
    name: "Dumplings",
    category: "Asian",
    price: 220,
    image: "/images/foods/dumplings.jpg",
  },

  // Italian
  {
    name: "Alfredo Pasta",
    category: "Italian",
    price: 240,
    image: "/images/foods/alfredo-pasta.jpg",
  },
  {
    name: "Arrabbiata",
    category: "Italian",
    price: 220,
    image: "/images/foods/arrabbiata.jpg",
  },
  {
    name: "Lasagna",
    category: "Italian",
    price: 300,
    image: "/images/foods/lasagna.jpg",
  },
  {
    name: "Ravioli",
    category: "Italian",
    price: 280,
    image: "/images/foods/ravioli.jpg",
  },

  // Continental
  {
    name: "Grilled Chicken",
    category: "Continental",
    price: 320,
    image: "/images/foods/grilled-chicken.jpg",
  },
  {
    name: "Chicken Steak",
    category: "Continental",
    price: 350,
    image: "/images/foods/chicken-steak.jpg",
  },
  {
    name: "Fish and Chips",
    category: "Continental",
    price: 300,
    image: "/images/foods/fish-and-chips.jpg",
  },
  {
    name: "Chicken Stroganoff",
    category: "Continental",
    price: 330,
    image: "/images/foods/chicken-stroganoff.jpg",
  },
  {
    name: "Grilled Sandwich",
    category: "Continental",
    price: 180,
    image: "/images/foods/grilled-sandwich.jpg",
  },
  {
    name: "Creamy Mushroom Soup",
    category: "Continental",
    price: 160,
    image: "/images/foods/creamy-mushroom-soup.jpg",
  },
  {
    name: "Caesar Salad",
    category: "Continental",
    price: 190,
    image: "/images/foods/caesar-salad.jpg",
  },
  {
    name: "Garlic Bread",
    category: "Continental",
    price: 120,
    image: "/images/foods/garlic-bread.jpg",
  },
  {
    name: "Mac and Cheese",
    category: "Continental",
    price: 220,
    image: "/images/foods/mac-and-cheese.jpg",
  },
  {
    name: "Chicken Wings",
    category: "Continental",
    price: 250,
    image: "/images/foods/chicken-wings.jpg",
  },

  // Fast Food
  {
    name: "Burger",
    category: "Fast Food",
    price: 199,
    image: "/images/foods/burger.jpg",
  },
  {
    name: "Wrap",
    category: "Fast Food",
    price: 160,
    image: "/images/foods/wrap.jpg",
  },
  {
    name: "Sandwich",
    category: "Fast Food",
    price: 140,
    image: "/images/foods/sandwich.jpg",
  },
  {
    name: "Pizza",
    category: "Fast Food",
    price: 299,
    image: "/images/foods/pizza.jpg",
  },
  {
    name: "Fries",
    category: "Fast Food",
    price: 120,
    image: "/images/foods/fries.jpg",
  },

  // Desserts
  {
    name: "Gulab Jamun",
    category: "Desserts",
    price: 90,
    image: "/images/foods/gulab-jamun.jpg",
  },
  {
    name: "Rasmalai",
    category: "Desserts",
    price: 110,
    image: "/images/foods/rasmalai.jpg",
  },
  {
    name: "Brownie",
    category: "Desserts",
    price: 150,
    image: "/images/foods/brownie.jpg",
  },
  {
    name: "Cheesecake",
    category: "Desserts",
    price: 220,
    image: "/images/foods/cheesecake.jpg",
  },
  {
    name: "Ice Cream",
    category: "Desserts",
    price: 120,
    image: "/images/foods/ice-cream.jpg",
  },

  // Drinks
  {
    name: "Lassi",
    category: "Drinks",
    price: 90,
    image: "/images/foods/lassi.jpg",
  },
  {
    name: "Filter Coffee",
    category: "Drinks",
    price: 70,
    image: "/images/foods/filter-coffee.jpg",
  },
  {
    name: "Tea",
    category: "Drinks",
    price: 50,
    image: "/images/foods/tea.jpg",
  },
  {
    name: "Cold Coffee",
    category: "Drinks",
    price: 130,
    image: "/images/foods/cold-coffee.jpg",
  },
  {
    name: "Juice",
    category: "Drinks",
    price: 100,
    image: "/images/foods/juice.jpg",
  },
  {
    name: "Mojito",
    category: "Drinks",
    price: 150,
    image: "/images/foods/mojito.jpg",
  },
];

products.forEach((product) => {
  product.stock = 20;
  product.isAvailable = true;
});

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products seeded successfully`);

    await mongoose.connection.close();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedProducts();