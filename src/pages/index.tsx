import React from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";
import styles from "./index.module.css";
import GatsbyImag from "../images/icon.png";

const IndexPage = () => {
  return (
    <div>
      <title>Bookmarking App</title>
      <Container maxWidth="xs" className={styles.topContainer}>
        <Typography className={styles.title}>Enter New Bookmark</Typography>
        <TextField
          type="text"
          fullWidth
          className={styles.textField}
          id="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          type="text"
          fullWidth
          className={styles.textField}
          id="url"
          label="Link"
          variant="outlined"
        />
        <TextField
          type="text"
          fullWidth
          className={styles.textField}
          id="image"
          label="Image"
          variant="outlined"
        />
        <Button className={styles.btn} variant="contained">
          Add
        </Button>
      </Container>
      <Container className={styles.bookmarkContainer} maxWidth="md">
        <Box className={styles.textCenter}>
          <Typography className={styles.title}>Your Bookmarks</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={GatsbyImag}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    className={styles.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Lizard
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  className={styles.linkBtn}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <a href="#">Learn More</a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={GatsbyImag}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    className={styles.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Lizard
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  className={styles.linkBtn}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <a href="#">Learn More</a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={GatsbyImag}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    className={styles.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Lizard
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  className={styles.linkBtn}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <a href="#">Learn More</a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={GatsbyImag}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    className={styles.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Lizard
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  className={styles.linkBtn}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <a href="#">Learn More</a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default IndexPage;
