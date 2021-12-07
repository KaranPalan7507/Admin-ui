import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
export default function UserEditModal(props) {
  //props passed to this component
  const { isOpen, onClose, onSubmit, data = {} } = props;
  //after close function
  function onCloseModal() {
    onClose();
  }
  //on form submit update user details
  const submit = (event) => {
    if (!event.target.checkValidity()) {
      return;
    }
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataObj = { ...data };
    for (let [key, value] of formData.entries()) {
      dataObj[key] = value;
    }
    onSubmit(dataObj);
    onCloseModal();
  };

  // render edit user form modal
  return (
    <Modal open={isOpen} onClose={onCloseModal} center>
      <h2>Edit User</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            defaultValue={data?.name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            defaultValue={data?.email}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select name="role" id="role">
            <option value="none" selected disabled hidden>
              Select an Option
            </option>

            <option
              value="admin"
              selected={data?.role === "admin" ? "selected" : ""}
            >
              admin
            </option>
            <option
              value="member"
              selected={data?.role === "member" ? "selected" : ""}
            >
              member
            </option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}
