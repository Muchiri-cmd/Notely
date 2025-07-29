import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Navbar } from "../components";
import React, { useState } from "react";
import { useGetUser } from "../queries/user";
import { useEffect } from "react";
import { useUpdateUser } from "../mutations/user";
import { useUpdatePassword } from "../mutations/auth";
import BackButton from "../components/BackButton";

const UserProfile = () => {
  const { data } = useGetUser();
  const {
    mutateAsync: updateUser,
    isError,
    isPending,
    error,
    isSuccess,
  } = useUpdateUser();
  const {
    mutateAsync: updatePassword,
    isPending: PasswordPending,
    isError: PasswordIsError,
    error: PasswordError,
    isSuccess: PasswordSuccess,
  } = useUpdatePassword();

  const [previewUrl, setPreviewUrl] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (data) {
      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        userName: data.userName || "",
        email: data.email || "",
      });

      if (data.avatar) {
        setPreviewUrl(data.avatar);
        setProfilePic(data.avatar);
      }
    }
  }, [data]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    setIsUploading(true);

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const avatarUrl = data.secure_url;
      setProfilePic(avatarUrl);
      setPreviewUrl(avatarUrl);
    } catch (error: any) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();
    const updateData: any = {
      ...userData,
    };

    if (profilePic) {
      updateData.avatar = profilePic;
    } else {
      updateData.avatar = "";
    }

    await updateUser(updateData);
    window.location.reload();
  };

  const handlePasswordUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    updatePassword({
      current_password: passwords.currentPassword,
      password: passwords.newPassword,
    });
  };

  const initials = `${userData.firstName[0] ?? ""}${userData.lastName[0] ?? ""}`;

  return (
    <>
      <Navbar />
      <BackButton />
      <Box sx={{ py: 1, px: 2, maxWidth: "1600px", mx: "auto" }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ mb: 8 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Update User Info
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={previewUrl || undefined}
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "primary.main",
                    fontSize: 24,
                  }}
                >
                  {!previewUrl && initials}
                </Avatar>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    component="label"
                    disabled={isUploading}
                    startIcon={
                      isUploading ? <CircularProgress size={16} /> : undefined
                    }
                  >
                    {isUploading ? "Uploading..." : "Upload Photo"}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>

                  {previewUrl && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setPreviewUrl("");
                        setProfilePic("");
                      }}
                    >
                      Remove Photo
                    </Button>
                  )}
                </Stack>
              </Stack>

              <TextField
                label="First Name"
                fullWidth
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                fullWidth
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
              <TextField
                label="Username"
                fullWidth
                value={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              {isError && (
                <Alert severity="error" sx={{ width: "100%", mt: 1 }}>
                  {(error as any)?.response?.data?.errors?.[0]?.message ||
                    (error as any)?.response?.data?.error ||
                    (error as any)?.message ||
                    "Something went wrong"}
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success" sx={{ width: "100%", mt: 1 }}>
                  Update successful!
                </Alert>
              )}
              <Box mt="auto">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleUpdate}
                  sx={{ bgcolor: isPending ? "grey.500" : "primary.main" }}
                >
                  {isPending ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: "white", mr: 1 }}
                      />
                      Updating
                    </>
                  ) : (
                    "Update User"
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>

              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
              {PasswordIsError && (
                <Alert severity="error" sx={{ width: "100%", mt: 1 }}>
                  {(PasswordError as any)?.response?.data?.errors?.[0]
                    ?.message ||
                    (PasswordError as any)?.response?.data?.error ||
                    (PasswordError as any)?.message ||
                    "Something went wrong"}
                </Alert>
              )}
              {PasswordSuccess && (
                <Alert severity="success" sx={{ width: "100%", mt: 1 }}>
                  Update successful!
                </Alert>
              )}
              <Box mt="auto">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePasswordUpdate}
                >
                  {PasswordPending ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: "white", mr: 1 }}
                      />
                      Updating Password
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserProfile;
