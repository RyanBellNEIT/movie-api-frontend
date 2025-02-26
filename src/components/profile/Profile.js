import React, { useEffect } from 'react';
import './Profile.css';
import {useAuth} from '../../api/AuthProvider';
import img from '../../placeholderImages/placeholder.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {

    const { user } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="profile-info">
                    <img className='profile-image' src={img} alt="Profile"></img>
                    <div className="profile-text">
                        <h2>{user.email}</h2>
                        <h2>{user.birthDate}</h2>
                    </div>
                    <FontAwesomeIcon icon={faGear} id="settings-icon"/>
                </div>
                <div className="profile-favorite-movies">
                    <Carousel infiniteLoop slidesToShow={3} centerMode={true}>
                        <div>
                            <h2>Movie1</h2>
                        </div>
                        <div>
                            <h2>Movie2</h2>
                        </div>
                        <div>
                            <h2>Movie3</h2>
                        </div>
                    </Carousel>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Profile;