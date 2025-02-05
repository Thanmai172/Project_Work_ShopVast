import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import Address from '../components/Address'; // Import the Address component
import CartItems from './CartItems';
// import CartItemsAPI from './CartItemsAPI'; // API-based cart
import JobList from './JobList';


const FreelancerDashboard = () => {  
    const navigate = useNavigate();  
    const [selectedCategory, setSelectedCategory] = useState(null);  
    const [searchQuery, setSearchQuery] = useState('');  
    const [mobileCart, setMobileCart] = useState({}); // State to manage mobile cart  
    const [laptopCart, setLaptopCart] = useState({}); // State to manage laptop cart  
    const [clothingCart, setClothingCart] = useState({});
    const [paymentSuccess] = useState(false);  
    const [addressVisible, setAddressVisible] = useState(false); // State to manage address visibility 
    const [cartVisible, setCartVisible] = useState(false); 
    const [showJobs, setShowJobs] = useState(false); 
       
    // const [useAPI, setUseAPI] = useState(false); // Toggle between API and local cart


    // Mobile Listings Data  
    const mobileListings = [  
        {  
            id: 1,  
            name: "Samsung Galaxy S23",  
            description: "The Samsung Galaxy S23 comes with a 6.1-inch Dynamic AMOLED display, Snapdragon 8 Gen 2 processor, and a 50MP triple-camera setup, ensuring top-tier performance and photography.",  
            price: 74999,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJED6TNNY6B0yZc1l3e56YYSyuBMhKsEO-qA&s",  
            reviews: [  
                { name: "Rahul Mehta", comment: "Superb performance and great battery life!" },  
                { name: "Sophie Turner", comment: "One of the best Samsung flagships!" }  
            ]  
        },  
        {  
            id: 2,  
            name: "iPhone 14 Pro",  
            description: "Apple's iPhone 14 Pro features a 6.1-inch Super Retina XDR display, A16 Bionic chip, and a 48MP primary camera for breathtaking photos and videos.",  
            price: 129999,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9pxqnVS-6Qpi495DjQqgwmIiQUft-Wgee1Q&s",  
            reviews: [  
                { name: "Alex Johnson", comment: "Absolutely stunning display and camera quality!" },  
                { name: "Priya Sharma", comment: "Love the Dynamic Island feature!" }  
            ]  
        },  
        {  
            id: 3,  
            name: "Google Pixel 7 Pro",  
            description: "The Google Pixel 7 Pro boasts a 6.7-inch OLED display, Tensor G2 chip, and an incredible 50MP triple-camera system with advanced computational photography.",  
            price: 84999,  
            image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/t/u/m/-original-imaggsuehy3nyj3b.jpeg?q=90&crop=false",  
            reviews: [  
                { name: "Neha Verma", comment: "Best phone for photography!" },  
                { name: "Chris Evans", comment: "Smooth software experience, love the stock Android!" }  
            ]  
        },  
        {  
            id: 4,  
            name: "OnePlus 11 5G",  
            description: "OnePlus 11 5G comes with a Snapdragon 8 Gen 2, a 120Hz LTPO AMOLED display, and Hasselblad-tuned 50MP triple cameras for flagship performance.",  
            price: 56999,  
            image: "https://m.media-amazon.com/images/I/61amb0CfMGL.jpg",  
            reviews: [  
                { name: "Amit Rao", comment: "Premium feel and ultra-fast performance!" },  
                { name: "Jessica Brown", comment: "Excellent battery and camera quality." }  
            ]  
        },  
        {  
            id: 5,  
            name: "Xiaomi 13 Pro",  
            description: "The Xiaomi 13 Pro features a 1-inch 50MP Leica camera, Snapdragon 8 Gen 2, and a 6.73-inch LTPO AMOLED display for an unmatched experience.",  
            price: 79999,  
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1678361301.0778978!400x400!85.png",  
            reviews: [  
                { name: "Rohan Das", comment: "Superb camera quality, best in the segment!" },  
                { name: "Emily Carter", comment: "Fast charging and a stunning display." }  
            ]  
        },  
        {  
            id: 6,  
            name: "Realme GT 3",  
            description: "Realme GT 3 offers a Snapdragon 8+ Gen 1 chipset, 144Hz AMOLED display, and 240W fast charging for an unbeatable gaming and multimedia experience.",  
            price: 41999,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNEcF3Z2mI7plAqPBruuD-1JJP7Xyec3m9w&s",  
            reviews: [  
                { name: "Vikram Anand", comment: "Blazing fast charging, unbelievable performance!" },  
                { name: "Sophia Lee", comment: "Love the high refresh rate screen!" }  
            ]  
        },  
        {  
            id: 7,  
            name: "Vivo X90 Pro",  
            description: "Vivo X90 Pro sports a 6.78-inch AMOLED display, Dimensity 9200 processor, and Zeiss-powered 50MP triple-camera setup for stunning low-light photography.",  
            price: 69999,  
            image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/1/m/r/x90-pro-v2219-vivo-original-imagzzrqg2zbjfas.jpeg?q=90&crop=false",  
            reviews: [  
                { name: "Anil Kapoor", comment: "Flagship-level camera at a reasonable price!" },  
                { name: "Sarah Williams", comment: "Great display and battery life." }  
            ]  
        },  
        {  
            id: 8,  
            name: "Asus ROG Phone 7",  
            description: "Asus ROG Phone 7 is a gaming beast with a 165Hz AMOLED display, Snapdragon 8 Gen 2, and a massive 6000mAh battery for long gaming sessions.",  
            price: 74999,  
            image: "https://dlcdnwebimgs.asus.com/gain/24D0E21F-90B8-47EB-9F5B-AD6D1458D959",  
            reviews: [  
                { name: "Gaurav Kumar", comment: "Best gaming phone on the market!" },  
                { name: "Linda Green", comment: "Long-lasting battery, amazing performance!" }  
            ]  
        },  
        {  
            id: 9,  
            name: "Nothing Phone (2)",  
            description: "The Nothing Phone (2) brings a unique transparent design, Snapdragon 8+ Gen 1, and a 50MP dual-camera setup with a 120Hz OLED display.",  
            price: 45999,  
            image: "https://m.media-amazon.com/images/I/81uGOCbTaiL.jpg",  
            reviews: [  
                { name: "Nitin Sharma", comment: "Unique design, love the Glyph interface!" },  
                { name: "Julia Roberts", comment: "Very smooth performance and great battery!" }  
            ]  
        },  
        {  
            id: 10,  
            name: "Motorola Edge 30 Ultra",  
            description: "Motorola Edge 30 Ultra features a 200MP primary camera, Snapdragon 8+ Gen 1, and a 144Hz OLED display for a top-tier multimedia experience.",  
            price: 58999,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyUUR1auR24Y5tuODrs0C_w8oiin7ivfXlmw&s",  
            reviews: [  
                { name: "Rajeev Menon", comment: "Insane camera resolution, love the performance!" },  
                { name: "Emma Watson", comment: "Super smooth UI and long battery life." }  
            ]  
        }  
    ];
    
    // Laptop Listings Data  
    const laptopListings = [  
        {  
            id: 1,  
            name: "Dell Inspiron 15 3000",  
            description: "The Dell Inspiron 15 3000 boasts a 15.6-inch FHD display, Intel Core i5, and 8GB of RAM, making it perfect for everyday tasks, online classes, and entertainment.",  
            price: 55000,  
            image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSDv9S92elAuCnc7Pfz4FK9RtbZJNLyJ2x5ryrRWxISXvWeF9VakiOMIHkDhEI_AUxMqO7MD13qhYrkiisH84L4h7LUGikjI1ao6Ske-ZtWSlO6pzcJkJul&usqp=CAE",  
            reviews: [  
                { name: "Chris Davis", comment: "Perfect for my college needs, very reliable!" },  
                { name: "Molly Green", comment: "Good performance for the price." }  
            ]  
        },  
        {  
            id: 2,  
            name: "HP Pavilion x360 (2023)",  
            description: "The HP Pavilion x360 is a versatile 2-in-1 laptop featuring a 14-inch touchscreen, Intel Core i7 processor, and 16GB of memory, ideal for both work and play.",  
            price: 65000,  
            image: "https://images.indianexpress.com/2023/04/hp-pavilion-x360-2023-review.jpg",  
            reviews: [  
                { name: "Dan Parker", comment: "Love the flexibility of this laptop!" },  
                { name: "Nancy Taylor", comment: "Fantastic laptop for both work and leisure." }  
            ]  
        },  
        {  
            id: 3,  
            name: "Lenovo IdeaPad Slim 5",  
            description: "With a sleek design and powerful performance, the Lenovo IdeaPad Slim 5 comes with Ryzen 5, 8GB RAM, and a 15.6-inch FHD display, perfect for productivity on the go.",  
            price: 60000,  
            image: "https://m.media-amazon.com/images/I/41hSW3ehqjL._SX300_SY300_QL70_FMwebp_.jpg",  
            reviews: [  
                { name: "George Wilson", comment: "Lightweight and highly efficient!" },  
                { name: "Sophia Black", comment: "Best purchase I've made this year." }  
            ]  
        },
        {  
            id: 4,  
            name: "Apple MacBook Air M1",  
            description: "Powered by the Apple M1 chip, this MacBook Air features a Retina display, all-day battery life, and silent operation for a premium experience.",  
            price: 92000,  
            image: "https://m.media-amazon.com/images/I/71jG+e7roXL.jpg",  
            reviews: [  
                { name: "Emma Roberts", comment: "Best laptop for students and professionals!" },  
                { name: "John Smith", comment: "Super fast and lightweight." }  
            ]  
        },
        {  
            id: 5,  
            name: "ASUS ROG Strix G15",  
            description: "A gaming beast featuring AMD Ryzen 7, RTX 3050 Ti, 144Hz display, and RGB keyboard, designed for hardcore gamers.",  
            price: 115000,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWCRxNzrwz4_BFYpsgaZCCcHbvwBJVIoDjg&s",  
            reviews: [  
                { name: "Lucas Brown", comment: "Handles all games smoothly!" },  
                { name: "Derek Hall", comment: "Best laptop for gaming at this price point." }  
            ]  
        },
        {  
            id: 6,  
            name: "Acer Aspire 7",  
            description: "Equipped with AMD Ryzen 5, GTX 1650, and a 15.6-inch FHD display, the Acer Aspire 7 is a budget gaming laptop with solid performance.",  
            price: 72000,  
            image: "https://m.media-amazon.com/images/I/61wsFsvdsdL.jpg",  
            reviews: [  
                { name: "Chris Adams", comment: "Great performance for the price!" },  
                { name: "Tina White", comment: "Solid build and good battery life." }  
            ]  
        },
        {  
            id: 7,  
            name: "Microsoft Surface Laptop 4",  
            description: "The Surface Laptop 4 offers a sleek design, Intel Core i7, and a stunning 13.5-inch PixelSense touchscreen for a premium Windows experience.",  
            price: 105000,  
            image: "https://m.media-amazon.com/images/I/61D2zacMiPL.jpg",  
            reviews: [  
                { name: "Samantha Lee", comment: "Perfect for professionals and students!" },  
                { name: "Kevin Johnson", comment: "Love the build quality and smooth performance." }  
            ]  
        },
        {  
            id: 8,  
            name: "MSI Katana GF66",  
            description: "A powerful gaming laptop featuring Intel Core i7, RTX 3060, and a 144Hz display, built for immersive gaming and high performance.",  
            price: 125000,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ8JL5ROU_RMlRzSskcSVGD4HCEvBYtaYNGg&s",  
            reviews: [  
                { name: "Alex Carter", comment: "Runs AAA games smoothly!" },  
                { name: "Brian Nelson", comment: "Super fast and well-built." }  
            ]  
        },
        {  
            id: 9,  
            name: "LG Gram 16",  
            description: "A super-lightweight 16-inch laptop with Intel Core i7, 16GB RAM, and an impressive battery life, ideal for portability.",  
            price: 96000,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyXDiy-39isLpQdNAXK4QyR9o1i0whcO-hXg&s",  
            reviews: [  
                { name: "Olivia Perez", comment: "Ultra-lightweight and perfect for travel." },  
                { name: "Ethan Moore", comment: "Great battery life and screen quality." }  
            ]  
        },
        {  
            id: 10,  
            name: "Razer Blade 15",  
            description: "A premium gaming laptop with Intel Core i7, RTX 3070, and a 165Hz QHD display, designed for high-end gaming and content creation.",  
            price: 180000,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2nbd5BwjSwi8HF2yXr2MIZLt9O_ab7F2Bw&s",  
            reviews: [  
                { name: "David Scott", comment: "Amazing performance and build quality!" },  
                { name: "Jason Clark", comment: "Best gaming laptop I've ever used." }  
            ]  
        }
    ];

    const clothingListings = [  
        {  
            id: 1,  
            name: "Men's Casual Cotton Shirt",  
            description: "A breathable and stylish cotton shirt, perfect for everyday wear. Features a slim fit and button-down collar.",  
            price: 1200,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGcKweImgKA4ncxclGPIkBndZa2_PqwseQvg&s",  
            reviews: [  
                { name: "John Doe", comment: "Great fit and comfortable fabric!" },  
                { name: "Mike Wilson", comment: "Perfect for casual outings." }  
            ]  
        },  
        {  
            id: 2,  
            name: "Men's Formal Dress Shirt",  
            description: "A premium cotton formal shirt with a modern fit, ideal for office wear and special occasions.",  
            price: 1800,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqW4DGeYt3Z8QzJiaEe4j5Kr1UuwX-GGSckQ&s",  
            reviews: [  
                { name: "Samuel Green", comment: "Looks very professional and fits well." },  
                { name: "Brian Adams", comment: "Quality material, worth the price." }  
            ]  
        },  
        {  
            id: 3,  
            name: "Men's Denim Shirt",  
            description: "A stylish denim shirt with a rugged look, great for casual wear and layering.",  
            price: 1600,  
            image: "https://5.imimg.com/data5/AO/SV/MY-43691381/denim-shirt-men-dark-blue-mens-denim-shirts-manufacturers.jpg",  
            reviews: [  
                { name: "Ethan Moore", comment: "Looks great and feels durable!" },  
                { name: "Ryan Scott", comment: "Good quality denim, stylish design." }  
            ]  
        },  
        {  
            id: 4,  
            name: "Men's Hawaiian Printed Shirt",  
            description: "A vibrant and lightweight Hawaiian shirt, perfect for beach vacations and summer outings.",  
            price: 1300,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyYucJxLXUH7upY4pstUF7dxsn0HOEFQYxA&s",  
            reviews: [  
                { name: "Chris Brown", comment: "Love the colors and the comfort!" },  
                { name: "Nathan Lee", comment: "Perfect for summer, looks amazing." }  
            ]  
        },  
        {  
            id: 5,  
            name: "Men's Flannel Checked Shirt",  
            description: "A cozy flannel shirt with a classic checked pattern, great for layering in winter.",  
            price: 1400,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAoMAVwwE5Yt7OSxpLsNTgOusd8uOEurZmig&s",  
            reviews: [  
                { name: "Jake Rogers", comment: "Warm and stylish, love it!" },  
                { name: "Tom Harris", comment: "Perfect for casual wear, soft fabric." }  
            ]  
        },  
        {  
            id: 6,  
            name: "Men's Slim Fit Chinos",  
            description: "A modern pair of slim-fit chinos, perfect for both casual and formal occasions.",  
            price: 2000,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKms-jfV_bZfs2Uk0FDiP_B1S7lv1Qco2ymA&s",  
            reviews: [  
                { name: "Kevin Wright", comment: "Very comfortable and stylish!" },  
                { name: "Alex Carter", comment: "Fits perfectly, nice stretchable fabric." }  
            ]  
        },  
        {  
            id: 7,  
            name: "Men's Regular Fit Jeans",  
            description: "Classic regular fit jeans with a timeless look, suitable for everyday wear.",  
            price: 2500,  
            image: "https://assets.ajio.com/medias/sys_master/root/20221212/LAzR/63975ad6aeb269659ce3c3cc/-473Wx593H-441879386-darkblue-MODEL.jpg",  
            reviews: [  
                { name: "David Brooks", comment: "Great quality and comfortable fit!" },  
                { name: "Eric Johnson", comment: "Perfect jeans, very durable." }  
            ]  
        },  
        {  
            id: 8,  
            name: "Men's Cargo Pants",  
            description: "Durable and functional cargo pants with multiple pockets, ideal for outdoor activities.",  
            price: 2200,  
            image: "https://assets.ajio.com/medias/sys_master/root/20240213/IPZc/65cb9cf016fd2c6e6af5850f/-473Wx593H-467069481-khaki-MODEL.jpg",  
            reviews: [  
                { name: "Jason Taylor", comment: "Very comfortable, love the extra pockets!" },  
                { name: "Michael Evans", comment: "Great for hiking and casual wear." }  
            ]  
        },  
        {  
            id: 9,  
            name: "Men's Athletic Joggers",  
            description: "Stylish and breathable joggers with an elastic waistband, perfect for workouts and casual wear.",  
            price: 1800,  
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9x6oKAp1JG7LjG37Sdm8q__-xwh6dBJLStg&s",  
            reviews: [  
                { name: "Daniel Martin", comment: "Super comfy for workouts!" },  
                { name: "Chris Walker", comment: "Looks good and fits well." }  
            ]  
        },  
        {  
            id: 10,  
            name: "Men's Formal Dress Pants",  
            description: "Elegant and well-tailored dress pants, perfect for office wear and formal occasions.",  
            price: 2700,  
            image: "https://i.pinimg.com/236x/9c/1e/33/9c1e33b56eab74a8fc7f66bd0061a920.jpg",  
            reviews: [  
                { name: "Andrew Smith", comment: "Very stylish and high-quality material!" },  
                { name: "Brandon Lewis", comment: "Perfect for business meetings." }  
            ]  
        }  
    ];  
    
    
    const showCategory = (category) => {  
        setSelectedCategory(category);  
        setSearchQuery('');  
    };  

      // Function to handle submitted address  
      const handleAddressSubmit = async(addressDetails) => {  
        console.log('Address Details:', addressDetails);  
        // Implement saving or processing address here  
       
        setAddressVisible(false); // Hide the address form after submission  
    };  

    const handleSearch = () => {  
        // Keep the selected category when performing the search  
    };  

    const getListings = () => {  
        if (selectedCategory === 'mobile') {  
            return mobileListings.filter(item =>  
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||  
                item.description.toLowerCase().includes(searchQuery.toLowerCase())  
            );  
        } else if (selectedCategory === 'laptop') {  
            return laptopListings.filter(item =>  
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||  
                item.description.toLowerCase().includes(searchQuery.toLowerCase())  
            );  
        } else if (selectedCategory === 'clothes') {  
            console.log(clothingListings);  // Debugging line to check clothing listings
            return clothingListings.filter(item =>  
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||  
                item.description.toLowerCase().includes(searchQuery.toLowerCase())  
            );  
        }  
        return [];  
    };
    

    const getTotalAmount = () => {  
        let totalAmount = 0;  

        // Calculate total for mobile items in cart  
        for (const [id, quantity] of Object.entries(mobileCart)) {  
            const item = mobileListings.find(item => item.id === Number(id));  
            if (item) {  
                totalAmount += item.price * quantity; // Multiply price by quantity  
            }  
        }  

        // Calculate total for laptop items in cart  
        for (const [id, quantity] of Object.entries(laptopCart)) {  
            const item = laptopListings.find(item => item.id === Number(id));  
            if (item) {  
                totalAmount += item.price * quantity; // Multiply price by quantity  
            }  
        }  

        // Calculate total for clothing items in cart  
    for (const [id, quantity] of Object.entries(clothingCart)) {  
        const item = clothingListings.find(item => item.id === Number(id));  
        if (item) {  
            totalAmount += item.price * quantity;  
        }  
    }  

        return totalAmount;  
    };  

    const handlePayment = () => {
        const cartItems = [
            ...Object.entries(mobileCart).map(([id,name,price, quantity]) => ({ productId: id,name,price, quantity })),
            ...Object.entries(laptopCart).map(([id,name,price, quantity]) => ({ productId: id,name,price, quantity })),
            ...Object.entries(clothingCart).map(([id,name,price, quantity]) => ({ productId: id,name,price, quantity })),
        ];
    
        navigate("/payment", {
            state: {
                totalAmount: getTotalAmount(),
                cartItems,
            },
        });
    };
    
      

    const handleAddToMobileCart = (id) => {  
        setMobileCart((prevCart) => ({  
            ...prevCart,  
            [id]: (prevCart[id] || 0) + 1,  
        }));  
    };  

    const handleRemoveFromMobileCart = (id) => {  
        setMobileCart((prevCart) => {  
            const newQuantity = (prevCart[id] || 0) - 1;  
            if (newQuantity <= 0) {  
                const { [id]: _, ...rest } = prevCart; // Remove the item if quantity is 0  
                return rest;  
            }  
            return { ...prevCart, [id]: newQuantity };  
        });  
    };  

    const handleAddToLaptopCart = (id) => {  
        setLaptopCart((prevCart) => ({  
            ...prevCart,  
            [id]: (prevCart[id] || 0) + 1,  
        }));  
    };  

    const handleRemoveFromLaptopCart = (id) => {  
        setLaptopCart((prevCart) => {  
            const newQuantity = (prevCart[id] || 0) - 1;  
            if (newQuantity <= 0) {  
                const { [id]: _, ...rest } = prevCart; // Remove the item if quantity is 0  
                return rest;  
            }  
            return { ...prevCart, [id]: newQuantity };  
        });  
    }; 

    const handleAddToClothingCart = (id) => {  
        setClothingCart((prevCart) => ({  
            ...prevCart,  
            [id]: (prevCart[id] || 0) + 1,  
        }));  
    };  

    const handleRemoveFromClothingCart = (id) => {  
        setClothingCart((prevCart) => {  
            const newQuantity = (prevCart[id] || 0) - 1;  
            if (newQuantity <= 0) {  
                const { [id]: _, ...rest } = prevCart; // Remove the item if quantity is 0  
                return rest;  
            }  
            return { ...prevCart, [id]: newQuantity };  
        });  
    };
    
    

    // Calculate total items in the cart for both categories  
    const totalItemsInMobileCart = Object.values(mobileCart).reduce((total, quantity) => total + quantity, 0);  
    const totalItemsInLaptopCart = Object.values(laptopCart).reduce((total, quantity) => total + quantity, 0);
    const totalItemsInClothingCart = Object.values(clothingCart).reduce((total, quantity) => total + quantity, 0);  

    const totalItemsInCart = totalItemsInMobileCart + totalItemsInLaptopCart + totalItemsInClothingCart;  
    

    return (  
        <div>  
            <h1>JobHub & Explore</h1>  
    
            <input  
                type="text"  
                value={searchQuery}  
                onChange={(e) => setSearchQuery(e.target.value)}  
                placeholder="Search for mobile, laptop, or clothing..."  
            />  
            <button onClick={handleSearch}>Search</button>  
    
            <h2>Featured Listings</h2>  
            <button onClick={() => showCategory('mobile')}>Mobile Listings</button>  
            <button onClick={() => showCategory('laptop')}>Laptop Listings</button> 
            <button onClick={() => showCategory('clothes')}>Clothing Listings</button> 
            <button onClick={() => setAddressVisible(true)}>Enter Address</button> {/* Button to show address form */}  
    
            {/* Display total items in the cart */}
    
            <h3>Total Items in Cart: {totalItemsInCart}</h3>  
            <h3>Total Amount: ₹{getTotalAmount()}</h3>  
    
            {selectedCategory && (  
                <div id={selectedCategory} className="listing">  
                    <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Listings</h3>  
                    <ul>  
                        {getListings().length > 0 ? (  
                            getListings().map((item) => (  
                                <li key={item.id}>  
                                    <strong>{item.name}</strong>  
                                    <p>Description: {item.description}</p>  
                                    <p>Pricing: <span>{`₹${item.price}`}</span></p>  
                                    <img src={item.image} alt={item.name} width="200" />  
    
                                    {/* Quantity Control Section */}  
                                    <div style={{ display: 'flex', alignItems: 'center' }}>  
                                        {selectedCategory === 'mobile' ? (  
                                            <>  
                                                <button onClick={() => handleRemoveFromMobileCart(item.id)}>-</button>  
                                                <span style={{ margin: '0 10px' }}>{mobileCart[item.id] || 0}</span>  
                                                <button onClick={() => handleAddToMobileCart(item.id)}>+</button>  
                                            </>  
                                        ) : selectedCategory === 'laptop' ? (  
                                            <>  
                                                <button onClick={() => handleRemoveFromLaptopCart(item.id)}>-</button>  
                                                <span style={{ margin: '0 10px' }}>{laptopCart[item.id] || 0}</span>  
                                                <button onClick={() => handleAddToLaptopCart(item.id)}>+</button>  
                                            </>  
                                        ) : (  
                                            <>  
                                                <button onClick={() => handleRemoveFromClothingCart(item.id)}>-</button>  
                                                <span style={{ margin: '0 10px' }}>{clothingCart[item.id] || 0}</span>  
                                                <button onClick={() => handleAddToClothingCart(item.id)}>+</button>  
                                            </>  
                                        )}  
                                    </div>  
    
                                    {/* Reviews Section */}  
                                    <h4>Reviews:</h4>  
                                    <ul>  
                                        {item.reviews.map((review, idx) => (  
                                            <li key={idx}>  
                                                <strong>{review.name}</strong>: {review.comment}  
                                            </li>  
                                        ))}  
                                    </ul>  
                                </li>  
                            ))  
                        ) : (  
                            <li>No results found for "{searchQuery}"</li>  
                        )}  
                    </ul>


            <button onClick={() => setCartVisible(!cartVisible)}>
                {cartVisible ? 'Hide Cart' : 'Cart Items'}
            </button>

            {cartVisible && (
                <CartItems
                    mobileCart={mobileCart}
                    laptopCart={laptopCart}
                    clothingCart={clothingCart}
                    mobileListings={mobileListings}
                    laptopListings={laptopListings}
                    clothingListings={clothingListings}
                    handleRemoveFromMobileCart={handleRemoveFromMobileCart}
                    handleRemoveFromLaptopCart={handleRemoveFromLaptopCart}
                    handleRemoveFromClothingCart={handleRemoveFromClothingCart}
                />
            )}  
                </div>  
            )}  
    
            {/* Show address form if visible */}  
            {addressVisible && (  
                <Address onSubmit={handleAddressSubmit} />  
            )}  
    
            {/* Handle Payment for entire cart */}  
            {totalItemsInCart > 0 && !paymentSuccess && (  
                <button onClick={handlePayment} style={{ marginTop: '20px' }}>Pay Now (Total: ₹{getTotalAmount()})</button>  
            )}  
            {paymentSuccess && (  
                <p style={{ color: 'green' }}>Payment successful! Thank you for your purchase.</p>  
            )}
            
            <hr />  
            <h1>JOBHUB</h1>
        <button onClick={() => setShowJobs(!showJobs)}>
            {showJobs ? 'Hide Job Listings' : 'Show Job Listings'}
        </button>  

        {showJobs && <JobList />}  
        <hr /> 
        </div>  
    );
    
};  

export default FreelancerDashboard;