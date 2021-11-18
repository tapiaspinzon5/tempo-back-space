import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ContentBox = styled(Box)`
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  margin: "15px 15px 15px 25px";
`;

export const DescriptionCard = () => {
  return (
    <>
      <ContentBox component="main">
        <Card sx={{ maxWidth: "100vw", bgcolor: "#F0F0F0", mb: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="Image Name"
            />
          </CardActionArea>
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ mt: "5px" }}>
            <Typography variant="h2">Game Title</Typography>
            <Typography variant="h4">About</Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            container
            direction="column"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              sx={{
                width: "100%",
                color: "#000000",
                backgroundColor: "#BDBDBD",
              }}
            >
              Button
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Card sx={{ maxWidth: "100vw", bgcolor: "#F0F0F0" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="Image Name"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Image Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus officia rem earum? Explicabo est veritatis aliquid
                    necessitatibus ratione inventore fugiat ad nam maxime
                    consectetur recusandae enim, deleniti minus iste! Hic?
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={2}>
            <Card sx={{ maxWidth: "100vw", bgcolor: "#F0F0F0" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="Image Name"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Image Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus officia rem earum? Explicabo est veritatis aliquid
                    necessitatibus ratione inventore fugiat ad nam maxime
                    consectetur recusandae enim, deleniti minus iste! Hic?
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={2}>
            <Card sx={{ maxWidth: "100vw", bgcolor: "#F0F0F0" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="Image Name"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Image Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus officia rem earum? Explicabo est veritatis aliquid
                    necessitatibus ratione inventore fugiat ad nam maxime
                    consectetur recusandae enim, deleniti minus iste! Hic?
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </ContentBox>
    </>
  );
};
