import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";

const SearchSection = (props,state) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    const [room, setRoom] = useState(0);

    const [searchActive, setSearchState] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (!startDate || !endDate || adult <= 0 || child < 0 || room <= 0) {
            toast.error("Please fill neccessary details")
            return ;
        }
       
        // Redirect to search results
      // Redirect to search results with state
      navigate("/search-result", {
        state: {
            startDate,
            endDate,
            adult,
            child,
            room
        }
    });
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const adultIncrementCount = () => {
        setAdult(adult + 1);
    };
    const adultDecrementCount = () => {
        if (adult > 0) setAdult(adult - 1);
    };

    const childIncrementCount = () => {
        setChild(child + 1);
    };
    const childDecrementCount = () => {
        if (child > 0) setChild(child - 1);
    };

    const roomIncrementCount = () => {
        setRoom(room + 1);
    };
    const roomDecrementCount = () => {
        if (room > 0) setRoom(room - 1);
    };

    return (
        <div className={`wpo-select-section ${props.svClass}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wpo-select-wrap">
                            <div className="wpo-select-area" style={{ borderRadius: '1px' }}>
                                <form className="clearfix" onSubmit={SubmitHandler}>
                                    <div className="select-sub">
                                        <div className="input-group date">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                minDate={new Date()} // Set minimum date to current date
                                            />
                                            <i className="fi flaticon-calendar"></i>
                                        </div>
                                    </div>
                                    <div className="select-sub">
                                        <div className="input-group date">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                minDate={startDate} // Ensure end date is after start date
                                            />
                                            <i className="fi flaticon-calendar"></i>
                                        </div>
                                    </div>
                                    <div className="select-sub">
                                        <div className="form-group tourist-group">
                                            <div className="tourist-group-wrap">
                                                <div className="tourist-inner" onClick={() => setSearchState(!searchActive)}>
                                                    <i className="fi flaticon-user"></i>
                                                    <ul>
                                                        <li><input disabled type="text" id="adults" value={adult} />Adults</li>
                                                        <li><input disabled type="text" id="children" value={child} />Children</li>
                                                        <li><input disabled type="text" id="rooms" value={room} />Room</li>
                                                    </ul>
                                                    <i className={`ti-angle-down ${searchActive ? "rotate" : ""}`}></i>
                                                </div>
                                                <div className={`tourist-dropdown ${searchActive ? "active" : ""}`}>
                                                    <div className="tourist-item">
                                                        <span>Adults</span>
                                                        <div className="tourist-item-group">
                                                            <button type="button" onClick={adultDecrementCount} id="adults_dec">-</button>
                                                            <input disabled id="adults_val" value={adult} type="text" />
                                                            <button type="button" onClick={adultIncrementCount} id="adults_inc">+</button>
                                                        </div>
                                                    </div>
                                                    <div className="tourist-item">
                                                        <span>Children</span>
                                                        <div className="tourist-item-group">
                                                            <button type="button" onClick={childDecrementCount} id="children_dec">-</button>
                                                            <input disabled id="children_val" value={child} type="text" />
                                                            <button type="button" onClick={childIncrementCount} id="children_inc">+</button>
                                                        </div>
                                                    </div>
                                                    <div className="tourist-item">
                                                        <span>Rooms</span>
                                                        <div className="tourist-item-group">
                                                            <button type="button" onClick={roomDecrementCount} id="rooms_dec">-</button>
                                                            <input disabled id="rooms_val" value={room} type="text" />
                                                            <button type="button" onClick={roomIncrementCount} id="rooms_inc">+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="select-sub">
                                        <button type="submit" className="theme-btn" style={{ borderRadius: '1px' }} onClick={ClickHandler}>Check Availability</button>
                                    </div>
                                    <ToastContainer></ToastContainer>
                                </form>
                                {error && <div className="error-message">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSection;
