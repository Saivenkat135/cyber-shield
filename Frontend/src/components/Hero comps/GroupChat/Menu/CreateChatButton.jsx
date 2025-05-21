import { useState } from "react";
import { Box, Button, Fab, Menu, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateChatButton = ({ email }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [emails, setEmails] = useState([""]);
    
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (group) => {
        setIsGroup(group);
        setEmails([""]); // Reset emails
        setModalOpen(true);
        setAnchorEl(null);
    };

    const handleAddEmail = () => {
        setEmails([...emails, ""]);
    };

    const handleEmailChange = (index, value) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const handleSubmit = async () => {
        const payload = {
            creator: email,
            emails: emails,
        };

        try{
            await axios.post('https://safecyber-api.onrender.com/api/',payload).then(res=>{
               if(res.data.success){
                   
               console.log("conversation.jsx : const messages -> ",res.data.msgs)
           
           
            setMessage(res.data.msgs)
               }else{
                 alert("Error : to retrieve getmsg");
               }
                 })                    
         }
         catch(error){
             console.log('Error sending registration request',error);
         }

    };

    return (
        <>
            {/* Floating Button */}
            <Fab onClick={handleMenuClick} sx={styles.fab} color="primary">
                <AddIcon />
            </Fab>

            {/* Menu for selecting chat type */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleOptionClick(true)}>Create a Group</MenuItem>
                <MenuItem onClick={() => handleOptionClick(false)}>Create a Personal Chat</MenuItem>
            </Menu>

            {/* Modal for input */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={styles.modal}>
                    <Typography variant="h6" sx={styles.title}>
                        {isGroup ? "Create a Group" : "Create a Personal Chat"}
                    </Typography>

                    {emails.map((email, index) => (
                        <TextField
                            key={index}
                            label="Enter Email ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                        />
                    ))}

                    {isGroup && (
                        <Button onClick={handleAddEmail} sx={styles.addButton}>
                            + Add another email
                        </Button>
                    )}

                    <Button onClick={handleSubmit} sx={styles.submitButton} variant="contained">
                        Create
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

// CSS-in-JS Styling
const styles = {
    fab: {
        position: "absolute",
        bottom: 90,
        left: 340,
        backgroundColor: "#4CAF50",
        color: "white",
        "&:hover": {
            backgroundColor: "#388E3C",
        },
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "white",
        boxShadow: 24,
        p: 4,
        borderRadius: 3,
    },
    title: {
        marginBottom: 2,
        fontWeight: "bold",
        color: "#333",
    },
    addButton: {
        marginTop: 2,
        color: "#4CAF50",
        fontWeight: "bold",
        textTransform: "none",
    },
    submitButton: {
        marginTop: 3,
        backgroundColor: "#4CAF50",
        color: "white",
        "&:hover": {
            backgroundColor: "#388E3C",
        },
    },
};

export default CreateChatButton;
