import {
  Container,
  Row,
  Col,
  Form,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import "./App.css";
import background from "./images/background5.jpg";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const imgs = {
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "13d": "https://openweathermap.org/img/wn/13d@2x.png",
    "50d": "https://openweathermap.org/img/wn/50d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "10n": "https://openweathermap.org/img/wn/10n@2x.png",
    "11n": "https://openweathermap.org/img/wn/11n@2x.png",
    "13n": "https://openweathermap.org/img/wn/13n@2x.png",
    "50n": "https://openweathermap.org/img/wn/50n@2x.png",
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  const searchLocation = async (e) => {
    try {
      if (e.key === "Enter") {
        let response = await axios.get(url);
        setData(response.data);
        setImage(
          `https://openweathermap.org/img/wn/${response.data.weather.icon}@2x.png`
        );
        console.log(response.data);
        setLocation("");
      }
    } catch (error) {
      toast.error("Invalid city");
    }
  };

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <Container
        style={{
          height: "100%",
        }}
      >
        <Row
          lg={3}
          md={2}
          sm={1}
          xs={1}
          className=" d-flex justify-content-center align-items-center"
        >
          <Col>
            <h1
              className="fw-bold  text-center p-2"
              style={{
                color: "#a7c957",
                fontSize: "3rem",
              }}
            >
              Weather
            </h1>
            <Form.Control
              value={location}
              size="lg"
              type="text"
              placeholder="Enter location"
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                background: "rgba(255, 255,255,0.7)",
              }}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
            />
            {JSON.stringify(data) === "{}" ? (
              ""
            ) : (
              <Card
                className="shadow m-1"
                style={{
                  backgroundColor: "rgb(0 0 0 / 50%)",
                  height: "60%",
                }}
              >
                <Card.Body
                  className="d-flex justify-content-center align-content-center"
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src={imgs[data.weather[0].icon]}
                    style={{
                      height: "13rem",
                      width: "13rem",
                      marginLeft: "20%",
                    }}
                    className="p-2"
                  />
                  <Card.Title
                    className="text-center"
                    style={{ color: "#a7c957", fontSize: "3rem" }}
                  >
                    {data.name}
                  </Card.Title>
                  <Card.Title
                    className="text-center fs-4 fst-italic"
                    style={{ color: "white" }}
                  >
                    {data.weather[0].main}
                  </Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      className="fw-bold "
                      style={{
                        backgroundColor: "rgb(255 255 255 / 11%)",
                        color: "white",
                        borderRadius: "8%",
                      }}
                    >
                      Temperature:{" "}
                      <span
                        className=" fst-italic"
                        style={{
                          color: "#a7c957",
                        }}
                      >
                        {data.main.temp} C˙{" "}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="fw-bold "
                      style={{
                        backgroundColor: "rgb(255 255 255 / 11%)",
                        color: "white",
                        borderRadius: "8%",
                      }}
                    >
                      Feels like:{" "}
                      <span
                        className=" fst-italic"
                        style={{
                          color: "#a7c957",
                        }}
                      >
                        {data.main.feels_like} C˙{" "}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="fw-bold "
                      style={{
                        backgroundColor: "rgb(255 255 255 / 11%)",
                        color: "white",
                        borderRadius: "8%",
                      }}
                    >
                      Wind:{" "}
                      <span
                        className=" fst-italic"
                        style={{
                          color: "#a7c957",
                        }}
                      >
                        {data.wind.speed} km/h{" "}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="fw-bold "
                      style={{
                        backgroundColor: "rgb(255 255 255 / 11%)",
                        color: "white",
                        borderRadius: "8%",
                      }}
                    >
                      Humidity:{" "}
                      <span
                        className="fst-italic"
                        style={{
                          color: "#a7c957",
                        }}
                      >
                        {data.main.humidity}%{" "}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
