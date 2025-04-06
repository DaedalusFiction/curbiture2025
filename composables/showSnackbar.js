export default function useSnackbar(message) {
  const snackbarMessage = useState("snackbarMessage");
  const snackbarShowing = useState("snackbarShowing");

  const handleShowSnackbar = () => {
    snackbarMessage.value = message || "no message";
    snackbarShowing.value = true;
    setTimeout(() => {
      snackbarShowing.value = false;
    }, 5000);
  };
  handleShowSnackbar();
}
