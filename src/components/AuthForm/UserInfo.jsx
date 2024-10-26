
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function useGetUserData() {
    const { token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        avatar: "",
    });
    const [initialData, setInitialData] = useState({
        name: "",
        email: "",
        gender: "",
        avatar: "",
    });

    useEffect(() => {
      if (token) {
        fetch(`https://dark-side-of-the-app01.onrender.com/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200) {
              const { name, email, gender } = data.data;
  
              setFormData((prevData) => ({
                ...prevData,
                name: name,
                email: email,
                gender: gender
                  ? gender === "female"
                    ? "Woman"
                    : "Man"
                  : "Woman",
              }));
  
              setInitialData({
                name: name,
                email: email,
                gender: gender
                  ? gender === "female"
                    ? "Woman"
                    : "Man"
                  : "Woman",
              });
            } else {
              console.error("Failed to fetch user data");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    }, [ token]); // Додати `token` у масив залежностей
  
    return { formData, initialData };
  }