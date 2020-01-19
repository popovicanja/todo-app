import React, { useState } from 'react'
import { Grid, Button, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './style.module.css'
import uuidv4 from 'uuid/v4'
import Alert from '@material-ui/lab/Alert'

export default function TodoForm({ closeForm, showOrHide, addTodo }) {

    const showOrHideClassName = showOrHide ? "modal display-block" : "modal display-none";

    const [formData, setFormData] = useState(getEmptyTodo());
    const [open, setOpen] = React.useState(false);

    function getEmptyTodo() {
      return ({
        id: uuidv4(),
        name: '',
        description: '',
        complete: false
      });
    }

    function handleSaveClick() {
      if (isFormValid()) {
        addTodo(formData)
        setFormData(getEmptyTodo())
        closeForm()
      } else {
        setOpen(true)
      }
    }

    function clearAndCloseForm() {
      setFormData(getEmptyTodo())
      closeForm()
    }

    function isFormValid() {
      return formData["name"];
    }

    function handleInputChange(event) {
      const {name, value} = event.target
      setFormData({...formData, [name]: value})
    }

    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    return (
      <div className={showOrHideClassName}>
        <section className="modal-main">
            <Grid
                className={styles.header}
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <div className={styles.title}>Create Todo</div>
                <i className={'material-icons ' + styles.cancelIcon} onClick={clearAndCloseForm}>close</i>
            </Grid>
            <div className={styles.content}>
              <form noValidate autoComplete="off">
              <Grid
                  container
                  direction="column">

                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}/>

                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={styles.mt24}
                    multiline
                    rowsMax="4"/>
                
              </Grid>

            </form>
            </div>
            <Grid className={styles.actions}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center">
                <Button variant="contained" 
                        className={`${styles.btn} ${styles.cancelBtn} ${styles.mt16}`}
                        onClick={clearAndCloseForm}>
                  Cancel
                </Button>
                <Button variant="contained"
                        onClick={handleSaveClick}
                        className={`${styles.btn} ${styles.saveBtn}`}>
                  Save
                </Button>
            </Grid>
        </section>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Field Name is required!
          </Alert>
        </Snackbar>
      </div>
    )
}
