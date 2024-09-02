import {Card, Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import DynamicForm from "../components/dynamicForm";
import Header from "../components/header";
import BackToHome from "../components/header/backToHome";
import LoaderModal from "../components/loaderModal";
import QuickLinks from "../components/quickLinks";
import SearchableList from "../components/searchableList";
import withUserDetails from "../hooks/withUserDetails";
import {
  billCategoriesApi,
  billerForCategoriesApi,
  paymentTokenApi,
} from "../redux";
import {toTitleCase} from "../utils/helper";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const query = useQuery();
  const userId = query.get("uId");
  const dispatch = useDispatch();
  const {
    paymentAuthToken,
    paymentTokenApiLoading,
    billCategoriesApiLoading,
    billCategoriesList,
    selectedTab,
    selectedSubBiller,
    billerForCategoriesList,
    billerForCategoriesApiLoading,
  } = useSelector((state) => state.bbpsSlice);

  useEffect(() => {
    if (!paymentAuthToken) {
      dispatch(paymentTokenApi(userId));
    } else {
      dispatch(billCategoriesApi({authToken: paymentAuthToken}));
    }
  }, [paymentAuthToken]);

  useEffect(() => {
    if (billCategoriesList[selectedTab]) {
      const payload = {
        categoryName: billCategoriesList[selectedTab],
      };
      const headers = {
        authToken: paymentAuthToken,
      };
      dispatch(billerForCategoriesApi({payload, headers}));
    }
  }, [selectedTab, billCategoriesList]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BackToHome />
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <Header
              data={billCategoriesList}
              loading={billCategoriesApiLoading}
            />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined" className="p-2">
            <Typography variant="h6" color="primary" className="my-2">
              {toTitleCase(billCategoriesList[selectedTab])} Sub Billers
            </Typography>
            <SearchableList
              data={billerForCategoriesList}
              loading={billerForCategoriesApiLoading}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" className="p-2">
            <Typography variant="h6" color="primary" className="my-2">
              {toTitleCase(selectedSubBiller.billerName)} Biller Form
            </Typography>
            <DynamicForm data={selectedSubBiller?.customerParams || []} />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined" className="p-2">
            <Typography variant="h6" color="primary" className="my-2">
              Quick Links
            </Typography>
            <QuickLinks />
          </Card>
        </Grid>
      </Grid>

      {paymentTokenApiLoading ||
      billCategoriesApiLoading ||
      billerForCategoriesApiLoading ? (
        <LoaderModal />
      ) : null}
    </div>
  );
}

export default withUserDetails(Home);
