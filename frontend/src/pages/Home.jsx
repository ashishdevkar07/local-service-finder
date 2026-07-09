import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    const categories = [
        { id: 1, name: "Plumber", icon: "🔧" },
        { id: 2, name: "Electrician", icon: "⚡" },
        { id: 3, name: "Cleaning", icon: "🧹" },
        { id: 4, name: "Carpenter", icon: "🪚" },
        { id: 5, name: "Painting", icon: "🎨" },
        { id: 6, name: "AC Repair", icon: "❄️" },
        { id: 7, name: "Appliance Repair", icon: "🔌" }
    ]

    return (
        <div>
            {/* Hero Section */}
            <div className="hero">
                <h1>Find Trusted Local Services</h1>
                <p>Book verified professionals for plumbing, electrical, cleaning and more - right at your doorstep.</p>
                <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => navigate("/services")}>
                        Explore Services
                    </button>
                </div>
            </div>

            {/* Categories Section */}
            <div className="categories-section">
                <h2>What are you looking for?</h2>
                <p>Choose a service category to find the best professionals near you</p>
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card"
                            onClick={() => navigate("/services")}
                        >

                            <span className="category-icon">{cat.icon}</span>
                            <p>{cat.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home