import React from "react";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import Product from "./Product/Product";
import useStyles from "./styles";
import vid from "../../assets/80Comp.mp4";
import "./style.css";





const Products = ({ products, onAddToCart, loaded }) => {
  const LetsShop = () => (
    <div className="title">
            Let's Shop
            <a href="#products">
              <ExpandCircleDownIcon className="expandmore" />
            </a>
          </div>
  );

  const Spinner = () => (
    <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
    );

  const classes = useStyles();
  return loaded ? (
    <div className="video">
      <video
        playsInline="1"
        height="100%"
        width="100%"
        autoPlay="1"
        loop="1"
        muted="1"
        controls=""
      >
        <source src={vid} />
        <p className="warning">Your browser does not support HTML5 video.</p>
      </video>

      <main className={classes.content}>
        {loaded ? <LetsShop /> : <Spinner />}
        <div id="products"></div>
        <Grid container justifyContent="center" spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  ) : (
    <Spinner />
  );
};

export default Products;
