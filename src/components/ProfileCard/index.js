import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  return (
    <div className="profile-card-bg-container">
      <img
        src="https://res.cloudinary.com/nihars3/image/upload/v1642694540/My%20pics/ProfilePictureMaker_xhc1gm.png"
        className="profile-image"
        alt="profile"
      />
      <h1 className="profile-name">Dodagatta Nihar</h1>
      <p className="designation">MERN Stack and Humour Developer</p>
    </div>
  )
}

export default ProfileCard
