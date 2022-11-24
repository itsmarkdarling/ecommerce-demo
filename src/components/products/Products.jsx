import React from "react";
import { Grid } from "@material-ui/core";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import Product from "./Product/Product";
import useStyles from "./styles";
import vid from "../../assets/80Comp.mp4";
import "./style.css";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  return (
    <div className="video">
      <video height="100%" width="100%" autoplay="1" loop="1" muted="1" controls="">
        <source src={vid} />
        <p class="warning">Your browser does not support HTML5 video.</p>
      </video>

      <main className={classes.content}>
        <div className="title">
            Let's Shop
        <ExpandCircleDownIcon className="expandmore" />
        </div>
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

function stick() {
    var stickies = document.querySelectorAll(".sticky");

    for (var i = 0; i < stickies.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = stickies[i].getBoundingClientRect().top;
      var elementVisible = 20;
  
      if (elementTop < windowHeight - elementVisible) {
        stickies[i].classList.add("active");
      } else {
        stickies[i].classList.remove("active");
      }
    }
}

export default Products;
