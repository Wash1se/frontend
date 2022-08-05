import axios from "axios"

const SetAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers = {
            Authorization: 'Access '+token,
        };
    } else {
        delete axios.defaults.headers.Authorization;
    }
};


export default SetAuthHeader;