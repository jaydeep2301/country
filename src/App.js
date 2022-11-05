import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [allCountry, setAllCountry] = useState([]);
  const [region, setregion] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllCountry();
    console.log(allCountry, "allCountry...............");
  }, []);
  const getAllCountry = async () => {
    let data = await fetch("https://restcountries.com/v3.1/all");
    data = await data.json();
    let regions = data.map((el) => el.region);
    setregion(regions);
    setAllCountry(data);
  };
  const sortByPop = async () => {
    console.log("hello........");
    let newdata = allCountry.sort((a, b) => {
      return a.population - b.population;
    });
    console.log(newdata);
    setAllCountry(newdata);
  };
  return (
    <div className="App">
      <nav>
        <button className="btn" onClick={sortByPop}>
          Sort
        </button>
      </nav>
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
            let cur = "none";
            if (el.currencies) {
              let key = Object.keys(el.currencies);
              if (key.length > 0) {
                cur = el.currencies[key[0]].name;
              }
            }
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
                        <div>
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
                                marginLeft: "1%",
                              }}
                            >
                              {el.population}
                            </span>
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            Region:
                            <span
                              style={{
                                fontSize: "smaller",
                                color: "grey",
                                marginLeft: "1%",
                              }}
                            >
                              {el.region}
                            </span>
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            Capital:
                            <span
                              style={{
                                fontSize: "smaller",
                                color: "grey",
                                marginLeft: "1%",
                              }}
                            >
                              {el.capital}
                            </span>
                          </span>
                        </div>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={handleOpen}>
                        More
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            More info
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                  }}
                                >
                                  Native:
                                  <span
                                    style={{
                                      fontSize: "smaller",
                                      color: "grey",
                                      marginLeft: "1%",
                                    }}
                                  >
                                    {el.name.common}
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                  }}
                                >
                                  Sub Region:
                                  <span
                                    style={{
                                      fontSize: "smaller",
                                      color: "grey",
                                      marginLeft: "1%",
                                    }}
                                  >
                                    {el.subregion}
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: "black",
                                  }}
                                >
                                  Currency Name:
                                  <span
                                    style={{
                                      fontSize: "smaller",
                                      color: "grey",
                                      marginLeft: "1%",
                                    }}
                                  >
                                    {cur}
                                  </span>
                                </span>
                              </div>
                            </Typography>
                          </Typography>
                        </Box>
                      </Modal>
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
