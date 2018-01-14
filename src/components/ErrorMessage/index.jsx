import React from 'react';

import './errorMessage.less';

const ErrorMessage = (props) => {
  return(
    <div className="error-message">
      <h3>Error</h3>
      <p>
        {props.errorMessage}
      </p>
    </div>
  )
}

export default ErrorMessage;