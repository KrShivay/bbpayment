import {CircularProgress, Grid, Tab, Tabs, tabsClasses} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import bbps from "../../assets/BBPS/Bharat_connect.svg";
import bbpsImages from "../../assets/bbpsImages";
import {setSelectedTab} from "../../redux";

const availableImages = [
  "broadbandpostpaid",
  "cable",
  "dth",
  "educationloan",
  "gas",
  "insurance",
  "loan",
  "mobilepostpaid",
  "retail",
  "utilitybill",
  "electricity",
];

export default function Header({data, loading}) {
  const {selectedTab} = useSelector((state) => state.bbpsSlice);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={3}>
        <img src={bbps} alt="bbps" />
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="Bbps Tabs"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          indicatorColor="primary"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              color: "#4a5daa",
              scale: "2",
              "&.Mui-disabled": {opacity: 1},
              "&.Mui-selected": {border: 0},
            },
          }}
        >
          {data?.map((i, idx) => {
            const imageName = i.replace(/\s+/g, "").toLowerCase();
            const imageSrc = availableImages.includes(imageName)
              ? bbpsImages[imageName]
              : bbpsImages.default;

            return (
              <Tab
                // label={i}
                key={idx}
                className={`uppercase text-center transition-all duration-500 ${
                  selectedTab === idx ? "!bg-primary-dark" : "!bg-primary"
                }`}
                icon={
                  <div
                    className="flex flex-col items-center justify-around"
                    style={{minHeight: "7rem"}}
                  >
                    <img
                      src={imageSrc}
                      alt={i}
                      className="w-14 bg-red-400"
                      style={{
                        borderRadius: "50%",
                        color: "#fff",
                        // filter: "invert(0.8) sepia(1) hue-rotate(200deg)",
                      }}
                    />
                    <span>{i}</span>
                  </div>
                }
                style={{
                  minWidth: "10rem",
                  minHeight: "7rem",
                  maxWidth: "10rem",
                  maxHeight: "7rem",
                  width: "10rem",
                  height: "7rem",
                  margin: 5,
                  borderRadius: 10,
                  color: "#fff",
                }}
              />
            );
          })}
        </Tabs>
      </Grid>
    </Grid>
  );
}
