const Notification = ({ notification }) => {

  const styles = {
    background: `${
      notification.type === "success"
        ? "rgba(160, 255, 161, 0.14)"
        : "rgba(245, 97, 97, 0.09)"
    }`,
    border: `solid 2px ${
      notification.type === 'success'
        ? "rgba(2, 158, 48, 1)"
        : "rgba(223, 0, 0, 1)"
    }`,
    borderRadius: 5,
    padding: 5,
    margin: "10px 0 10px 0",
    fontSize: 18
  };

  if (!notification.message) return null;

  return (
    <div style={styles}>
      {notification.message}
    </div>
  )
}

export default Notification