import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/bookings/";

const emptyForm = {
  mobile: "",
  hall_name: "",
  name: "",
  email: "",
  booking_date: "",
  start_time: "",
  end_time: "",
  purpose: "",
  rent: 0,
  additional_charges: 0,
  total: 0,
  remark: "",
  receipt_no: "",
  receipt_date: "",
};

function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    updated.total =
      Number(updated.rent || 0) +
      Number(updated.additional_charges || 0);

    setFormData(updated);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `${API_URL}update/${editingId}/`
      : `${API_URL}create/`;

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Something went wrong!");
      return;
    }

    setEditingId(null);
    setFormData(emptyForm);
    fetchBookings();
  };

  /* ================= EDIT ================= */
  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setFormData({
      ...booking,
      booking_date: booking.booking_date || "",
      start_time: booking.start_time || "",
      end_time: booking.end_time || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    await fetch(`${API_URL}delete/${id}/`, {
      method: "DELETE",
    });
    fetchBookings();
  };

  return (
    <div className="page">
      <h1>Hall Booking System</h1>

      {/* ================= FORM ================= */}
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>* Mobile No.
            <input name="mobile" value={formData.mobile} onChange={handleChange} />
          </label>

          <label>* Hall Name
            <select name="hall_name" value={formData.hall_name} onChange={handleChange}>
              <option value="">-- Select Option --</option>
              <option value="Conference Hall">Conference Hall</option>
              <option value="Main Hall">Main Hall</option>
            </select>
          </label>

          <label>* Applicant Name
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>* Email
            <input name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>* Booking Date
            <input type="date" name="booking_date" value={formData.booking_date} onChange={handleChange} />
          </label>

          <label>* Start Time
            <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} />
          </label>

          <label>* End Time
            <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} />
          </label>

          <label>* Purpose
            <input name="purpose" value={formData.purpose} onChange={handleChange} />
          </label>

          <label>* Rent
            <input type="number" name="rent" value={formData.rent} onChange={handleChange} />
          </label>

          <label>Additional Charges
            <input type="number" name="additional_charges" value={formData.additional_charges} onChange={handleChange} />
          </label>

          <label>* Total
            <input type="number" value={formData.total} disabled />
          </label>

          <label>* Remark
            <textarea name="remark" value={formData.remark} onChange={handleChange} />
          </label>

          <label>* Receipt No.
            <input name="receipt_no" value={formData.receipt_no} onChange={handleChange} />
          </label>

          <label>* Receipt Date
            <input type="date" name="receipt_date" value={formData.receipt_date} onChange={handleChange} />
          </label>
        </div>

        <button className="submit-btn">
          {editingId ? "Update Booking" : "Submit"}
        </button>
      </form>

      {/* ================= CARDS ================= */}
      <div className="cards">
        {bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <h3>{b.hall_name}</h3>

            <p><b>Name:</b> {b.name}</p>
            <p><b>Mobile:</b> {b.mobile}</p>
            <p><b>Email:</b> {b.email}</p>
            <p><b>Date:</b> {b.booking_date}</p>
            <p><b>Time:</b> {b.start_time} - {b.end_time}</p>
            <p><b>Purpose:</b> {b.purpose}</p>
            <p><b>Total:</b> ₹{b.total}</p>

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