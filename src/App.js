import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  const [allCountry, setAllCountry] = useState([]);
  useEffect(() => {
    getAllCountry();
    console.log(allCountry, "allCountry...............");
  }, []);
  const getAllCountry = async () => {
    let data = await fetch("https://restcountries.com/v3.1/all");
    data = await data.json();
    setAllCountry(data);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "15px",
          marginTop: "5%",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        {allCountry.length > 0 &&
          allCountry.map((el, i) => {
            return (
              <>
                <>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={el.flags.png}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        {el.name.common}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          Population:
                          <span
                            style={{
                              fontSize: "smaller",
                              color: "grey",
                            }}
                          >
                            {el.population}
                          </span>
                        </span>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default App;
