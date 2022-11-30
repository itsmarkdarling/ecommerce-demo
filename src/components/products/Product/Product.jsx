import React, { useState } from "react";
// import { Link, Route, Routes } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Modal,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

import useStyles from "./styles";

const Product = ({ product, onAddToCart, handleAddToCart }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const CartMessage = () => (
  //   <Modal onClose={handleClose}>
  //     <div>
  //       <Paper>
  //         <Typography variant="h5">Added to Cart</Typography>
  //         <CloseIcon onClick={handleClose} className={classes.close} />
  //       </Paper>
  //     </div>
  //   </Modal>
  // );

  const ProductDetails = () => (
    <Modal className={classes.modal} open={open} onClose={handleClose} aria-labelledby="Product Details">
      <div>
        <Paper className={classes.paper}>
          <Container className={classes.container} elevation={8}>
            <CloseIcon onClick={handleClose} className={classes.close} />
            <CardMedia
              className={classes.media}
              image={product.image.url}
              title={product.name}
            ></CardMedia>
            <CardContent>
              <div className={classes.cardContent}>
                <Typography variant="body2" gutterBottom>
                  {product.name}
                </Typography>
              </div>
              <Typography
                dangerouslySetInnerHTML={{ __html: product.description }}
                variant="body2"
                color="textSecondary"
              />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
              <Typography variant="body1">
                {product.price.formatted_with_symbol}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                aria-label="Add to Cart"
                onClick={() => {
                  onAddToCart(product.id, 1);
                  handleClose();
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Container>
        </Paper>
      </div>
    </Modal>
  );

  return open ? (
    <ProductDetails />
  ) : (
    <Card className={classes.root} elevation={8}>
      <CardMedia
        onClick={handleOpen}
        className={classes.mediaBeforeClick}
        image={product.image.url}
        title={product.name}
      ></CardMedia>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="body1" gutterBottom>
            {product.name}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Typography variant="body1">
          {product.price.formatted_with_symbol}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onAddToCart(product.id, 1)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
