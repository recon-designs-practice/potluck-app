import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { auth, signOut } from "../../firebase";
import { Button, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { LogoutRounded as LogOutIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/AddRounded";
import AddEventModal from "./AddEventModal";

type Props = {
  children?: React.ReactNode;
};

const StyledHeader = styled("header")`
  box-sizing: border-box;
  position: relative;
  padding: 20px 20px;

  @media (min-width: 600px) {
    padding: 32px 40px;
  }

  @media (min-width: 900px) {
    padding: 40px 80px;
  }
`;

const StyledButton = styled(Button)`
  align-self: center;
`;

const ButtonWrapper = styled("div")`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: none;

  @media (min-width: 900px) {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 20px;
  }
`;

const MenuIconWrapper = styled("div")`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;

  @media (min-width: 900px) {
    background: green;
    display: none;
  }
`;

export default function Header({ children }: Props) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = React.useState(false);
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User has signed out.");
        setCurrentUser(null);

        navigate("/log-in");
      })
      .catch((error) => console.log(error.code, error.message));
  };

  return (
    <StyledHeader>
      {children ? (
        children
      ) : (
        <Grid container spacing={2}>
          <Grid xs={9} md={6}>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {currentUser ? currentUser.user_name : "Welcome"}
              </Typography>
            </div>
          </Grid>
          <Grid xs={3} md={6}>
            {currentUser && (
              <ButtonWrapper>
                <StyledButton
                  onClick={() =>
                    setIsNewEventModalOpen((prevState) => !prevState)
                  }
                  variant="contained"
                  style={{ fontWeight: "bold" }}
                >
                  Add event
                </StyledButton>
                <StyledButton
                  onClick={handleSignOut}
                  variant="outlined"
                  style={{ fontWeight: "bold" }}
                >
                  Log out
                </StyledButton>
              </ButtonWrapper>
            )}
            <MenuIconWrapper>
              {currentUser && (
                <>
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    color="primary"
                    fontSize="large"
                    // onClick={handleAddEvent}
                    onClick={() =>
                      setIsNewEventModalOpen((prevState) => !prevState)
                    }
                  />
                  <LogOutIcon
                    style={{ cursor: "pointer" }}
                    color="primary"
                    onClick={handleSignOut}
                  />
                </>
              )}
            </MenuIconWrapper>
          </Grid>
        </Grid>
      )}
      <AddEventModal
        isModalOpen={isNewEventModalOpen}
        closeModal={() => setIsNewEventModalOpen((prevState) => !prevState)}
      />
      {/* <Dialog
        onClose={() => setIsNewEventModalOpen((prevState) => !prevState)}
        open={isNewEventModalOpen}
      >
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => alert("list item click fired")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => alert("list item click fired")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog> */}
    </StyledHeader>
  );
}
