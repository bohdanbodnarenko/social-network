import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { getLinkToUserAvatar } from "../../utils/requests";

const styles = {
  card: {
    maxWidth: 345,
    margin: 20
  },
  media: {
    height: 140
  }
};

const SingleUser = props => {
  const { classes, user } = props;
  return (
    <Card className={classes.card}>
      <Link to={`/user/${user._id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              user.photo
                ? getLinkToUserAvatar(user._id)
                : "https://www.gravatar.com/avatar?d=mp&s=500"
            }
            title={user.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>
            <Typography component="p">{user.email}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Link to={`/messages/${user._id}`}>
          <Button size="small" >
            Message
          </Button>
        </Link>
        <Link to={`/user/${user._id}`}>
          <Button size="small" >
            Profile
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(SingleUser);
