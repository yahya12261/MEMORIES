import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { addPost } from "../../../../api";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../../redux/actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [formErrors, setFormErrors] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  const clear = () => {
    setCurrentId(0);
    setFormData({
      Paragraph: "",
      selectedFile: "",
    });
    setFormErrors({});
  };
  const [formData, setFormData] = useState({
    Paragraph: "",
    selectedFile: null,
  });
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      selectedFile: event.target.files[0],
    });
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.Paragraph.trim()) {
      errors.Paragraph = "Paragraph is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const { Paragraph, selectedFile } = formData;
      const fileExt = selectedFile ? selectedFile.name.split(".").pop() : null;
      try {
        await addPost(Paragraph, selectedFile, fileExt);

        dispatch(getPosts());

        console.log("Post added successfully!");
        setFormData({
          Paragraph: "",
          selectedFile: null,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{"Creating a Memory"}</Typography>

        <TextField
          name="Paragraph"
          variant="outlined"
          label="Paragraph"
          fullWidth
          multiline
          rows={4}
          value={formData.Paragraph}
          onChange={(e) =>
            setFormData({ ...formData, Paragraph: e.target.value })
          }
          error={formErrors.Paragraph ? true : false}
          helperText={formErrors.Paragraph}
        />
        <div className={classes.fileInput}>
          <label htmlFor="selectedFile">Image:</label>
          <input
            type="file"
            id="selectedFile"
            name="selectedFile"
            onChange={handleFileChange}
          />
        </div>
        {formErrors.selectedFile && (
          <Typography variant="body2" color="error">
            {formErrors.selectedFile}
          </Typography>
        )}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
