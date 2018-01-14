import { getCountry } from "./country";
import 'whatwg-fetch';

import { validCountryCode } from "./utils";

export const getCountryData = (code) => {
  return (dispatch) => {
    if (validCountryCode(code)) {

      dispatch(getCountry.request());

      const url = `/matches/country?fifa_code=${code}`

      fetch(url).then((data) => {
        data.json().then((jsonData) => {

          dispatch(getCountry.success(jsonData))

        }).catch(() => {

          dispatch(getCountry.failure('Not Found Please try other FIFA code'))

        })
      }).catch((error) => {

        dispatch(getCountry.failure(error.message))

      })
    } else {

      dispatch(getCountry.failure('Country Code Must Be a String of 3 characters'))

    }
  }
}


