import React, { useState } from "react";
import axios from "axios";

const Address = ({ onSubmit }) => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://project-work-shopvast-2.onrender.com/api/addresses", {
                address,
                city,
                postalCode,
                country,
            });

            console.log(response.data);
            onSubmit({ address, city, postalCode, country }); // Call the parent submit function
        } catch (error) {
            console.error("Error submitting address:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Enter Your Address</h3>

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Your city"
                required
            />

            <input
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Your Postal code"
                required
            />

            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your address"
                required
            />

            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Your country"
                required
            />

            <button type="submit">Submit Address</button>
        </form>
    );
};

export default Address;
