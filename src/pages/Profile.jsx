import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import flat from "../assets/fiat.png"; 
import "../styles/Profile.css";

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(flat);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    landmark: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setFormData({
            fullName: userData.fullName || "Guest User",
            role: userData.role || "User",
            email: userData.email || user.email,
            number: userData.number || user.number,
            address: userData.address || "",
            state: userData.state || "",
            landmark: userData.landmark || "",
            linkedin: userData.linkedin || "",
            twitter: userData.twitter || "",
            instagram: userData.instagram || "",
          });

          // Load profile image if available
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const imageRef = ref(storage, `profileImages/${user.uid}`);
      try {
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        setProfileImage(downloadURL);

        // Update Firestore with the image URL
        await setDoc(
          doc(db, "users", user.uid),
          { profileImage: downloadURL },
          { merge: true }
        );
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleUploadClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await setDoc(
          userDocRef,
          {
            fullName: formData.fullName,
            email: formData.email,
            number: formData.number,
            address: formData.address,
            state: formData.state,
            landmark: formData.landmark,
            linkedin: formData.linkedin,
            twitter: formData.twitter,
            instagram: formData.instagram,
          },
          { merge: true }
        );
        setIsEditable(false);
        console.log("Profile updated!");
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-img">
          <img
            className="profile-image"
            src={profileImage || flat}
            alt="Profile"
          />
          {isEditable && (
            <>
              <div className="upload-plus" onClick={handleUploadClick}>
                +
              </div>
              <input
                id="hiddenFileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        <div className="profile-section">
          <div className="profile-intro">
            <h1 className="profile-name">{formData.fullName}</h1>
            <p className="profile-title">{formData.role}</p>
          </div>

          <h2>About Me</h2>
          <textarea
            className="about-me"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleInputChange}
            disabled={!isEditable}
          />

          <div className="contact-socials-container">
            <div className="flex-row">
              <div className="flex-column">
                <label>Full Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div className="flex-column">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>Phone</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>Twitter</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="flex-column">
              <label>Instagram</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            {isEditable && (
              <button onClick={handleSaveClick} className="save-button">
                Save
              </button>
            )}
            {!isEditable && (
              <button onClick={handleEditClick} className="edit-button">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
