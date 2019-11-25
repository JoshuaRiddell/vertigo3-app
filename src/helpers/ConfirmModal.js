import React, { PureComponent } from "react";

export default class ConfirmModal extends PureComponent {
  render() {
    const { open, onClose, children } = this.props;
    return open ? (
      <>
        <div className="modal-overlay"></div>
        <div className="modal-container">{children}</div>
      </>
    ) : (
      <></>
    );
  }
}
