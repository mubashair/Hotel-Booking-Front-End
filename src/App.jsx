
import './App.css'
import BookingForm from './Components/BookingForm'
import BookingList from './Components/BookingList';
import Hello from './Components/Hello'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  

  return (
    <>
      <div className="App">
            <header className="bg-primary text-white text-center py-3">
                <h1>Hotel Booking System</h1>
            </header>
            <BookingForm />
            <BookingList/>
        </div>
    </>
  )
}

export default App
