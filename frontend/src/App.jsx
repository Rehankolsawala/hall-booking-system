import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/bookings/";

function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    hall_name: "",
    date: "",
    start_time: "",
    end_time: "",
    purpose: "",
  });
  const [editingId, setEditingId] = useState(null);

  // GET bookings
  const fetchBookings = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE booking
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}${editingId}/`
      : `${API_URL}create/`;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchBookings();
        setFormData({
          name: "",
          hall_name: "",
          date: "",
          start_time: "",
          end_time: "",
          purpose: "",
        });
        setEditingId(null);
      });
  };

  // DELETE booking
  const handleDelete = (id) => {
    fetch(`${API_URL}${id}/delete/`, {
      method: "DELETE",
    }).then(() => fetchBookings());
  };

  // EDIT booking
  const handleEdit = (booking) => {
    setFormData(booking);
    setEditingId(booking.id);
  };

  return (
    <div className="container">
      <h1>Hall Booking System</h1>

      {/* FORM */}
      <form className="booking-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input name="hall_name" placeholder="Hall Name" value={formData.hall_name} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required />
        <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required />
        <input name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleChange} required />

        <button type="submit">
          {editingId ? "Update Booking" : "Create Booking"}
        </button>
      </form>

      {/* BOOKINGS LIST */}
      <div className="cards">
        {bookings.map((b) => (
          <div className="card" key={b.id}>
            <h3>{b.hall_name}</h3>
            <p><b>Name:</b> {b.name}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.start_time} - {b.end_time}</p>
            <p><b>Purpose:</b> {b.purpose}</p>

            <div className="actions">
              <button className="edit" onClick={() => handleEdit(b)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(b.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
