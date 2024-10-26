import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import BusinessDetail from "./components/BusinessDetail";
import UserDetail from "./components/UserDetail";


function App() {
  const [auth, setAuth] = useState(null);
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    attemptLoginWithToken();
    fetchReviews();
    fetchBusinesses();
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('/api/users'); // Ensure this matches your API endpoint
      const json = await response.json();
      if (response.ok) {
        setUsers(json); // Update users state
      } else {
        console.error("Failed to fetch users:", json);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };


  //Fetch Reviews
  const fetchReviews = async () => {
    const response = await fetch('/api/reviews'); // Fetch reviews from the API
    const json = await response.json();
    if (response.ok) {
      setReviews(json); // Update reviews state
    }
  };
//Fetch
  const fetchBusinesses = async () => {
    const response = await fetch('/api/businesses');
    const json = await response.json();
    if (response.ok) {
      setBusinesses(json);
    }
  }


  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      await attemptLoginWithToken();
      navigate("/");
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth(null);
    navigate("/");
  };
return (
  <>
    <h1>Acme Business Reviews</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/businesses">Businesses ({businesses.length})</Link>
      <Link to="/users">Users ({users.length})</Link>
      {!auth && <Link to="/login">Login</Link>}
      {!auth && <Link to="/signup">Signup</Link>}
      {auth && (
        <>
          <Link to="/createReview">Create Review</Link>
          <button onClick={logout}>Logout {auth.username}</button>
        </>
      )}
    </nav>

    <Routes>
      <Route
        path="/"
        element={
          <Home
            authAction={authAction}
            auth={auth}
            businesses={businesses}
            users={users}
            reviews={reviews}
          />
        }
      />
      <Route path="/businesses" element={<Businesses businesses={businesses} />} />
      <Route path="/businesses/:id" element={<BusinessDetail />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/users" element={<Users users={users} />} />
      <Route path="/login" element={<Login setAuth={setAuth} />} />
      <Route path="/signup" element={<Register setAuth={setAuth} />} />
      <Route
        path="/createReview"
        element={
          auth ? (
            <CreateReview
              businessId={selectedBusiness?.id}
              userId={auth.id}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  </>
);
}

export default App;