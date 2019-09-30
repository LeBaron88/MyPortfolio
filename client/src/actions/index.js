import axios from 'axios';
import _ from 'lodash';

export const fectchConfig = path => async (dispatch, getState) => {
  let appData = {};
  if (_.isEmpty(getState().appData)) {
    const response = await axios.get('/config');
    const updatedLinks = response.data.links.map(link => {
      link.to === path ? (link.active = true) : (link.active = false);
      return link;
    });

    appData = { ...response.data, updatedLinks };
  } else {
    const updatedLinks = getState().appData.links.map(link => {
      link.to === path ? (link.active = true) : (link.active = false);
      return link;
    });
    appData = { ...getState().appData, updatedLinks };
  }

  dispatch({
    type: 'FETCH_CONFIG',
    payload: appData
  });
};

export const updateMailConfirmation = formValues => async dispatch => {
  const response = await axios.post('/mail', { ...formValues });

  dispatch({ type: 'MAIL_CONFIRMATION', payload: response.data });
};

export const updateResumeStatus = resumeData => {
  return { type: 'UPDATE_RESUME_STATUS', payload: resumeData };
};

export const hideMenu = menuState => {
  return {
    type: 'HIDE_MENU',
    payload: menuState
  };
};
