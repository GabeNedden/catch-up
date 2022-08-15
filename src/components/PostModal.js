import { useState } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PostModal = ({ currentUser }) => {
  const initialState = {
    title: "",
    body: "",
    sharedWith: [],
    location: {},
    startTime: "",
    endTime: "",
    public: false,
    icon: "",
  };

  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(false);

  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const success = (pos) => {
    setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });

  return (
    <>
      {userLocation && (
        <Wrapper>
          <Center>
            <Display>Share plans with Friends or Groups!</Display>
          </Center>
          <MapWrapper>
            <GoogleMapReact
              onClick={(e) => {
                setClickedLocation(true);
                setValues({ ...values, location: { lat: e.lat, lng: e.lng } });
              }}
              defaultZoom={16}
              defaultCenter={userLocation}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              yesIWantToUseGoogleMapApiInternals
            >
              {clickedLocation && (
                <StyledIcon
                  lat={values.location.lat}
                  lng={values.location.lng}
                  text="My Marker"
                />
              )}
            </GoogleMapReact>
          </MapWrapper>

          <Form onSubmit={onSubmit}>
            <Label>Title</Label>
            <Input
              required
              name="title"
              value={values.title}
              onChange={onChange}
              defaultValue="Title"
            />

            <Label>Body</Label>
            <Input
              name="body"
              value={values.body}
              onChange={onChange}
              defaultValue="Body"
            />

            <Label>Share with</Label>
            <Input
              name="sharedWith"
              value={values.sharedWith}
              onChange={onChange}
              defaultValue=""
            />

            <Center>
              <SubmitButton type="submit" />
            </Center>
          </Form>
          <div style={{ height: "100px" }}></div>
        </Wrapper>
      )}
    </>
  );
};

export default PostModal;

const Wrapper = styled.div`
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  padding: 15px;
  z-index: -1;

  background-color: var(--clr-bg);
  border-radius: 10px;
  height: 100vh;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Display = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: var(--clr-primary);
  margin-bottom: 10px;
`;

const MapWrapper = styled.div`
  width: 90%;
  height: 400px;
  margin: auto;
  margin-bottom: 20px;
`;

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--clr-fg-alt);
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--clr-fg-alt);
  background-color: var(--clr-bg);
`;

const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 3px;
  margin-top: 20px;
  color: white;
  font-size: 14px;
  font-weight: 200;
  color: var(--clr-fg-alt);
`;

const SubmitButton = styled.input`
  background: var(--clr-fg);
  color: var(--clr-bg);
  border-radius: 5px;
  text-transform: uppercase;
  margin-top: 30px;
  padding: 20px;
  font-size: 16px;
  letter-spacing: 8px;
  cursor: pointer;
`;
