import React, { useState } from "react";
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
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

interface arrtype {
  id: string;
  title: string;
  link: string;
  imgURL: string;
  __typename: string;
}

const GET_BOOKMARKS = gql`
  {
    bookmarks {
      id
      title
      link
      imgURL
    }
  }
`;

const ADD_BOOKMARK = gql`
  mutation addBookmark($title: String!, $link: String!, $imgURL: String!) {
    addBookmark(title: $title, link: $link, imgURL: $imgURL) {
      title
      link
      imgURL
    }
  }
`;

const DELETE_BOOKMARK = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`;

const IndexPage = () => {
  let [titleValue, setTitleValue] = useState("");
  let [linkValue, setLinkValue] = useState("");
  let [imgValue, setImgValue] = useState("");
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK);

  const addNewBookmark = () => {
    addBookmark({
      variables: {
        title: titleValue,
        link: linkValue,
        imgURL: imgValue,
      },
      refetchQueries: [{ query: GET_BOOKMARKS }],
    });
    setTitleValue("");
    setLinkValue("");
    setImgValue("");
  };

  const delBookmark = (id: string) => {
    deleteBookmark({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_BOOKMARKS }],
    });
  };

  const { loading, error, data } = useQuery(GET_BOOKMARKS);
  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  console.log(data);
  return (
    <div>
      <title>Bookmarking App</title>
      <Container maxWidth="xs" className={styles.topContainer}>
        <Typography className={styles.title}>Enter New Bookmark</Typography>
        <TextField
          type="text"
          fullWidth
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          className={styles.textField}
          id="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          type="text"
          fullWidth
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          className={styles.textField}
          id="url"
          label="Link"
          variant="outlined"
        />
        <TextField
          type="text"
          fullWidth
          value={imgValue}
          onChange={(e) => setImgValue(e.target.value)}
          className={styles.textField}
          id="image"
          label="Image"
          variant="outlined"
        />
        <Button
          onClick={addNewBookmark}
          className={styles.btn}
          variant="contained"
        >
          Add
        </Button>
      </Container>
      <Container className={styles.bookmarkContainer} maxWidth="md">
        <Box className={styles.textCenter}>
          <Typography className={styles.title}>Your Bookmarks</Typography>
        </Box>
        <Grid container spacing={3}>
          {data &&
            data.bookmarks.map((bookmark: arrtype) => {
              return (
                <Grid key={bookmark.id} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={bookmark.imgURL}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography
                          className={styles.title}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {bookmark.title}
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
                        <a href={bookmark.link}>Visit</a>
                      </Button>
                      <Button
                        className={styles.btn}
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => delBookmark(bookmark.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default IndexPage;
