import React from "react";
import PropTypes from "prop-types";
import { JsonDcm, QueryDicomImage, ServerErrorsString } from "../../common";
import SnackMessage from "../SnackMessage";
import { Box, CircularProgress, Grid, TextField } from "@mui/material";
class MetaInformationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      slice: null,
    };
  }
  componentDidMount() {
    this.handleQuerySlice();
  }
  handleQuerySlice = () => {
    const { loading } = this.state;
    if (loading) return;
    this.setState({ loading: true });
    (async () => {
      QueryDicomImage(1, 0)
        .then((res) => {
          const slice = new JsonDcm(JSON.parse(res.data));
          this.setState({ loading: false, slice });
        })
        .catch((error) => {
          this.setState({ loading: false, error: ServerErrorsString(error) });
        });
    })();
  };
  handleCloseSnak = () => {
    this.setState({ error: "" });
  };
  render() {
    const { error, slice, loading } = this.state;
    let Component = (
      <Grid item>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Grid>
    );
    if (slice && !loading) {
      const { metadata } = slice;
      Component = Object.keys(metadata).map((key) => (
        <Grid item key={key}>
          <TextField
            label={key}
            defaultValue={metadata[key]}
            variant="outlined"
            margin="normal"
          />
        </Grid>
      ));
    }
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          {Component}
        </Grid>
        <SnackMessage
          handleClose={this.handleCloseSnak}
          message_text={error !== "" ? error : "Unknown warning"}
          open={error && error !== "" ? true : false}
          type="error"
        />
      </React.Fragment>
    );
  }
}

MetaInformationContainer.propTypes = {
  classes: PropTypes.object,
};

export default MetaInformationContainer;
