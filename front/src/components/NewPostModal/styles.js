import { colors } from "../../theme";

export const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  },
  //style for font size
  resize: {
    minHeight: 40,
    backgroundColor: colors.darkGrey
  },
  title: {
    paddingBottom: 0
  }
});
