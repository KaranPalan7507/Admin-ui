import "react-responsive-modal/styles.css";
import "./style.css";
import { Modal } from "react-responsive-modal";
export default function UserEditModal(props) {
  //props passed to this component
  const { isOpen, onClose, onSubmit } = props;
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
    const dataObj = {};
    for (let [key, value] of formData.entries()) {
      dataObj[key] = value;
    }
    onSubmit(dataObj);
    onCloseModal();
  };

  // render add user form modal
  return (
    <Modal open={isOpen} onClose={onCloseModal} center>
      <h2>Add User</h2>
      <form onSubmit={submit}>
        <div className="form-field">
          <label className="field-label" htmlFor="name">Name</label>
          <input name="name" id="name" type="text" required className="form-field-input"/>
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="email">Email</label>
          <input name="email" id="email" type="text" required className="form-field-input"/>
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="role">Role</label>
          <select name="role" id="role" className="form-field-input">
            <option value="none" selected disabled hidden>
              Select an Option
            </option>

            <option value="admin" selected>
              admin
            </option>
            <option value="member">member</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}
